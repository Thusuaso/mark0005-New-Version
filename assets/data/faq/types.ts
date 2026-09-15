/* FAQ sayfasi icerigi. Her dil icin ayni yapi: assets/data/faq/<lang>.ts */

export type FaqAnswerLine = {
  /* Kalin yazilan baslangic, ornegin "Travertine" (istege bagli) */
  term?: string;
  text: string;
};

export type FaqItem = {
  q: string;
  /* Tek satir -> paragraf, birden fazla satir -> madde listesi */
  a: FaqAnswerLine[];
};

export type FaqGroup = {
  id: string;
  icon: string; // bootstrap-icons sinifi
  title: string;
  items: FaqItem[];
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  search_placeholder: string;
  all: string;
  questions: (n: number) => string;
  no_results: string;
  clear_search: string;
  videos_title: string;
  videos_subtitle: string;
  cta_title: string;
  cta_text: string;
  cta_button: string;
  groups: FaqGroup[];
};
