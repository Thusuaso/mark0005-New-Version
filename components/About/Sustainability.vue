<script setup lang="ts">
/**
 * components/About/Sustainability.vue
 *
 * Hakkimizda sayfasinda sosyal hesaplarin HEMEN USTUNDE duran
 * surdurulebilirlik seridi: public/image/sustainable.webp arka plan,
 * uzerinde tek paragraf metin.
 *
 * Tam genislikte (full-bleed): serit iki kolonlu icerik satirinin
 * disinda duruyor, cunku fotograf zeminli uzun bir paragraf yarim
 * kolona sikistiginda okunmuyor.
 *
 * Metin bes dilde sabit olarak burada: sayfanin geri kalani store'dan
 * (assets/data/*.json) besleniyor ama bu paragraf veriye eklenmedi —
 * tek yerde durmasi, bes JSON dosyasina dagitmaktan daha kolay takip
 * ediliyor. Veriye tasinmasi gerekirse tek blok halinde tasinir.
 *
 * NOT: Metin GammaStone'un kendi sitesinden alindi; marka adi Mekmar
 * olarak degistirildi. Birebir rakip metni oldugu icin kendi
 * cumlelerimizle yeniden yazilmasi onerilir.
 */

import { useStore } from "~/store/index";

type Lang = "en" | "fr" | "es" | "ru" | "ar";

const texts: Record<Lang, { head: string; body: string }> = {
  en: {
    head: "Sustainability",
    body: "Mekmar stands out for its focus on environmental sustainability and its commitment to reducing the negative impact on the ecosystem. With a proven awareness for environmental issues, we work every day to ensure that our products and processes are as sustainable as possible. This is evident in the choice of recyclable materials and the adoption of technologies and practices that minimise environmental impact. We are proud to be a responsible company that looks to the future and works to create a more sustainable world for future and present generations. In our daily activity, we identify the best solutions to effectively optimise the development of spaces according to their inhabitants, in the same way, we take care of the environment with an eye to mankind's well-being.",
  },
  fr: {
    head: "Durabilité",
    body: "Mekmar se distingue par son attention à la durabilité environnementale et par son engagement à réduire l'impact négatif sur l'écosystème. Forts d'une conscience avérée des enjeux environnementaux, nous travaillons chaque jour pour que nos produits et nos procédés soient aussi durables que possible. Cela se traduit par le choix de matériaux recyclables et par l'adoption de technologies et de pratiques qui réduisent au minimum l'impact environnemental. Nous sommes fiers d'être une entreprise responsable, tournée vers l'avenir, qui œuvre à créer un monde plus durable pour les générations présentes et futures. Dans notre activité quotidienne, nous identifions les meilleures solutions pour optimiser efficacement l'aménagement des espaces en fonction de ceux qui les habitent ; de la même manière, nous prenons soin de l'environnement en gardant à l'esprit le bien-être de l'humanité.",
  },
  es: {
    head: "Sostenibilidad",
    body: "Mekmar destaca por su atención a la sostenibilidad ambiental y por su compromiso de reducir el impacto negativo sobre el ecosistema. Con una conciencia demostrada de las cuestiones ambientales, trabajamos cada día para que nuestros productos y procesos sean lo más sostenibles posible. Esto se refleja en la elección de materiales reciclables y en la adopción de tecnologías y prácticas que minimizan el impacto ambiental. Estamos orgullosos de ser una empresa responsable que mira al futuro y trabaja para crear un mundo más sostenible para las generaciones presentes y futuras. En nuestra actividad diaria identificamos las mejores soluciones para optimizar de forma eficaz el desarrollo de los espacios en función de quienes los habitan; del mismo modo, cuidamos el medio ambiente con la mirada puesta en el bienestar de las personas.",
  },
  ru: {
    head: "Экологичность",
    body: "Mekmar отличает внимание к экологической устойчивости и стремление снизить негативное воздействие на экосистему. Осознавая важность экологических вопросов, мы каждый день работаем над тем, чтобы наша продукция и наши процессы были максимально экологичными. Это проявляется в выборе перерабатываемых материалов и во внедрении технологий и практик, сводящих воздействие на окружающую среду к минимуму. Мы гордимся тем, что являемся ответственной компанией, которая смотрит в будущее и работает над созданием более устойчивого мира для нынешнего и будущих поколений. В повседневной работе мы находим лучшие решения, позволяющие эффективно организовать пространство с учётом тех, кто в нём живёт; точно так же мы заботимся об окружающей среде, думая о благополучии человека.",
  },
  ar: {
    head: "الاستدامة",
    body: "تتميّز Mekmar باهتمامها بالاستدامة البيئية والتزامها بالحدّ من الأثر السلبي على النظام البيئي. وانطلاقًا من وعي راسخ بالقضايا البيئية، نعمل كل يوم على أن تكون منتجاتنا وعملياتنا مستدامة قدر الإمكان. ويتجلّى ذلك في اختيار المواد القابلة لإعادة التدوير وفي اعتماد تقنيات وممارسات تقلّل الأثر البيئي إلى أدنى حدّ. نفخر بأننا شركة مسؤولة تتطلّع إلى المستقبل وتعمل على بناء عالم أكثر استدامة للأجيال الحالية والقادمة. وفي نشاطنا اليومي نحدّد أفضل الحلول لتطوير المساحات بما يناسب قاطنيها، وبالقدر نفسه نعتني بالبيئة مع الاهتمام برفاهية الإنسان.",
  },
};

