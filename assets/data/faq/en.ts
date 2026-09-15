import type { FaqContent } from "./types";

const faq: FaqContent = {
  eyebrow: "Help Center",
  title: "Frequently Asked Questions",
  subtitle:
    "Everything you need to know about travertine, marble and limestone — from choosing the right stone to keeping it beautiful for years.",
  search_placeholder: "Search a question…",
  all: "All",
  questions: (n) => `${n} ${n === 1 ? "question" : "questions"}`,
  no_results: "No questions match your search.",
  clear_search: "Clear search",
  videos_title: "Video Answers",
  videos_subtitle: "Watch our experts answer the most common questions.",
  cta_title: "Still have questions?",
  cta_text: "Our team is happy to help you choose the right stone for your project.",
  cta_button: "Contact Us",
  groups: [
    {
      id: "general",
      icon: "bi-info-circle",
      title: "General",
      items: [
        {
          q: "What are the main differences between travertine, marble, and limestone?",
          a: [
            { term: "Travertine", text: "Known for its natural holes and pores, it offers a rustic look." },
            { term: "Marble", text: "Polished and elegant, often featuring veins and a glossy finish." },
            { term: "Limestone", text: "Softer with a matte finish, providing a more natural, understated appearance." },
          ],
        },
        {
          q: "Are these tiles suitable for outdoor use?",
          a: [
            {
              text: "Yes, all three types can be used outdoors, but their suitability depends on the finish and climate. Travertine and limestone are popular for patios and pool decks due to their non-slip properties when unpolished.",
            },
          ],
        },
        {
          q: "How durable are these tiles?",
          a: [
            {
              text: "Marble is the hardest and most durable, followed by travertine and limestone. However, all require proper sealing to maintain their appearance and longevity.",
            },
          ],
        },
        {
          q: "Do these tiles need sealing?",
          a: [
            {
              text: "Yes, sealing is recommended for all three types to prevent staining and maintain their natural beauty, especially in high-moisture or heavy-traffic areas.",
            },
          ],
        },
        {
          q: "How do I clean and maintain these tiles?",
          a: [
            { text: "Use a pH-neutral cleaner." },
            { text: "Avoid acidic or abrasive cleaners as they can damage the stone." },
            { text: "Regular resealing is recommended to protect the tiles." },
          ],
        },
        {
          q: "Are these tiles eco-friendly?",
          a: [
            {
              text: "Yes, travertine, marble, and limestone are natural stones with minimal environmental impact during extraction and production.",
            },
          ],
        },
        {
          q: "Can these tiles be used with underfloor heating?",
          a: [{ text: "Yes, they are excellent heat conductors and work well with underfloor heating systems." }],
        },
        {
          q: "Are these tiles slippery when wet?",
          a: [
            {
              text: "Polished marble can be slippery when wet, while honed or textured finishes of travertine and limestone offer better slip resistance.",
            },
          ],
        },
        {
          q: "What are the color options available?",
          a: [
            { term: "Travertine", text: "Earthy tones like beige, tan, and cream." },
            { term: "Marble", text: "Classic whites, greys, blacks, and sometimes greens or reds." },
            { term: "Limestone", text: "Neutral shades of beige, grey, and soft whites." },
          ],
        },
        {
          q: "How do I choose the right tile for my project?",
          a: [
            {
              text: "Consider the location, design preferences, durability, and maintenance requirements. For help, consult Mekmar experts for personalized advice.",
            },
          ],
        },
        {
          q: "Are these tiles expensive?",
          a: [
            {
              text: "Prices vary based on the stone type, quality, and finish. Marble tends to be the most expensive, followed by travertine and limestone.",
            },
          ],
        },
        {
          q: "Can these tiles be used in bathrooms?",
          a: [{ text: "Yes, they are ideal for bathrooms but require proper sealing to resist moisture and staining." }],
        },
      ],
    },
    {
      id: "floor",
      icon: "bi-grid-3x3",
      title: "Floor Tiles",
      items: [
        {
          q: "Are these tiles suitable for high-traffic areas?",
          a: [
            {
              text: "Yes, marble and travertine are excellent for high-traffic areas with proper sealing. Limestone is better suited for moderate-traffic zones due to its softer nature.",
            },
          ],
        },
        {
          q: "Can I use travertine, marble, or limestone for heated floors?",
          a: [{ text: "Yes, they are great conductors of heat and pair well with underfloor heating systems." }],
        },
        {
          q: "Are these tiles scratch-resistant?",
          a: [
            {
              text: "Marble is more resistant to scratches than travertine or limestone, but all can scratch if exposed to abrasive materials.",
            },
          ],
        },
      ],
    },
    {
      id: "wall",
      icon: "bi-bricks",
      title: "Wall & Facade Tiles",
      items: [
        {
          q: "Can travertine, marble, or limestone be used for facades?",
          a: [
            {
              text: "Yes, they are commonly used for facades. Marble offers a luxurious look, travertine adds texture, and limestone gives a natural and timeless feel.",
            },
          ],
        },
        {
          q: "Are these tiles good for accent walls?",
          a: [
            {
              text: "Absolutely! Marble accent walls create a statement, while travertine and limestone add warmth and texture.",
            },
          ],
        },
        {
          q: "Do these wall tiles require any special maintenance?",
          a: [
            {
              text: "For vertical applications, regular dusting and occasional cleaning with a pH-neutral cleaner are sufficient. Sealing helps prevent water or grime absorption.",
            },
          ],
        },
        {
          q: "Can I use travertine or limestone for a backsplash?",
          a: [
            {
              text: "Yes, they are excellent choices for kitchen or bathroom backsplashes, adding texture and character.",
            },
          ],
        },
        {
          q: "Do marble wall tiles stain easily?",
          a: [{ text: "Marble can stain if exposed to acidic substances but sealing minimizes this risk." }],
        },
      ],
    },
    {
      id: "exterior",
      icon: "bi-tree",
      title: "Exterior & Landscape",
      items: [
        {
          q: "Which tile type is best for outdoor use?",
          a: [
            { term: "Travertine", text: "Perfect for patios and pool decks due to its non-slip surface." },
            { term: "Limestone", text: "Ideal for walkways or garden paths." },
            { term: "Marble", text: "Works best in covered outdoor areas due to its polished surface." },
          ],
        },
        {
          q: "How do these tiles perform in freezing temperatures?",
          a: [
            {
              text: "Travertine and limestone are more resistant to freezing and thawing cycles, provided they are sealed properly. Marble can crack if not adequately maintained in cold climates.",
            },
          ],
        },
        {
          q: "Can I use these tiles for garden landscapes?",
          a: [
            {
              text: "Yes, travertine and limestone are popular for landscaping due to their earthy tones and slip resistance.",
            },
          ],
        },
      ],
    },
    {
      id: "pavers",
      icon: "bi-border-all",
      title: "Pavers",
      items: [
        {
          q: "What are the advantages of using natural stone pavers?",
          a: [
            { text: "Durability and longevity." },
            { text: "Timeless and natural aesthetic." },
            { text: "Heat-resistant, making them comfortable for barefoot areas." },
          ],
        },
        {
          q: "How do travertine pavers compare to concrete pavers?",
          a: [
            {
              text: "Travertine pavers are more durable, heat-resistant, and visually appealing than concrete but come at a higher cost.",
            },
          ],
        },
        {
          q: "Do pavers require special installation?",
          a: [
            {
              text: "Natural stone pavers require a solid base, proper leveling, and occasional resealing for longevity.",
            },
          ],
        },
      ],
    },
    {
      id: "maintenance",
      icon: "bi-droplet",
      title: "Maintenance",
      items: [
        {
          q: "How often do exterior tiles need sealing?",
          a: [
            {
              text: "For outdoor applications, resealing every 1-2 years is recommended, depending on weather conditions.",
            },
          ],
        },
        {
          q: "What’s the best way to clean outdoor tiles?",
          a: [
            {
              text: "Use a hose for regular cleaning and a pH-neutral cleaner for stubborn dirt. Avoid power washing as it can erode softer stones like travertine and limestone.",
            },
          ],
        },
        {
          q: "Are these tiles resistant to moss or algae?",
          a: [{ text: "Regular cleaning and sealing prevent moss and algae growth on exterior surfaces." }],
        },
      ],
    },
  ],
};

export default faq;
