"""Bootstrap Icons subsetter.

The full bootstrap-icons font is ~128 KB (woff2) plus ~86 KB of CSS for ~2000
icons, all of it in the critical rendering path. This app uses only a few dozen,
so we ship a subset instead.

Run this after adding or removing a `bi-*` icon anywhere in the app:

    pip install fonttools brotli
    python scripts/subset-icons.py

It rewrites:
    assets/icons/font/bootstrap-icons.subset.css
    assets/icons/font/fonts/bootstrap-icons.subset.woff2
    assets/icons/font/fonts/bootstrap-icons.subset.woff

The upstream full font/CSS are kept alongside as the source of truth.

Caveat: icon names are found by scanning source text for `bi-<name>`. An icon
whose class is built dynamically (`` `bi-${foo}` ``) will NOT be detected and
will render as a blank box. Keep icon class names as whole literals.
"""

import hashlib
import json
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "assets" / "icons" / "font"

# Directories scanned for icon usage, and the file types worth scanning.
SCAN_DIRS = ["pages", "components", "layouts", "assets", "plugins", "store",
             "middleware", "server", "lang"]
SCAN_FILES = ["app.vue", "error.vue"]
SCAN_EXTS = {".vue", ".ts", ".js", ".mjs", ".json", ".css", ".scss", ".html"}

ICON_RE = re.compile(r"\bbi-[a-z0-9]+(?:-[a-z0-9]+)*\b")
# The font's own CSS/SCSS/JSON define every icon; scanning them would defeat
# the point, so they are skipped.
SKIP = {"bootstrap-icons.css", "bootstrap-icons.min.css",
        "bootstrap-icons.scss", "bootstrap-icons.json",
        "bootstrap-icons.subset.css"}


def iter_source_files():
    for name in SCAN_FILES:
        p = ROOT / name
        if p.is_file():
            yield p
    for d in SCAN_DIRS:
        base = ROOT / d
        if not base.is_dir():
            continue
        for p in base.rglob("*"):
            if p.is_file() and p.suffix in SCAN_EXTS and p.name not in SKIP:
                yield p


def find_used_icons():
    found = {}  # icon name -> example source file
    for p in iter_source_files():
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for m in ICON_RE.findall(text):
            found.setdefault(m[3:], p.relative_to(ROOT).as_posix())
    return found


def main():
    icon_map = json.loads(
        (FONT_DIR / "bootstrap-icons.json").read_text(encoding="utf-8"))

    found = find_used_icons()
    if not found:
        sys.exit("No bi-* icons found in source; refusing to build an empty font.")

    # `bi-` prefixed names that are not real icons (typos, unrelated classes)
    # would silently vanish, so report them loudly instead.
    unknown = {n: src for n, src in found.items() if n not in icon_map}
    resolved = {n: icon_map[n] for n in found if n in icon_map}

    print(f"found {len(found)} bi-* names in source: "
          f"{len(resolved)} real icons, {len(unknown)} unrecognized")
    for n, src in sorted(unknown.items()):
        print(f"  WARNING: 'bi-{n}' is not a bootstrap-icons name ({src})")
    if not resolved:
        sys.exit("No recognized icons; aborting.")

    unicodes = ",".join(f"U+{cp:04X}" for cp in sorted(resolved.values()))

    fonts_dir = FONT_DIR / "fonts"
    for flavor in ("woff2", "woff"):
        out = fonts_dir / f"bootstrap-icons.subset.{flavor}"
        subprocess.run([
            sys.executable, "-m", "fontTools.subset",
            str(fonts_dir / "bootstrap-icons.woff2"),
            f"--unicodes={unicodes}",
            f"--flavor={flavor}",
            "--layout-features=",
            "--no-hinting",
            "--desubroutinize",
            "--drop-tables+=DSIG",
            f"--output-file={out}",
        ], check=True)
        print(f"  {out.name}: {out.stat().st_size:,} bytes")

    # Cache-bust the @font-face URLs whenever the glyph set changes, so a stale
    # subset is never served against a newer CSS.
    # hashlib, not hash(): str hashing is salted per process, which would churn
    # the tag on every run even when the glyph set is identical.
    digest = hashlib.sha1(unicodes.encode()).hexdigest()[:8]
    tag = f"{len(resolved)}-{digest}"

    css = [
        "/* Bootstrap Icons - subset. GENERATED FILE, do not edit by hand.",
        f"   Contains only the {len(resolved)} icons this app actually uses.",
        "   Regenerate with: python scripts/subset-icons.py */",
        "@font-face {",
        "  font-display: swap;",
        '  font-family: "bootstrap-icons";',
        f'  src: url("./fonts/bootstrap-icons.subset.woff2?{tag}") format("woff2"),',
        f'       url("./fonts/bootstrap-icons.subset.woff?{tag}") format("woff");',
        "}",
        "",
        ".bi::before,",
        '[class^="bi-"]::before,',
        '[class*=" bi-"]::before {',
        "  display: inline-block;",
        "  font-family: bootstrap-icons !important;",
        "  font-style: normal;",
        "  font-weight: normal !important;",
        "  font-variant: normal;",
        "  text-transform: none;",
        "  line-height: 1;",
        "  vertical-align: -0.125em;",
        "  -webkit-font-smoothing: antialiased;",
        "  -moz-osx-font-smoothing: grayscale;",
        "}",
        "",
    ]
    for name in sorted(resolved):
        css.append('.bi-%s::before { content: "\\%x"; }' % (name, resolved[name]))

    out_css = FONT_DIR / "bootstrap-icons.subset.css"
    out_css.write_text("\n".join(css) + "\n", encoding="utf-8")
    print(f"  {out_css.name}: {out_css.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
