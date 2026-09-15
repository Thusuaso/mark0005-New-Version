/* Proje liste + detay sayfalarinin arayuz metinleri */

export type ProjectsLang = "en" | "fr" | "es" | "ru" | "ar";

export const projectTexts: Record<
  ProjectsLang,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    stat_projects: string;
    stat_countries: string;
    stat_years: string;
    search_placeholder: string;
    all_countries: string;
    results: (n: number) => string;
    no_results: string;
    clear: string;
    view_project: string;
    all_projects: string;
    about: string;
    read_more: string;
    read_less: string;
    stones_used: string;
    gallery: string;
    photos: (n: number) => string;
    video: string;
    suggested: string;
    cta_title: string;
    cta_text: string;
    cta_button: string;
  }
> = {
  en: {
    eyebrow: "Our Projects",
    title: "Mekmar Projects Worldwide",
    subtitle:
      "From luxury hotels to private villas — discover how our natural stone brings projects to life around the world.",
    stat_projects: "Projects",
    stat_countries: "Countries",
    stat_years: "Years of experience",
    search_placeholder: "Search projects…",
    all_countries: "All countries",
    results: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
    no_results: "No projects match your filters.",
    clear: "Clear filters",
    view_project: "View project",
    all_projects: "All projects",
    about: "About the project",
    read_more: "Read more",
    read_less: "Show less",
    stones_used: "Stones used",
    gallery: "Project gallery",
    photos: (n) => `${n} ${n === 1 ? "photo" : "photos"}`,
    video: "Video",
    suggested: "Similar Projects",
    cta_title: "Planning a project like this?",
    cta_text: "Tell us about your project — our team will help you choose the right stone and prepare an offer.",
    cta_button: "Contact Us",
  },
  fr: {
    eyebrow: "Nos projets",
    title: "Projets Mekmar dans le monde",
    subtitle:
      "Des hôtels de luxe aux villas privées — découvrez comment notre pierre naturelle donne vie à des projets dans le monde entier.",
    stat_projects: "Projets",
    stat_countries: "Pays",
    stat_years: "Années d'expérience",
    search_placeholder: "Rechercher un projet…",
    all_countries: "Tous les pays",
    results: (n) => `${n} ${n <= 1 ? "projet" : "projets"}`,
    no_results: "Aucun projet ne correspond à vos filtres.",
    clear: "Effacer les filtres",
    view_project: "Voir le projet",
    all_projects: "Tous les projets",
    about: "À propos du projet",
    read_more: "Lire la suite",
    read_less: "Réduire",
    stones_used: "Pierres utilisées",
    gallery: "Galerie du projet",
    photos: (n) => `${n} ${n <= 1 ? "photo" : "photos"}`,
    video: "Vidéo",
    suggested: "Projets similaires",
    cta_title: "Vous préparez un projet similaire ?",
    cta_text: "Parlez-nous de votre projet — notre équipe vous aidera à choisir la bonne pierre et préparera une offre.",
    cta_button: "Contactez-nous",
  },
  es: {
    eyebrow: "Nuestros proyectos",
    title: "Proyectos de Mekmar en el mundo",
    subtitle:
      "De hoteles de lujo a villas privadas: descubra cómo nuestra piedra natural da vida a proyectos en todo el mundo.",
    stat_projects: "Proyectos",
    stat_countries: "Países",
    stat_years: "Años de experiencia",
    search_placeholder: "Buscar proyectos…",
    all_countries: "Todos los países",
    results: (n) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    no_results: "Ningún proyecto coincide con sus filtros.",
    clear: "Borrar filtros",
    view_project: "Ver proyecto",
    all_projects: "Todos los proyectos",
    about: "Sobre el proyecto",
    read_more: "Leer más",
    read_less: "Mostrar menos",
    stones_used: "Piedras utilizadas",
    gallery: "Galería del proyecto",
    photos: (n) => `${n} ${n === 1 ? "foto" : "fotos"}`,
    video: "Vídeo",
    suggested: "Proyectos similares",
    cta_title: "¿Planea un proyecto como este?",
    cta_text: "Cuéntenos sobre su proyecto: nuestro equipo le ayudará a elegir la piedra adecuada y preparará una oferta.",
    cta_button: "Contáctenos",
  },
  ru: {
    eyebrow: "Наши проекты",
    title: "Проекты Mekmar по всему миру",
    subtitle:
      "От роскошных отелей до частных вилл — узнайте, как наш натуральный камень оживляет проекты по всему миру.",
    stat_projects: "Проектов",
    stat_countries: "Стран",
    stat_years: "Лет опыта",
    search_placeholder: "Поиск проектов…",
    all_countries: "Все страны",
    results: (n) => {
      const m10 = n % 10;
      const m100 = n % 100;
      const w = m10 === 1 && m100 !== 11 ? "проект" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "проекта" : "проектов";
      return `${n} ${w}`;
    },
    no_results: "По вашим фильтрам проекты не найдены.",
    clear: "Сбросить фильтры",
    view_project: "Смотреть проект",
    all_projects: "Все проекты",
    about: "О проекте",
    read_more: "Читать далее",
    read_less: "Свернуть",
    stones_used: "Использованный камень",
    gallery: "Галерея проекта",
    photos: (n) => `${n} фото`,
    video: "Видео",
    suggested: "Похожие проекты",
    cta_title: "Планируете похожий проект?",
    cta_text: "Расскажите о своём проекте — мы поможем выбрать камень и подготовим предложение.",
    cta_button: "Связаться с нами",
  },
  ar: {
    eyebrow: "مشاريعنا",
    title: "مشاريع ميكمار حول العالم",
    subtitle: "من الفنادق الفاخرة إلى الفلل الخاصة — اكتشف كيف يُضفي حجرنا الطبيعي الحياة على المشاريع حول العالم.",
    stat_projects: "مشروع",
    stat_countries: "دولة",
    stat_years: "سنة خبرة",
    search_placeholder: "ابحث عن مشروع…",
    all_countries: "جميع الدول",
    results: (n) => `${n} مشروع`,
    no_results: "لا توجد مشاريع مطابقة.",
    clear: "مسح الفلاتر",
    view_project: "عرض المشروع",
    all_projects: "جميع المشاريع",
    about: "عن المشروع",
    read_more: "اقرأ المزيد",
    read_less: "عرض أقل",
    stones_used: "الأحجار المستخدمة",
    gallery: "معرض صور المشروع",
    photos: (n) => `${n} صورة`,
    video: "فيديو",
    suggested: "مشاريع مشابهة",
    cta_title: "هل تخطط لمشروع مماثل؟",
    cta_text: "أخبرنا عن مشروعك — سيساعدك فريقنا في اختيار الحجر المناسب وإعداد عرض سعر.",
    cta_button: "تواصل معنا",
  },
};

export function useProjectTexts(lang: string) {
  const l = (lang in projectTexts ? lang : "en") as ProjectsLang;
  return {
    lang: l,
    t: projectTexts[l],
    isRtl: l === "ar",
    contactLink: l === "en" ? "/contact" : `/${l}/contact`,
    projectsLink: l === "en" ? "/projects" : `/${l}/projects`,
  };
}
