<template>
  <div class="page-root">
  <!-- Liste, filtreler ve filtre zincirleme mantigi
       components/Products/CategoryPage.vue icinde — bes dilin sayfasi da ayni
       bileseni kullaniyor. Bu dosyada yalnizca bu dile ait tanitim metinleri
       kaldi; metinlere dokunulmadi, oldugu gibi `intro` slot'una tasindi. -->
  <ProductsCategoryPage>
    <template #intro>
      <div class="cat-intro">
        <div class="row m-auto text-center" v-if="category_id == 1">
          <div class="col-sm-12">
            <h3 class="header" style="font-weight: bold">Qué Es El Mármol?</h3>
            <p class="description" style="text-align: justify">
              Las <strong>baldosas de mármol</strong> son baldosas de
              <strong> piedra natural </strong> hechas de <strong> mármol</strong>,
              una roca metamórfica que se forma cuando la
              <strong> piedra caliza </strong> sufre una presión y un calor extremos.
              Conocidas por sus vetas únicas y sus ricas variaciones de color, cada
              baldosa de mármol es distinta y visualmente impresionante. Su estructura
              cristalina les permite pulirse hasta obtener un alto brillo, lo que
              aumenta su atractivo lujoso para sus diseños
              <strong> de interiores </strong> y
              <strong> exteriores. </strong>Disponibles en varios acabados como<strong>
                pulido, apomazado, pulido, pulido </strong
              >y <strong> abujardado, las baldosas de mármol </strong>ofrecen
              versatilidad en el diseño. Se utilizan ampliamente en<strong>
                pisos, revestimientos de paredes, encimeras</strong
              >
              y<strong> baños </strong>agregando elegancia a espacios<strong>
                residenciales </strong
              >y<strong> comerciales</strong>. Las baldosas de mármol son resistentes
              al calor, lo que las hace adecuadas para
              <strong>cocinas, chimeneas</strong>y
              <strong>aplicaciones en exteriores</strong> así como
              <strong>decoraciones de interiores</strong>. Un sellado y mantenimiento
              adecuados ayudan a protegerlos de las manchas y el grabado. Su belleza y
              durabilidad atemporales los convierten en una inversión a largo plazo en
              cualquier proyecto. Como material natural y ecológico, el mármol es una
              opción sostenible para mejorar la estética y el valor de sus
              decoraciones <strong> interiores </strong> y
              <strong> exteriores.</strong>
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 2">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Es El Travertino?</h3>
            <p class="description" style="text-align: justify">
              El <strong>travertino</strong> es una piedra natural que se forma
              mediante la rápida precipitación de carbonato de calcio en manantiales
              minerales, particularmente en aguas termales. Es un tipo de
              <strong>piedra caliza</strong> con una estructura porosa, a menudo
              caracterizada por sus tonos cálidos y terrosos como el beige, el crema,
              el tostado y el óxido. La textura única del travertino y sus hoyos
              naturales le dan un encanto rústico, aunque se pueden rellenar para
              obtener un acabado más suave. Disponible en acabados como
              <strong>apomazado</strong>, <strong>pulido</strong>,<strong
                >cepillado</strong
              >
              o <strong>pulido</strong>, el <strong>travertino</strong> es versátil
              para varios estilos de<strong> diseño arquitectónico</strong>. Se
              utiliza comúnmente en <strong>pisos</strong>,
              <strong>revestimientos de paredes</strong>, <strong>patios</strong>,
              <strong>alrededores de piscinas</strong> y
              <strong>superficies de baños</strong>. Por sus propiedades
              <strong>antideslizantes</strong>. Las
              <strong>baldosas de travertino</strong> son duraderas y pueden resistir
              la intemperie, lo que las hace ideales para aplicaciones
              <strong>interiores</strong> y <strong>exteriores</strong>. El
              <strong>sellado adecuado</strong> es esencial para proteger el
              <strong>travertino</strong> de las manchas y la absorción de humedad. Su
              atractivo atemporal y su calidez natural hacen del
              <strong>travertino</strong> una opción popular para lograr decoraciones
              <strong>interiores</strong> y <strong>exteriores</strong> clásicas y
              elegantes. Como material ecológico, el travertino contribuye a ideas y
              diseños de decoración del hogar sostenibles y estéticamente agradables
              para los <strong>arquitectos</strong>, <strong>diseñadores</strong> y
              usuarios finales.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 3">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Es La Piedra Caliza?</h3>
            <p class="description" style="text-align: justify">
              <strong>Las baldosas de piedra caliza </strong> están hechas de una roca
              sedimentaria que se forma durante millones de años a partir de la
              acumulación de materiales orgánicos como conchas y sedimentos marinos.
              Reconocidas por sus colores suaves y neutros como crema, beige, gris y
              blanco, <strong>las baldosas de piedra caliza</strong> crean una
              estética relajante y natural para sus
              <strong>decoraciones interiores</strong> y <strong>exteriores</strong>.
              Sus patrones sutiles y texturas suaves los convierten en una opción
              versátil tanto para diseños arquitectónicos
              <strong>modernos</strong> como <strong>clásicos</strong>.
              <strong>Las baldosas de piedra caliza</strong> se usan comúnmente para
              <strong>pisos</strong>, <strong>revestimientos de paredes</strong> y
              <strong>pavimentos para exteriores</strong>, ofreciendo una combinación
              de belleza y funcionalidad. Son particularmente valorados por su
              capacidad para mantenerse frescos bajo los pies, lo que los hace ideales
              para <strong>climas cálidos</strong> y
              <strong>áreas al aire libre</strong>. Disponible en acabados como
              <strong>pulido</strong>, <strong>cepillado</strong>,
              <strong>caído</strong>, <strong>arenado</strong> y
              <strong>abujardado</strong>; <strong>la piedra caliza </strong> es la
              mejor opción para varios <strong>diseños arquitectónicos</strong>. Se
              usa comúnmente en <strong>pisos</strong>,
              <strong>revestimientos de paredes</strong>, <strong>patios</strong>,
              <strong>alrededores de piscinas </strong> y
              <strong>superficies de baños</strong> debido a sus
              <strong> propiedades antideslizantes</strong>. Aunque es más blanda que
              otras piedras naturales, la piedra caliza es lo suficientemente duradera
              para <strong>aplicaciones residenciales</strong> y
              <strong>comerciales</strong> cuando se mantiene adecuadamente. Se
              recomienda un sellado regular para protegerlo de la humedad y las
              manchas, especialmente en áreas húmedas o de alto tráfico.
              <strong>Las baldosas de piedra caliza</strong> son una opción ecológica
              y atemporal para <strong>arquitectos</strong> y
              <strong>diseñadores</strong>, que realzan los espacios con su elegancia
              discreta y atractivo natural.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 4">
          <div class="col-sm-12">
            <h3 class="header">Qué Es El Mosaico De Piedra Natural?</h3>
            <p class="description" style="text-align: justify">
              Los mosaicos de <strong>mármol</strong>, <strong>travertino</strong> y
              <strong>piedra caliza</strong> son
              <strong>azulejos decorativos</strong> elaborados a partir de
              <strong>piedras naturales</strong> para añadir miradas sofisticadas a
              los diseños de <strong>interiores</strong> y
              <strong>exteriores</strong>. Estos <strong>mosaicos</strong> están
              diseñados meticulosamente organizando pequeños trozos de piedra en
              patrones o formas intrincados, lo que los convierte en una opción
              popular para agregar elegancia a diversas
              <strong>decoraciones arquitectónicas</strong>. Los
              <strong>mosaicos de mármol</strong> son apreciados por su
              <strong>acabado pulido</strong>, durabilidad y atractivo lujoso, y a
              menudo muestran patrones de vetas atemporales en tonos de blanco, gris o
              negro. Los mosaicos de <strong>travertino</strong> y
              <strong>piedra caliza</strong>, por otro lado, ofrecen un encanto más
              rústico con sus tonos terrosos y su característica textura porosa,
              creando un ambiente cálido y natural para su
              <strong>interior. </strong> y <strong>decoración exterior</strong>.
              Ideal para <strong>salpicaderos</strong>, <strong>baños</strong>,
              <strong>cocinas</strong> y <strong>paredes destacadas</strong>,
              <strong>mármol</strong>, los<strong>mosaicos</strong> de travertino y
              piedra caliza combinan estilo con funcionalidad. Los
              <strong>mosaicos de piedra natural</strong> son la mejor opción para
              <strong>propietarios</strong> y <strong>diseñadores</strong> que buscan
              realzar sus <strong>diseños elegantes</strong> con una combinación de
              elementos clásicos. belleza y practicidad moderna. Los mosaicos pueden
              ofrecer ideas de decoración coloridas para
              <strong>proyectos residenciales</strong> y <strong>comerciales</strong>.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 5">
          <div class="col-sm-12">
            <h3 class="header">Qué son los productos de piedra para exteriores?</h3>
            <p class="description" style="text-align: justify">
              <strong>Los productos de piedra para exteriores </strong> son materiales
              de piedra naturales o fabricados específicamente diseñados para su uso
              en <strong>aplicaciones exteriores</strong>. Estos productos están
              diseñados para soportar diferentes condiciones climáticas, incluida la
              lluvia, la exposición al sol, las heladas y el tráfico peatonal intenso,
              lo que los convierte en soluciones duraderas y versátiles para
              <strong>espacios al aire libre</strong>. Los productos comunes de piedra
              para exteriores incluyen <strong>adoquines</strong>,
              <strong>baldosas</strong>, <strong>cofia</strong>,
              <strong>revestimiento</strong> y
              <strong>piedras para paisajismo</strong>, hechas de materiales como
              <strong>travertino</strong>, <strong>mármol</strong>,
              <strong>granito</strong>,<strong>piedra caliza</strong> y
              <strong>pizarra</strong>. Se utilizan con frecuencia para crear
              <strong>patios</strong>, <strong>caminos</strong>,
              <strong>alrededores de piscinas</strong>,
              <strong>muros de jardín</strong>, <strong>fachadas</strong> y otras
              <strong>características al aire libre </strong>. Conocidos por su
              belleza natural, <strong>resistencia al deslizamiento</strong> y bajo
              mantenimiento, los
              <strong>productos de piedra para exteriores</strong> agregan una
              estética atemporal al tiempo que mejoran la funcionalidad y el valor de
              <strong>áreas exteriores</strong>. El <strong>mármol</strong> y el
              <strong>travertino</strong>, en particular, son muy buscados para
              <strong>proyectos al aire libre</strong> debido a su belleza natural y
              resistencia duradera. El <strong>mármol</strong> ofrece un aspecto
              lujoso y pulido, perfecto para espacios exteriores sofisticados como
              <strong>patios</strong> y <strong>senderos de jardín</strong>. El
              <strong> travertino</strong>, con su textura rústica y superficie
              <strong>antideslizante</strong>, es ideal para
              <strong>bordes de piscinas</strong>, <strong>pasillos</strong> y
              <stron>escaleras exteriores</stron>, lo que garantiza la seguridad sin
              comprometer el estilo. Ambos materiales son naturalmente resistentes al
              calor, lo que los convierte en una excelente opción para entornos
              soleados. Cuando se sellan y mantienen adecuadamente, los productos de
              <strong>mármol</strong>, <strong>travertino</strong> y
              <strong>piedra caliza para exteriores</strong> pueden durar décadas,
              manteniendo su encanto y mejorando el valor de cualquier propiedad.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 6">
          <div class="col-sm-12">
            <h3 class="header">Qué Son Los Productos De Baño y Cocina?</h3>
            <p class="description" style="text-align: justify">
              El <strong>Baño</strong> y la <strong>Cocina</strong> son las zonas más
              elegidas para decorar con elegancia la <strong>piedra natural</strong>.
              Transforme sus espacios de <strong>baño</strong> y
              <strong>cocina</strong> con la belleza y durabilidad atemporales de los
              productos de <strong>piedra natural</strong> elaborados a partir de
              <strong>mármol</strong>, <strong>travertino</strong> y
              <strong>piedra caliza</strong>. Estos exquisitos materiales aportan un
              toque de lujo y sofisticación, combinando atractivo estético con
              funcionalidad práctica. El <strong>mármol</strong> es la
              <strong>piedra natural</strong> más habitual para decorar tus
              <strong>baños</strong> y <strong>cocinas</strong> con sus elegantes
              vetas y su acabado pulido, y añade un toque lujoso a
              <strong>encimeras</strong>, <strong>salpicaderos</strong>,
              <strong>tocadores</strong> y <strong>platos de ducha</strong>. Sus
              patrones únicos garantizan que no haya dos piezas iguales, lo que hace
              que su espacio sea verdaderamente único. Si bien el
              <strong>travertino</strong> es conocido por sus tonos terrosos y su
              superficie texturizada, proporciona un encanto rústico pero refinado. Es
              un material ideal para <strong>lavabos</strong>,
              <strong>bañeras</strong>, <strong>revestimientos de paredes</strong> y
              <strong>suelos</strong>, creando un ambiente cálido y acogedor. . Como
              otra opción de <strong>piedra natural</strong> para un diseño artístico,
              la <strong>piedra caliza</strong> tiene texturas sutiles y brillos en
              aplicaciones como <strong>platos de ducha</strong>, lavabos y
              <strong>platos de ducha</strong>. <strong>islas de cocina</strong> al
              mismo tiempo que complementan a la perfección diseños modernos y
              tradicionales. Mientras que las <strong>encimeras</strong> duraderas y
              resistentes al calor hacen que cocinar sea un placer, los elegantes
              <strong>fregaderos</strong> y <strong>bañeras</strong> de piedra
              convierten las rutinas diarias en experiencias lujosas. Los
              <strong>platos de ducha</strong> y <strong>bañeras</strong> de piedra,
              diseñados para ofrecer estilo y funcionalidad, realzan el atractivo de
              cualquier baño <strong>residencial</strong> y
              <strong>comercial</strong>. con su apariencia elegante y perfecta para
              la decoración de su baño y cocina.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 7">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Es La Losa De Piedra Natural?</h3>
            <p class="description" style="text-align: justify">
              Las exquisitas losas de piedra natural de <strong>mármol</strong>,
              <strong>travertino</strong> y <strong>caliza</strong> son una de las
              mejores opciones para conseguir superficies impresionantes. Mejore sus
              espacios con <strong>losas de piedra natural</strong> de primera calidad
              hechas de <strong>mármol</strong>, <strong>travertino</strong> y
              <strong>piedra caliza</strong>. Perfectas para una amplia gama de
              superficies, estas losas son ideales para crear lujosas
              <strong>encimeras de cocina</strong>, elegantes
              <strong>tocadores de baño</strong>, <strong>pisos</strong> duraderos y
              <strong>suelos</strong> llamativos
              <strong>revestimiento de paredes</strong>. Ya sea diseñando elegantes
              <strong>paredes de ducha</strong>,
              <strong>encimeras de muebles</strong> personalizados o superficies de
              <strong>patios al aire libre</strong>, nuestras
              <strong>losas de piedra natural</strong> brindan una belleza atemporal y
              versatilidad inigualable. Cada losa se selecciona cuidadosamente por sus
              patrones, colores y texturas únicos, lo que garantiza que sus
              superficies sean tan distintivas como su estilo. Con su durabilidad y
              elegancia <strong>natural</strong>, el <strong>mármol</strong> ofrece
              una sofisticación pulida, el <strong>travertino</strong> añade encanto
              rústico y la <strong>piedra caliza</strong> crea un Aspecto sutil y
              refinado. Estas <strong>losas</strong> son aptas tanto para espacios
              <strong>residenciales</strong> como <strong>comerciales</strong>,
              transformando <strong>cocinas</strong>, <strong>baños</strong> ,
              <strong>salas de estar</strong>, <strong>oficinas</strong> e incluso
              <strong>áreas al aire libre</strong> en impresionantes obras de arte.
              Explore nuestra colección para encontrar la
              <strong>losa de piedra natural</strong> perfecta para sus
              <strong>diseños arquitectónicos</strong> y cree superficies que resistan
              el paso del tiempo y al mismo tiempo agreguen una elegancia inigualable
              a cada rincón de su espacio.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 8">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Son Los Productos de Cuarzo?</h3>
            <p class="description" style="text-align: justify">
              Las <strong>losas de cuarzo</strong> son una combinación elegante de
              belleza natural y durabilidad diseñada, lo que las convierte en una
              opción versátil tanto para aplicaciones
              <strong>residenciales</strong> como <strong>comerciales</strong>.
              Compuestas por más del 90 % de cristales de
              <strong>cuarzo</strong> naturales combinados con resinas y pigmentos,
              estas losas ofrecen una resistencia excepcional y
              <strong>superficies</strong> no porosas que resisten las manchas, los
              rayones y el calor. Disponibles en una amplia gama de colores, patrones
              y acabados, las <strong>losas de cuarzo</strong> pueden imitar el
              aspecto de la <strong>piedra natural</strong> al mismo tiempo que
              brindan una mayor consistencia y un mantenimiento mínimo. Ya sea que se
              utilicen para <strong>encimeras de cocina</strong>,
              <strong>tocadores de baño</strong> o
              <strong>revestimientos de paredes</strong>, las
              <strong>losas de cuarzo</strong> ofrecen una apariencia sofisticada y
              pulida que complementa Diseños <strong>contemporáneos</strong> y
              <strong>clásicos</strong> por igual. Las
              <strong>losas de cuarzo</strong> también se pueden utilizar para
              <strong>salpicaderos</strong>, <strong>mesas</strong> o
              <strong>muebles</strong>, lo que añade un toque de sofisticación y
              resistencia a <strong>mesas de comedor</strong>,
              <strong>mesas de centro</strong> y más. Su durabilidad y su bajo
              mantenimiento hacen que las <strong>losas de cuarzo</strong> sean una
              inversión práctica pero elegante, especialmente para
              <strong>encimeras de cocina</strong> e <strong>islas</strong>, lo que
              garantiza longevidad y belleza durante muchos años. venir. Ya sea que
              esté diseñando un espacio minimalista o un
              <strong>interior</strong> atrevido y espectacular, estas losas se
              adaptan sin esfuerzo a su visión. Su apariencia consistente, junto con
              la posibilidad de elegir diferentes <strong>perfiles de borde</strong> y
              <strong>acabados</strong> (<strong>pulido</strong>,
              <strong>mate</strong> o <strong>texturado</strong>), garantiza que se
              integren perfectamente en cualquier
              <strong>estilo de diseño arquitectónico</strong>. Sus requisitos de bajo
              mantenimiento y su belleza duradera los convierten en los favoritos
              entre <strong>propietarios</strong>, <strong>arquitectos</strong> y
              <strong>diseñadores de interiores</strong>. Con el
              <strong>cuarzo</strong> estás eligiendo una
              <strong>superficie</strong> que resistirá el paso del tiempo manteniendo
              su elegancia y funcionalidad.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 9">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Son Los Subproductos?</h3>
            <p class="description" style="text-align: justify">
              La <strong>piedra natural</strong> aporta una sensación de lujo y
              belleza atemporal a cualquier <strong>lugar</strong> como
              <strong>salón</strong>, <strong>baño</strong>,
              <strong>cocinas</strong> y <strong>jardines</strong> de
              <strong>tus proyectos</strong> comerciales y
              <strong>residenciales</strong>. Ya sea que esté diseñando edificios
              <strong>residenciales</strong> o <strong>comerciales</strong>, la
              <strong>piedra natural</strong> es la mejor opción para crear una
              estética sofisticada en <strong>diseños arquitectónicos</strong>.
              Elaborados por la naturaleza, materiales como el
              <strong>travertino</strong>, el <strong>mármol</strong>, la
              <strong>piedra caliza</strong> y el <strong>granito</strong> ofrecen una
              durabilidad, elegancia y un diseño únicos inigualables. carácter a
              cualquier <strong>decoración</strong>. Cada pieza de
              <strong>piedra natural</strong> es una obra de arte única, que presenta
              distintos patrones, vetas y texturas que añaden carácter y sofisticación
              a su <strong>interior</strong> y <strong>áreas exteriores</strong>. Se
              pueden tallar cantos rodados de piedra natural para diseñar sus lugares
              <strong>interiores</strong> y <strong>exteriores</strong> con elegancia.
              Productos como <strong>escaleras</strong>, <strong>molduras</strong>,
              <strong>zócalos</strong> y <strong>chimeneas</strong> son perfectos para
              <strong>propietarios</strong>, <strong>diseñadores</strong> y
              <strong>constructores</strong> que buscan soluciones en piedra de alta
              calidad para su decoración interior. <strong>Fuentes</strong>,
              <strong>balaustradas</strong> y <strong>macetas</strong> son
              <strong>opciones elegantes</strong> para realzar tus
              <strong>jardines</strong>, <strong>patios</strong>,
              <strong>piscinas</strong> y terrazas con un lujoso
              <strong>diseño exterior</strong>. Ya sea que prefiera la sofisticación
              <strong>pulida</strong> del <strong>mármol</strong>, la calidez
              <strong>rústica</strong> del <strong>travertino</strong> o el
              minimalismo moderno de <strong> piedra caliza</strong>, los productos de
              piedra natural se adaptan a una variedad de estilos de diseño. Ya sea
              mejorando sus <strong>interiores</strong> con
              <strong>molduras</strong> sofisticadas, creando un punto focal acogedor
              con <strong>chimeneas</strong> de piedra personalizadas o transformando
              espacios al aire libre con impresionantes <strong>fuentes</strong>,
              nuestros productos de <strong>piedra natural</strong> combinan belleza y
              funcionalidad.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 11">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Son Los Materiales de Instalación?</h3>
            <p class="description" style="text-align: justify">
              Encuentre <strong>materiales de instalación</strong> de primera calidad
              para sus proyectos de <strong>piedra natural</strong> y
              <strong>baldosas</strong>, incluidos <strong>adhesivos</strong> y
              <strong>selladores</strong> y <strong>lechadas</strong>. Nuestros
              <strong>adhesivos</strong> premium garantizan una unión fuerte y
              duradera para todo tipo de superficies de <strong>piedra</strong> y
              <strong>baldosas</strong>, lo que los hace ideales para
              <strong>paredes</strong>, <strong>suelos</strong> y
              <strong>aplicaciones en exteriores</strong>. Proteja su inversión con
              <strong>selladores para piedra</strong> avanzados que protegen contra
              las manchas, la humedad y el desgaste mientras preservan la belleza
              natural de sus <strong>superficies de piedra</strong>. Complete el
              aspecto con <strong>lechadas</strong> duraderas y del mismo color que
              proporcionan un <strong>acabado pulido</strong> y un rendimiento
              duradero. Nuestros <strong>materiales de instalación</strong> están
              diseñados para afrontar los desafíos únicos
              <strong>de la piedra natural</strong>, garantizando un acabado impecable
              que resista la prueba del tiempo. Elija entre una gama de productos
              adaptados a sus necesidades específicas, ya sea que trabaje con mármol,
              travertino o <strong>piedra caliza</strong>. Con una fácil aplicación y
              resultados de nivel profesional, estos materiales simplifican el proceso
              de <strong>instalación</strong> de las
              <strong>baldosas de piedra natural</strong> tanto para expertos como
              para aficionados al bricolaje. Consiga resultados impresionantes y
              duraderos en decoración de <strong>interiores</strong> y
              <strong>exteriores</strong> con materiales que son tan fiables como
              eficaces.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 18">
          <div class="col-sm-12">
            <h3 class="header">¿Qué Es El Cartón Yeso?</h3>
            <p class="description" style="text-align: justify">
              Las <strong>placas de yeso</strong>, también conocidas como
              <strong>paneles de yeso</strong> o <strong>placas de yeso</strong>, son
              un <strong>material de construcción</strong> liviano y versátil que se
              utiliza para crear <strong>placas de yeso</strong> fuertes
              <strong>paredes interiores</strong> y <strong>techos</strong>.
              Fabricadas a partir de un núcleo de yeso intercalado entre capas de
              papel duradero, las <strong>placas de yeso</strong> son conocidas por su
              fácil instalación, rentabilidad y propiedades resistentes al fuego. Está
              disponible en una variedad de tipos, incluidas las opciones
              <strong>resistente a la humedad</strong>,
              <strong>resistente al fuego</strong> e <strong>insonorizado</strong>, lo
              que lo hace adecuado para <strong> proyectos residenciales</strong>,
              <strong>comerciales</strong> e <strong>industriales</strong>. Una vez
              instalado, se puede pintar, empapelar o colocar azulejos para que
              coincida con la estética deseada. Los
              <strong>placas de yeso</strong> también son livianos, lo que facilita el
              transporte y la manipulación durante la <strong>construcción</strong>.
              Los paneles de yeso resultan muy beneficiosos para la edificación por su
              versatilidad y prestaciones. Ofrece un excelente aislamiento
              <strong>térmico</strong> y <strong>acústico</strong>, mejorando la
              eficiencia energética y la reducción del ruido en los
              <strong>espacios habitables</strong>. Sus variantes
              <strong>resistentes al fuego</strong> añaden una capa extra de
              seguridad, mientras que las tablas
              <strong>resistentes a la humedad</strong> son ideales para
              <strong>baños</strong>, <strong>cocinas</strong> y otras zonas húmedas.
              Además, la capacidad de las placas de yeso para cortarse y moldearse
              fácilmente permite <strong>diseños</strong> creativos, lo que las
              convierte en un material esencial para los proyectos de
              <strong>construcción</strong> y <strong>renovación modernos. </strong>.
            </p>
          </div>
        </div>
      </div>
    </template>
  </ProductsCategoryPage>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

