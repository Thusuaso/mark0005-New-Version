/* "Get Price" giris kodu e-postasi. Tablo tabanli, satir ici stiller:
   Outlook / Gmail / Apple Mail'de tutarli gorunmesi icin. */

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<
  Lang,
  {
    subject: string;
    preheader: string;
    greeting: (name: string) => string;
    intro: string;
    codeLabel: string;
    validity: (min: number) => string;
    ignore: string;
    aboutTitle: string;
    about: string;
    highlights: string[];
    cta: string;
    signoff: string;
    team: string;
  }
> = {
  en: {
    subject: "Your Mekmar price access code",
    preheader: "Use this code to see our product prices.",
    greeting: (n) => `Hello ${n},`,
    intro:
      "Thank you for your interest in our natural stone collection. Enter the code below on our website to unlock product prices.",
    codeLabel: "Your access code",
    validity: (m) => `This code is valid for ${m} minutes.`,
    ignore:
      "If you did not request this code, you can safely ignore this email.",
    aboutTitle: "About Mekmar",
    about:
      "Since 2002, MEKMAR has been producing and supplying high-quality Turkish natural stone to projects all over the world. From quarry to delivery, our experienced sales team keeps you updated on payment, production and shipment step by step.",
    highlights: [
      "Marble, travertine, limestone, mosaics & slabs",
      "30,000 m² of product quality-controlled every month",
      "Worldwide shipping & ready stock in Atlanta, USA",
    ],
    cta: "Explore Our Products",
    signoff: "Best regards,",
    team: "The Mekmar Team",
  },
  fr: {
    subject: "Votre code d'accès aux prix Mekmar",
    preheader: "Utilisez ce code pour voir nos prix.",
    greeting: (n) => `Bonjour ${n},`,
    intro:
      "Merci de l'intérêt que vous portez à notre collection de pierres naturelles. Saisissez le code ci-dessous sur notre site pour afficher les prix.",
    codeLabel: "Votre code d'accès",
    validity: (m) => `Ce code est valable ${m} minutes.`,
    ignore:
      "Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail.",
    aboutTitle: "À propos de Mekmar",
    about:
      "Depuis 2002, MEKMAR produit et fournit des pierres naturelles turques de haute qualité pour des projets du monde entier. Notre équipe commerciale expérimentée vous informe à chaque étape : paiement, production et expédition.",
    highlights: [
      "Marbre, travertin, calcaire, mosaïques et tranches",
      "30 000 m² de produits contrôlés chaque mois",
      "Expédition mondiale et stock disponible à Atlanta, USA",
    ],
    cta: "Découvrir nos produits",
    signoff: "Cordialement,",
    team: "L'équipe Mekmar",
  },
  es: {
    subject: "Su código de acceso a precios de Mekmar",
    preheader: "Use este código para ver nuestros precios.",
    greeting: (n) => `Hola ${n},`,
    intro:
      "Gracias por su interés en nuestra colección de piedra natural. Introduzca el siguiente código en nuestra web para ver los precios.",
    codeLabel: "Su código de acceso",
    validity: (m) => `Este código es válido durante ${m} minutos.`,
    ignore: "Si no solicitó este código, puede ignorar este correo.",
    aboutTitle: "Sobre Mekmar",
    about:
      "Desde 2002, MEKMAR produce y suministra piedra natural turca de alta calidad para proyectos de todo el mundo. Nuestro experimentado equipo de ventas le informa paso a paso sobre el pago, la producción y el envío.",
    highlights: [
      "Mármol, travertino, piedra caliza, mosaicos y planchas",
      "30.000 m² de producto controlados cada mes",
      "Envíos a todo el mundo y stock disponible en Atlanta, EE. UU.",
    ],
    cta: "Ver nuestros productos",
    signoff: "Saludos cordiales,",
    team: "El equipo de Mekmar",
  },
  ru: {
    subject: "Ваш код доступа к ценам Mekmar",
    preheader: "Используйте этот код, чтобы увидеть цены.",
    greeting: (n) => `Здравствуйте, ${n}!`,
    intro:
      "Благодарим за интерес к нашей коллекции натурального камня. Введите код ниже на нашем сайте, чтобы увидеть цены на продукцию.",
    codeLabel: "Ваш код доступа",
    validity: (m) => `Код действителен ${m} минут.`,
    ignore: "Если вы не запрашивали этот код, просто проигнорируйте письмо.",
    aboutTitle: "О компании Mekmar",
    about:
      "С 2002 года MEKMAR производит и поставляет высококачественный турецкий натуральный камень для проектов по всему миру. Наша опытная команда продаж держит вас в курсе оплаты, производства и отгрузки на каждом этапе.",
    highlights: [
      "Мрамор, травертин, известняк, мозаика и слэбы",
      "30 000 м² продукции проходят контроль качества ежемесячно",
      "Доставка по всему миру и склад в Атланте, США",
    ],
    cta: "Смотреть продукцию",
    signoff: "С уважением,",
    team: "Команда Mekmar",
  },
  ar: {
    subject: "رمز الوصول إلى أسعار ميكمار",
    preheader: "استخدم هذا الرمز لعرض أسعار منتجاتنا.",
    greeting: (n) => `مرحباً ${n}،`,
    intro:
      "شكراً لاهتمامك بمجموعتنا من الحجر الطبيعي. أدخل الرمز أدناه على موقعنا لعرض أسعار المنتجات.",
    codeLabel: "رمز الوصول الخاص بك",
    validity: (m) => `هذا الرمز صالح لمدة ${m} دقائق.`,
    ignore: "إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة.",
    aboutTitle: "عن ميكمار",
    about:
      "منذ عام 2002، تنتج ميكمار وتورّد الحجر الطبيعي التركي عالي الجودة لمشاريع في جميع أنحاء العالم. يطلعك فريق المبيعات لدينا على الدفع والإنتاج والشحن خطوة بخطوة.",
    highlights: [
      "رخام، ترافرتين، حجر جيري، فسيفساء وألواح",
      "فحص جودة 30,000 متر مربع من المنتجات شهرياً",
      "شحن إلى جميع أنحاء العالم ومخزون جاهز في أتلانتا، الولايات المتحدة",
    ],
    cta: "تصفح منتجاتنا",
    signoff: "مع أطيب التحيات،",
    team: "فريق ميكمار",
  },
};

