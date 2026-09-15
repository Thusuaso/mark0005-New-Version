import type { FaqContent } from "./types";

const faq: FaqContent = {
  eyebrow: "Centre d'Aide",
  title: "Questions Fréquemment Posées",
  subtitle:
    "Tout ce que vous devez savoir sur le travertin, le marbre et le calcaire — du choix de la bonne pierre à son entretien pour qu'elle reste belle pendant des années.",
  search_placeholder: "Rechercher une question…",
  all: "Tout",
  questions: (n) => `${n} ${n === 1 ? "question" : "questions"}`,
  no_results: "Aucune question ne correspond à votre recherche.",
  clear_search: "Effacer la recherche",
  videos_title: "Réponses en Vidéo",
  videos_subtitle: "Regardez nos experts répondre aux questions les plus fréquentes.",
  cta_title: "Vous avez encore des questions ?",
  cta_text: "Notre équipe est heureuse de vous aider à choisir la bonne pierre pour votre projet.",
  cta_button: "Contactez-nous",
  groups: [
    {
      id: "general",
      icon: "bi-info-circle",
      title: "Général",
      items: [
        {
          q: "Quelles sont les principales différences entre le travertin, le marbre et le calcaire ?",
          a: [
            { term: "Travertin", text: "Connu pour ses trous et pores naturels, il offre un aspect rustique." },
            { term: "Marbre", text: "Poli et élégant, comportant souvent des veines et une finition brillante." },
            { term: "Calcaire", text: "Plus doux avec une finition mate, offrant une apparence plus naturelle et plus discrète." },
          ],
        },
        {
          q: "Ces carreaux sont-ils adaptés à une utilisation en extérieur ?",
          a: [
            {
              text: "Oui, les trois types peuvent être utilisés à l’extérieur, mais leur adéquation dépend de la finition et du climat. Le travertin et le calcaire sont populaires pour les patios et les plages de piscine en raison de leurs propriétés antidérapantes lorsqu'ils ne sont pas polis.",
            },
          ],
        },
        {
          q: "Quelle est la durabilité de ces carreaux ?",
          a: [
            {
              text: "Le marbre est le plus dur et le plus durable, suivi du travertin et du calcaire. Cependant, tous nécessitent une bonne étanchéité pour conserver leur apparence et leur longévité.",
            },
          ],
        },
        {
          q: "Ces carreaux ont-ils besoin d'être scellés ?",
          a: [
            {
              text: "Oui, le scellement est recommandé pour les trois types afin d’éviter les taches et de conserver leur beauté naturelle, en particulier dans les zones très humides ou à fort trafic.",
            },
          ],
        },
        {
          q: "Comment nettoyer et entretenir ces carreaux ?",
          a: [
            { text: "Utilisez un nettoyant au pH neutre." },
            { text: "Évitez les nettoyants acides ou abrasifs car ils peuvent endommager la pierre." },
            { text: "Un rescellement régulier est recommandé pour protéger les carreaux." },
          ],
        },
        {
          q: "Ces carreaux sont-ils écologiques ?",
          a: [
            {
              text: "Oui, le travertin, le marbre et le calcaire sont des pierres naturelles ayant un impact environnemental minimal lors de l'extraction et de la production.",
            },
          ],
        },
        {
          q: "Ces carreaux peuvent-ils être utilisés avec un chauffage par le sol ?",
          a: [{ text: "Oui, ils sont d’excellents conducteurs de chaleur et fonctionnent bien avec les systèmes de chauffage par le sol." }],
        },
        {
          q: "Ces carreaux sont-ils glissants lorsqu'ils sont mouillés ?",
          a: [
            {
              text: "Le marbre poli peut être glissant lorsqu'il est mouillé, tandis que les finitions polies ou texturées en travertin et en calcaire offrent une meilleure résistance au glissement.",
            },
          ],
        },
        {
          q: "Quelles sont les options de couleurs disponibles ?",
          a: [
            { term: "Travertin", text: "Des tons terreux comme le beige, le bronzage et la crème." },
            { term: "Marbre", text: "Blancs classiques, gris, noirs et parfois verts ou rouges." },
            { term: "Calcaire", text: "Nuances neutres de beige, de gris et de blancs doux." },
          ],
        },
        {
          q: "Comment choisir le carrelage adapté à mon projet ?",
          a: [
            {
              text: "Tenez compte de l’emplacement, des préférences de conception, de la durabilité et des exigences d’entretien. Pour obtenir de l’aide, consultez les experts Mekmar pour des conseils personnalisés.",
            },
          ],
        },
        {
          q: "Ces carreaux sont-ils chers ?",
          a: [
            {
              text: "Les prix varient en fonction du type de pierre, de sa qualité et de sa finition. Le marbre a tendance à être le plus cher, suivi du travertin et du calcaire.",
            },
          ],
        },
        {
          q: "Ces carreaux peuvent-ils être utilisés dans les salles de bains ?",
          a: [{ text: "Oui, ils sont idéaux pour les salles de bains, mais nécessitent une bonne étanchéité pour résister à l’humidité et aux taches." }],
        },
      ],
    },
    {
      id: "floor",
      icon: "bi-grid-3x3",
      title: "Carrelage de Sol",
      items: [
        {
          q: "Ces carreaux sont-ils adaptés aux zones à fort trafic ?",
          a: [
            {
              text: "Oui, le marbre et le travertin sont excellents pour les zones à fort trafic avec une bonne étanchéité. Le calcaire convient mieux aux zones à trafic modéré en raison de sa nature plus tendre.",
            },
          ],
        },
        {
          q: "Puis-je utiliser du travertin, du marbre ou du calcaire pour les sols chauffants ?",
          a: [{ text: "Oui, ils sont d’excellents conducteurs de chaleur et se marient bien avec les systèmes de chauffage par le sol." }],
        },
        {
          q: "Ces carreaux sont-ils résistants aux rayures ?",
          a: [
            {
              text: "Le marbre est plus résistant aux rayures que le travertin ou le calcaire, mais tous peuvent se rayer s'ils sont exposés à des matériaux abrasifs.",
            },
          ],
        },
      ],
    },
    {
      id: "wall",
      icon: "bi-bricks",
      title: "Carrelage Mur et Façade",
      items: [
        {
          q: "Le travertin, le marbre ou le calcaire peuvent-ils être utilisés pour les façades ?",
          a: [
            {
              text: "Oui, ils sont couramment utilisés pour les façades. Le marbre offre un aspect luxueux, le travertin ajoute de la texture et le calcaire donne une sensation naturelle et intemporelle.",
            },
          ],
        },
        {
          q: "Ces carreaux sont-ils bons pour les murs d'accent ?",
          a: [
            {
              text: "Absolument! Les murs d'accent en marbre créent une déclaration, tandis que le travertin et le calcaire ajoutent de la chaleur et de la texture.",
            },
          ],
        },
        {
          q: "Ces carrelages muraux nécessitent-ils un entretien particulier ?",
          a: [
            {
              text: "Pour les applications verticales, un dépoussiérage régulier et un nettoyage occasionnel avec un nettoyant au pH neutre suffisent. Le scellement aide à empêcher l’absorption de l’eau ou de la saleté.",
            },
          ],
        },
        {
          q: "Puis-je utiliser du travertin ou du calcaire pour un dosseret ?",
          a: [
            {
              text: "Oui, ce sont d’excellents choix pour les dosserets de cuisine ou de salle de bain, ajoutant de la texture et du caractère.",
            },
          ],
        },
        {
          q: "Les carreaux muraux en marbre se tachent-ils facilement ?",
          a: [{ text: "Le marbre peut se tacher s’il est exposé à des substances acides, mais le scellement minimise ce risque." }],
        },
      ],
    },
    {
      id: "exterior",
      icon: "bi-tree",
      title: "Extérieur et Paysager",
      items: [
        {
          q: "Quel type de carrelage convient le mieux à une utilisation en extérieur ?",
          a: [
            { term: "Travertin", text: "Parfait pour les patios et les plages de piscine grâce à sa surface antidérapante." },
            { term: "Calcaire", text: "Idéal pour les allées ou les allées de jardin." },
            { term: "Marbre", text: "Fonctionne mieux dans les espaces extérieurs couverts grâce à sa surface polie." },
          ],
        },
        {
          q: "Comment ces carreaux se comportent-ils par temps glacial ?",
          a: [
            {
              text: "Le travertin et le calcaire sont plus résistants aux cycles de gel et de dégel, à condition qu’ils soient correctement scellés. Le marbre peut se fissurer s’il n’est pas correctement entretenu dans les climats froids.",
            },
          ],
        },
        {
          q: "Puis-je utiliser ces carreaux pour des aménagements de jardin ?",
          a: [
            {
              text: "Oui, le travertin et le calcaire sont populaires pour l’aménagement paysager en raison de leurs tons terreux et de leur résistance au glissement.",
            },
          ],
        },
      ],
    },
    {
      id: "pavers",
      icon: "bi-border-all",
      title: "Pavés",
      items: [
        {
          q: "Quels sont les avantages d’utiliser des pavés en pierre naturelle ?",
          a: [
            { text: "Durabilité et longévité." },
            { text: "Esthétique intemporelle et naturelle." },
            { text: "Résistant à la chaleur, ce qui les rend confortables pour les zones pieds nus." },
          ],
        },
        {
          q: "Comment les pavés en travertin se comparent-ils aux pavés en béton ?",
          a: [
            {
              text: "Les pavés en travertin sont plus durables, résistants à la chaleur et visuellement attrayants que le béton, mais leur coût est plus élevé.",
            },
          ],
        },
        {
          q: "Les pavés nécessitent-ils une installation particulière ?",
          a: [
            {
              text: "Les pavés en pierre naturelle nécessitent une base solide, un nivellement approprié et un scellement occasionnel pour assurer leur longévité.",
            },
          ],
        },
      ],
    },
    {
      id: "maintenance",
      icon: "bi-droplet",
      title: "Entretien",
      items: [
        {
          q: "À quelle fréquence les carreaux extérieurs doivent-ils être scellés ?",
          a: [
            {
              text: "Pour les applications extérieures, il est recommandé de resceller tous les 1 à 2 ans, en fonction des conditions météorologiques.",
            },
          ],
        },
        {
          q: "Quelle est la meilleure façon de nettoyer le carrelage extérieur ?",
          a: [
            {
              text: "Utilisez un tuyau pour un nettoyage régulier et un nettoyant au pH neutre pour les saletés tenaces. Évitez le lavage sous pression car cela peut éroder les pierres plus tendres comme le travertin et le calcaire.",
            },
          ],
        },
        {
          q: "Ces carreaux sont-ils résistants à la mousse ou aux algues ?",
          a: [{ text: "Un nettoyage et un scellement réguliers empêchent la croissance de mousse et d’algues sur les surfaces extérieures." }],
        },
      ],
    },
  ],
};

export default faq;
