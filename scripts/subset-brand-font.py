"""Myriad Pro Bold Condensed subsetter.

The full font ships as a 93 KB .ttf, yet the only thing rendered with it is the
mobile navbar's catalog link (`#catalog_link_mobile`) -- five short words across
the five locales. Worse, .ttf is uncompressed and the browser discovers the file
at the very end of the critical request chain, so those 93 KB used to sit on the
LCP path of every mobile page load.

This builds a woff2 subset containing only the characters those labels need
(~1.4 KB). Run it after changing a catalog link label:

    pip install fonttools brotli
    python scripts/subset-brand-font.py

It rewrites:
    assets/font/Myriad_Pro_Bold_Condensed.subset.woff2

The upstream .ttf is kept alongside as the source of truth.

Characters the font has no glyph for are reported and skipped; the Arabic label
is one of these, and already falls back to sans-serif in the browser.
"""

import pathlib
import re
import subprocess
import sys

from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "font" / "Myriad_Pro_Bold_Condensed.ttf"
OUT = ROOT / "assets" / "font" / "Myriad_Pro_Bold_Condensed.subset.woff2"
NAVBAR = ROOT / "components" / "Shared" / "Navbarmobile.vue"

# <a ... id="catalog_link_mobile" ...>LABEL</a>, across the five locale blocks.
# The id and the label can sit either side of each other, so both orders match.
LABEL_RE = re.compile(
    r'<a\b[^>]*\bid="catalog_link_mobile"[^>]*>\s*([^<]+?)\s*</a',
    re.IGNORECASE,
)


def find_labels():
    text = NAVBAR.read_text(encoding="utf-8")
    return LABEL_RE.findall(text)


def main():
    labels = find_labels()
    if not labels:
        sys.exit(f"No #catalog_link_mobile labels found in "
                 f"{NAVBAR.relative_to(ROOT).as_posix()}; "
                 f"refusing to build an empty font.")

    print(f"found {len(labels)} catalog labels: {', '.join(labels)}")

    cmap = TTFont(SRC).getBestCmap()
    wanted = sorted({ord(ch) for label in labels for ch in label})
    present = [cp for cp in wanted if cp in cmap]
    missing = [cp for cp in wanted if cp not in cmap]

    for cp in missing:
        print(f"  note: U+{cp:04X} has no glyph in this font; "
              f"it falls back to sans-serif")
    if not present:
        sys.exit("The font covers none of the label characters; aborting.")

    unicodes = ",".join(f"U+{cp:04X}" for cp in present)
    print(f"subsetting to {len(present)} characters")

    subprocess.run([
        sys.executable, "-m", "fontTools.subset",
        str(SRC),
        f"--unicodes={unicodes}",
        "--flavor=woff2",
        "--layout-features=",
        "--no-hinting",
        "--desubroutinize",
        "--drop-tables+=DSIG",
        f"--output-file={OUT}",
    ], check=True)

    print(f"  {SRC.name}: {SRC.stat().st_size:,} bytes")
    print(f"  {OUT.name}: {OUT.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