export const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export function normalizeLang(lang: unknown): Lang {
  return ["en", "fr", "es", "ru", "ar"].includes(String(lang))
    ? (lang as Lang)
    : "en";
}

export function buildLoginCodeEmail(opts: {
  name: string;
  code: string;
  lang: Lang;
  ttlMinutes: number;
}) {
  const t = texts[opts.lang];
  const rtl = opts.lang === "ar";
  const dir = rtl ? "rtl" : "ltr";
  const align = rtl ? "right" : "left";
  const name = escapeHtml(opts.name);
  const siteUrl =
    "https://www.mekmar.com" + (opts.lang === "en" ? "/" : `/${opts.lang}/`);
  const spacedCode = opts.code.split("").join("&nbsp;");

  const highlights = t.highlights
    .map(
      (h) => `
      <tr>
        <td width="22" valign="top" style="padding:4px 0;color:#b08d57;font-size:14px;">&#9670;</td>
        <td style="padding:4px 0;color:#4a4a4a;font-size:14px;line-height:20px;text-align:${align};">${h}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${opts.lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f1ed;font-family:Arial,Helvetica,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${t.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ed;">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="${dir}" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td align="center" style="background:#1f1f1f;padding:28px 24px;">
            <img src="https://cdn.mekmarimage.com/logo/mekmar-up-icon.png" width="44" height="44" alt="Mekmar" style="display:block;border:0;margin:0 auto 10px;">
            <div style="color:#ffffff;font-size:24px;letter-spacing:6px;font-weight:bold;">MEKMAR</div>
            <div style="color:#b08d57;font-size:11px;letter-spacing:3px;margin-top:6px;">NATURAL STONE · SINCE 2002</div>
          </td>
        </tr>

        <!-- Code -->
        <tr>
          <td style="padding:36px 40px 8px;text-align:${align};">
            <p style="margin:0 0 12px;color:#1f1f1f;font-size:18px;font-weight:bold;">${t.greeting(name)}</p>
            <p style="margin:0;color:#4a4a4a;font-size:15px;line-height:23px;">${t.intro}</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:24px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="background:#f7f3ec;border:1px solid #e6dccb;border-radius:8px;">
              <tr>
                <td align="center" style="padding:18px 36px;">
                  <div style="color:#8a7a62;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">${t.codeLabel}</div>
                  <div dir="ltr" style="color:#1f1f1f;font-size:34px;font-weight:bold;letter-spacing:4px;font-family:'Courier New',Courier,monospace;">${spacedCode}</div>
                </td>
              </tr>
            </table>
            <p style="margin:14px 0 0;color:#8a8a8a;font-size:13px;">${t.validity(opts.ttlMinutes)}</p>
          </td>
        </tr>

        <!-- About -->
        <tr>
          <td style="padding:8px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeeeee;">
              <tr>
                <td style="padding:28px 0 8px;text-align:${align};">
                  <p style="margin:0 0 10px;color:#1f1f1f;font-size:16px;font-weight:bold;">${t.aboutTitle}</p>
                  <p style="margin:0 0 14px;color:#4a4a4a;font-size:14px;line-height:22px;">${t.about}</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" dir="${dir}">${highlights}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:24px 40px 32px;">
            <a href="${siteUrl}" style="display:inline-block;background:#b08d57;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 30px;border-radius:4px;">${t.cta}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 32px;text-align:${align};">
            <p style="margin:0;color:#4a4a4a;font-size:14px;line-height:22px;">${t.signoff}<br><strong>${t.team}</strong></p>
            <p style="margin:16px 0 0;color:#9a9a9a;font-size:12px;line-height:18px;">${t.ignore}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="background:#f7f7f7;padding:20px 24px;color:#8a8a8a;font-size:12px;line-height:19px;">
            <a href="https://www.mekmar.com" style="color:#1f1f1f;text-decoration:none;font-weight:bold;">www.mekmar.com</a>
            &nbsp;·&nbsp;
            <a href="mailto:export@mekmar.com" style="color:#1f1f1f;text-decoration:none;">export@mekmar.com</a><br>
            <a href="https://www.facebook.com/mekmar" style="color:#8a8a8a;">Facebook</a> &nbsp;·&nbsp;
            <a href="https://twitter.com/MekmarMarble" style="color:#8a8a8a;">X</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    t.greeting(opts.name),
    "",
    t.intro,
    "",
    `${t.codeLabel}: ${opts.code}`,
    t.validity(opts.ttlMinutes),
    "",
    `${t.aboutTitle}: ${t.about}`,
    "",
    siteUrl,
    "",
    t.signoff,
    t.team,
    "",
    t.ignore,
  ].join("\n");

  return { subject: t.subject, html, text };
}