/* Tanitim bloklari `category_id` degiskenine bakiyor; metinleri degistirmemek
   icin ad korundu ve rota parametresinden besleniyor. */
const route = useRoute();
const category_id = computed(() => Number(route.params.id));
</script>

<style scoped>
/* Tanitim metni. Icerik `.header` / `.description` gibi global siniflar
   kullaniyor (assets/css/default.css) — metinlere dokunmamak icin siniflar
   oldugu gibi birakilip gorunum burada temaya cekiliyor. */
.cat-intro {
  max-width: 68ch;
  margin: clamp(2.5rem, 5vw, 4rem) auto clamp(2rem, 4vw, 3.5rem);
  padding-top: 1.75rem;
  border-top: 1px solid var(--mk-border);
  font-family: var(--mk-ff-body);
}

.cat-intro :deep(.header) {
  margin: 0 0 0.875rem;
  font-family: var(--mk-ff-display);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: start;
  text-transform: none;
  color: var(--mk-ink);
}

.cat-intro :deep(.description) {
  /* default.css'te text-indent: 25px var; paragraf girintisi bu tasarimda
     istenmiyor. */
  text-indent: 0;
  font-size: 0.9375rem;
  line-height: 1.8;
  text-align: start !important;
  color: var(--mk-body);
}

/* Vurgular eskiden italik + mavi idi, metin boyunca cok sik geciyor ve
   okumayi zorlastiriyordu. Sadece kalin. */
.cat-intro :deep(strong) {
  font-weight: 600;
  font-style: normal;
  color: var(--mk-ink);
}

/* Bootstrap satir/kolon sarmallari artik gereksiz; tanitim tek kolon. */
.cat-intro :deep(.row),
.cat-intro :deep([class^="col-"]) {
  margin: 0;
  padding: 0;
  width: auto;
  text-align: start !important;
}
</style>