const store = useStore();
const lang = (
  String(store.getLang) in texts ? String(store.getLang) : "en"
) as Lang;
const t = texts[lang];
</script>

<template>
  <section class="su" :dir="lang === 'ar' ? 'rtl' : undefined">
    <!-- Fotograf CSS background-image degil, gercek bir resim etiketi:
         background-image lazy yuklenmiyor ve yazdirmada kayboluyor.
         object-fit ile serit ne kadar basik olursa olsun fotograf
         bozulmadan kirpiliyor.

         alt="" + aria-hidden KASITLI: fotograf tamamen dekoratif, yanindaki
         paragraf zaten ayni seyi anlatiyor. Burada bir alt metin yazmak
         ekran okuyucuya ayni bilgiyi iki kez okuturdu. -->
    <img
      class="su__bg"
      src="/image/sustainable.webp"
      alt=""
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
    <div class="su__inner">
      <h2 class="su__head">{{ t.head }}</h2>
      <p class="su__body">{{ t.body }}</p>
    </div>
  </section>
</template>

<style scoped>
.su {
  position: relative;
  isolation: isolate;
  /* Tam genislik: sayfa .container icinde olsa da serit kenardan kenara
     uzanmali. */
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  /* Fotograf gelmediyse/yuklenmediyse metin yine koyu zeminde okunur. */
  background: var(--mk-ink);
  color: var(--mk-cream);
  overflow: hidden;
}

.su__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fotografin uzerinde uzun bir paragraf var; karartma olmadan beyaz
   metin okunmuyor. Ama karartma fazla olunca fotografin yesili de
   kayboluyor ve serit duz koyu bir kutuya donuyordu (onceki degerler
   0.55 -> 0.78).

   Simdi 0.26 -> 0.46: yesil belirgin sekilde ortaya cikiyor. Metnin
   okunurlugu iki yerden telafi ediliyor:
     1. Karartma asagi dogru artiyor — paragrafin govdesi asagida.
     2. Metne ince bir golge veriliyor (bkz. .su__head / .su__body),
        boylece acik bir yaprak tam harfin arkasina denk gelse bile
        kontrast korunuyor.

   Renk --mk-ink ile ayni (20,20,20): notr koyu, fotografin yesilini
   kahverengiye cekmiyor. Onceki 28,25,23 krem paletten kalmaydi ve
   sicak oldugu icin yesili donuklastiriyordu. */
.su::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0.26),
    rgba(20, 20, 20, 0.46)
  );
}

.su__inner {
  width: min(var(--mk-container), 100%);
  margin-inline: auto;
  padding: clamp(3rem, 7vw, 5.5rem) clamp(1.25rem, 4vw, 3rem);
  text-align: start;
}

.su__head {
  margin: 0 0 clamp(0.75rem, 2vw, 1.25rem);
  font-family: var(--mk-ff-display);
  font-size: var(--mk-title-lg);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: normal;
  color: var(--mk-cream);
  /* Karartma hafifledi; golge harfleri fotograftan ayiriyor. */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
}

.su__body {
  margin: 0;
  /* 70ch: paragraf uzun, satir basina karakter okunur aralikta kalsin. */
  max-width: 70ch;
  font-size: clamp(1rem, 1.3vw, 1.0625rem);
  /* Koyu zeminde govde agirligi (300) cok zayif duruyor. */
  font-weight: 400;
  line-height: 1.75;
  /* Tam beyaz: saydam beyaz, hafifleyen karartmanin uzerinde fotografla
     karisiyordu. */
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  text-wrap: pretty;
}
</style>
