import type { FaqContent } from "./types";

const faq: FaqContent = {
  eyebrow: "Centro de Ayuda",
  title: "Preguntas Frecuentes",
  subtitle:
    "Todo lo que necesita saber sobre el travertino, el mármol y la piedra caliza — desde elegir la piedra adecuada hasta mantenerla hermosa durante años.",
  search_placeholder: "Buscar una pregunta…",
  all: "Todas",
  questions: (n) => `${n} ${n === 1 ? "pregunta" : "preguntas"}`,
  no_results: "Ninguna pregunta coincide con su búsqueda.",
  clear_search: "Borrar búsqueda",
  videos_title: "Respuestas en Video",
  videos_subtitle: "Vea a nuestros expertos responder las preguntas más comunes.",
  cta_title: "¿Todavía tiene preguntas?",
  cta_text: "Nuestro equipo estará encantado de ayudarle a elegir la piedra adecuada para su proyecto.",
  cta_button: "Contáctenos",
  groups: [
    {
      id: "general",
      icon: "bi-info-circle",
      title: "General",
      items: [
        {
          q: "¿Cuáles son las principales diferencias entre travertino, mármol y piedra caliza?",
          a: [
            { term: "Travertino", text: "Conocido por sus agujeros y poros naturales, ofrece un aspecto rústico." },
            { term: "Mármol", text: "Pulido y elegante, a menudo presenta vetas y un acabado brillante." },
            { term: "Caliza", text: "Más suave con un acabado mate, que proporciona una apariencia más natural y discreta." },
          ],
        },
        {
          q: "¿Son estos azulejos aptos para uso en exteriores?",
          a: [
            {
              text: "Sí, los tres tipos se pueden utilizar en exteriores, pero su idoneidad depende del acabado y del clima. El travertino y la piedra caliza son populares para patios y terrazas de piscinas debido a sus propiedades antideslizantes cuando no están pulidas.",
            },
          ],
        },
        {
          q: "¿Qué tan duraderas son estas baldosas?",
          a: [
            {
              text: "El mármol es el más duro y duradero, seguido del travertino y la piedra caliza. Sin embargo, todos requieren un sellado adecuado para mantener su apariencia y longevidad.",
            },
          ],
        },
        {
          q: "¿Es necesario sellar estas baldosas?",
          a: [
            {
              text: "Sí, se recomienda sellar los tres tipos para evitar manchas y mantener su belleza natural, especialmente en áreas con mucha humedad o mucho tráfico.",
            },
          ],
        },
        {
          q: "¿Cómo limpio y mantengo estos azulejos?",
          a: [
            { text: "Utilice un limpiador con pH neutro." },
            { text: "Evite los limpiadores ácidos o abrasivos ya que pueden dañar la piedra." },
            { text: "Se recomienda volver a sellar periódicamente para proteger las baldosas." },
          ],
        },
        {
          q: "¿Son estos azulejos ecológicos?",
          a: [
            {
              text: "Sí, el travertino, el mármol y la piedra caliza son piedras naturales con un impacto ambiental mínimo durante su extracción y producción.",
            },
          ],
        },
        {
          q: "¿Se pueden utilizar estas baldosas con calefacción por suelo radiante?",
          a: [{ text: "Sí, son excelentes conductores de calor y funcionan bien con sistemas de calefacción por suelo radiante." }],
        },
        {
          q: "¿Estas baldosas son resbaladizas cuando están mojadas?",
          a: [
            {
              text: "El mármol pulido puede ser resbaladizo cuando está mojado, mientras que los acabados pulidos o texturizados de travertino y piedra caliza ofrecen una mejor resistencia al deslizamiento.",
            },
          ],
        },
        {
          q: "¿Cuáles son las opciones de color disponibles?",
          a: [
            { term: "Travertino", text: "Tonos terrosos como beige, canela y crema." },
            { term: "Mármol", text: "Blancos clásicos, grises, negros y a veces verdes o rojos." },
            { term: "Caliza", text: "Tonos neutros de beige, gris y blancos suaves." },
          ],
        },
        {
          q: "¿Cómo elijo el mosaico adecuado para mi proyecto?",
          a: [
            {
              text: "Considere la ubicación, las preferencias de diseño, la durabilidad y los requisitos de mantenimiento. Para obtener ayuda, consulte a los expertos de Mekmar para obtener asesoramiento personalizado.",
            },
          ],
        },
        {
          q: "¿Son caras estas baldosas?",
          a: [
            {
              text: "Los precios varían según el tipo de piedra, la calidad y el acabado. El mármol tiende a ser el más caro, seguido del travertino y la piedra caliza.",
            },
          ],
        },
        {
          q: "¿Se pueden utilizar estos azulejos en los baños?",
          a: [{ text: "Sí, son ideales para baños, pero requieren un sellado adecuado para resistir la humedad y las manchas." }],
        },
      ],
    },
    {
      id: "floor",
      icon: "bi-grid-3x3",
      title: "Baldosas",
      items: [
        {
          q: "¿Son estos mosaicos adecuados para áreas de mucho tránsito?",
          a: [
            {
              text: "Sí, el mármol y el travertino son excelentes para áreas de mucho tráfico si se sellan adecuadamente. La piedra caliza es más adecuada para zonas de tráfico moderado debido a su naturaleza más blanda.",
            },
          ],
        },
        {
          q: "¿Puedo usar travertino, mármol o piedra caliza para pisos con calefacción?",
          a: [{ text: "Sí, son excelentes conductores del calor y combinan bien con los sistemas de calefacción por suelo radiante." }],
        },
        {
          q: "¿Son estos azulejos resistentes a los rayones?",
          a: [
            {
              text: "El mármol es más resistente a los rayones que el travertino o la piedra caliza, pero todos pueden rayarse si se exponen a materiales abrasivos.",
            },
          ],
        },
      ],
    },
    {
      id: "wall",
      icon: "bi-bricks",
      title: "Revestimiento de Pared y Fachada",
      items: [
        {
          q: "¿Se puede utilizar travertino, mármol o piedra caliza para fachadas?",
          a: [
            {
              text: "Sí, se utilizan habitualmente para fachadas. El mármol ofrece una apariencia lujosa, el travertino agrega textura y la piedra caliza brinda una sensación natural y atemporal.",
            },
          ],
        },
        {
          q: "¿Estos azulejos son buenos para paredes decorativas?",
          a: [
            {
              text: "¡Absolutamente! Las paredes decorativas de mármol crean una declaración, mientras que el travertino y la piedra caliza añaden calidez y textura.",
            },
          ],
        },
        {
          q: "¿Estos revestimientos requieren algún mantenimiento especial?",
          a: [
            {
              text: "Para aplicaciones verticales, es suficiente quitar el polvo regularmente y limpiar ocasionalmente con un limpiador con pH neutro. El sellado ayuda a prevenir la absorción de agua o suciedad.",
            },
          ],
        },
        {
          q: "¿Puedo usar travertino o piedra caliza como protector contra salpicaduras?",
          a: [
            {
              text: "Sí, son excelentes opciones para salpicaduras de cocinas o baños, ya que agregan textura y carácter.",
            },
          ],
        },
        {
          q: "¿Los azulejos de mármol se manchan fácilmente?",
          a: [{ text: "El mármol puede mancharse si se expone a sustancias ácidas, pero el sellado minimiza este riesgo." }],
        },
      ],
    },
    {
      id: "exterior",
      icon: "bi-tree",
      title: "Azulejos Exteriores y Paisajísticos",
      items: [
        {
          q: "¿Qué tipo de baldosa es mejor para uso en exteriores?",
          a: [
            { term: "Travertino", text: "Perfecto para patios y terrazas de piscinas gracias a su superficie antideslizante." },
            { term: "Caliza", text: "Ideal para pasarelas o caminos de jardín." },
            { term: "Mármol", text: "Funciona mejor en áreas exteriores cubiertas debido a su superficie pulida." },
          ],
        },
        {
          q: "¿Cómo se comportan estas baldosas en temperaturas bajo cero?",
          a: [
            {
              text: "El travertino y la piedra caliza son más resistentes a los ciclos de congelación y descongelación, siempre que estén sellados adecuadamente. El mármol puede agrietarse si no se mantiene adecuadamente en climas fríos.",
            },
          ],
        },
        {
          q: "¿Puedo utilizar estos azulejos para paisajes de jardín?",
          a: [
            {
              text: "Sí, el travertino y la piedra caliza son populares para el paisajismo debido a sus tonos terrosos y su resistencia al deslizamiento.",
            },
          ],
        },
      ],
    },
    {
      id: "pavers",
      icon: "bi-border-all",
      title: "Adoquines",
      items: [
        {
          q: "¿Cuáles son las ventajas de utilizar adoquines de piedra natural?",
          a: [
            { text: "Durabilidad y longevidad." },
            { text: "Estética atemporal y natural." },
            { text: "Resistentes al calor, lo que los hace cómodos para zonas descalzas." },
          ],
        },
        {
          q: "¿Cómo se comparan los adoquines de travertino con los adoquines de hormigón?",
          a: [
            {
              text: "Los adoquines de travertino son más duraderos, resistentes al calor y visualmente atractivos que el hormigón, pero tienen un costo mayor.",
            },
          ],
        },
        {
          q: "¿Los adoquines requieren una instalación especial?",
          a: [
            {
              text: "Los adoquines de piedra natural requieren una base sólida, una nivelación adecuada y un resellado ocasional para una mayor longevidad.",
            },
          ],
        },
      ],
    },
    {
      id: "maintenance",
      icon: "bi-droplet",
      title: "Mantenimiento",
      items: [
        {
          q: "¿Con qué frecuencia es necesario sellar las baldosas exteriores?",
          a: [
            {
              text: "Para aplicaciones en exteriores, se recomienda volver a sellar cada 1 o 2 años, dependiendo de las condiciones climáticas.",
            },
          ],
        },
        {
          q: "¿Cuál es la mejor forma de limpiar los azulejos de exterior?",
          a: [
            {
              text: "Utilice una manguera para una limpieza regular y un limpiador con pH neutro para la suciedad rebelde. Evite el lavado a presión, ya que puede erosionar piedras más blandas como el travertino y la piedra caliza.",
            },
          ],
        },
        {
          q: "¿Son estas baldosas resistentes al musgo o las algas?",
          a: [{ text: "La limpieza y el sellado regulares previenen el crecimiento de musgo y algas en las superficies exteriores." }],
        },
      ],
    },
  ],
};

export default faq;
