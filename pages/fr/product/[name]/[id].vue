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
            <h3 class="header" style="font-weight: bold">
              Qu'est-ce Que Le Marbre ?
            </h3>
            <p class="description" style="text-align: justify">
              Les <strong>carreaux en marbre</strong> sont des carreaux de
              <strong>pierre naturelle</strong> fabriqués à partir de<strong>
                marbre</strong
              >, une roche métamorphique formée lorsque le<strong> calcaire </strong>
              subit une pression et une chaleur extrêmes. Connus pour leurs veines
              uniques et leurs riches variations de couleurs, chaque carrelage en
              marbre est distinct et visuellement époustouflant. Leur structure
              cristalline leur permet d'être polis jusqu'à obtenir un brillant élevé,
              ajoutant ainsi leur attrait luxueux à vos designs
              <strong>intérieurs</strong> et <strong>extérieurs. </strong>Disponibles
              dans diverses finitions telles que
              <strong>polies, aiguisées, polies, sablées </strong>et
              <strong>bouchardées, les carreaux de marbre </strong>offrent une
              polyvalence de conception. Ils sont largement utilisés dans les
              <strong>
                revêtements de sol, les revêtements muraux, les comptoirs</strong
              >
              et les <strong> salles de bains </strong>, ajoutant de l'élégance aux
              <strong> espaces résidentiels </strong>et<strong> commerciaux</strong>.
              Les carreaux de marbre sont résistants à la chaleur, ce qui les rend
              adaptés aux <strong>cuisines, cheminées </strong>et aux
              <strong>applications extérieures</strong> ainsi qu'aux
              <strong>décorations intérieures</strong>. Une étanchéité et un entretien
              adéquats aident à les protéger des taches et de la gravure. Leur beauté
              intemporelle et leur durabilité en font un investissement à long terme
              dans tout projet. En tant que matériau naturel et respectueux de
              l'environnement, le marbre est un choix durable pour rehausser
              l'esthétique et la valeur de vos décorations<strong>
                intérieures </strong
              >et<strong> extérieures.</strong>
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 2">
          <div class="col-sm-12">
            <h3 class="header">Qu’est-ce Que le Travertin ?</h3>
            <p class="description" style="text-align: justify">
              Le <strong> travertin </strong> est une pierre naturelle formée par la
              précipitation rapide du carbonate de calcium dans les sources minérales,
              en particulier les sources chaudes. Il s'agit d'un type de
              <strong> calcaire </strong> à structure poreuse, souvent caractérisé par
              ses tons chauds et terreux comme le beige, la crème, le beige et la
              rouille. La texture unique du travertin et ses creux naturels lui
              confèrent un charme rustique, même s'ils peuvent être remplis pour une
              finition plus lisse. Disponible dans des finitions telles que
              <strong> adouci</strong>, <strong> poli</strong>,
              <strong> brossé</strong> ou <strong> dégringolé</strong>, le
              <strong> travertin </strong> est polyvalent pour différents styles de
              <strong> conception architecturale</strong>. Il est couramment utilisé
              dans les <strong> revêtements de sol</strong>, les
              <strong> revêtements muraux</strong>, les <strong> patios</strong>, les
              <strong>bords de piscine</strong> et les
              <strong>surfaces de salles de bains</strong>. En raison de ses
              propriétés <strong>antidérapantes</strong>. Les
              <strong>carreaux de travertin</strong> sont durables et peuvent résister
              aux intempéries, ce qui les rend idéaux pour les applications
              <strong>intérieures</strong> et <strong>extérieures</strong>.
              <strong>Une bonne étanchéité</strong> est essentielle pour protéger le
              <strong>travertin</strong> des taches et de l’absorption de l’humidité.
              Son attrait intemporel et sa chaleur naturelle font du
              <strong>travertin</strong> un choix populaire pour réaliser des
              décorations <strong>intérieures</strong> et
              <strong>extérieures</strong> classiques et élégantes. En tant que
              matériau respectueux de l'environnement, le travertin contribue à des
              idées et des designs de décoration d'intérieur durables et
              esthétiquement agréables pour les <strong>architectes</strong>, les
              <strong>designers</strong> et les utilisateurs finaux.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 3">
          <div class="col-sm-12">
            <h3 class="header">Qu’est-ce Que le Calcaire ?</h3>
            <p class="description" style="text-align: justify">
              <strong>Les carreaux de calcaire</strong> sont fabriqués à partir d'une
              roche sédimentaire qui se forme au cours de millions d'années à partir
              de l'accumulation de matières organiques telles que des coquillages et
              des sédiments marins. Réputés pour leurs couleurs douces et neutres
              comme la crème, le beige, le gris et le blanc,
              <strong>les carreaux de calcaire </strong> créent une esthétique
              apaisante et naturelle pour vos
              <strong>décorations intérieures</strong> et
              <strong>extérieures </strong>. Leurs motifs subtils et leurs textures
              lisses en font un choix polyvalent pour les conceptions architecturales
              <strong>modernes</strong> et <strong>classiques</strong>.
              <strong>Les carreaux de calcaire </strong> sont couramment utilisés pour
              <strong>les revêtements de sol</strong>,
              <strong>les revêtements muraux</strong> et
              <strong>les pavages extérieurs</strong>, offrant un mélange de beauté et
              de fonctionnalité. Ils sont particulièrement appréciés pour leur
              capacité à rester au frais sous les pieds, ce qui les rend idéaux pour
              les <strong>climats chauds</strong> et les
              <strong>espaces extérieurs</strong>. Disponible dans des finitions
              telles que <strong>aiguisé</strong>, <strong>brossé</strong>,
              <strong>dégringolé</strong>, <strong>sablé</strong> et
              <strong>bouchardé</strong>; <strong>le calcaire </strong> est un
              excellent choix pour diverses
              <strong>conceptions architecturales</strong>. Il est couramment utilisé
              dans les<strong> revêtements de sol </strong>,<strong
                >revêtements muraux </strong
              >,<strong>patios </strong>,<strong>abords de piscine </strong> et
              <strong>surface de la salle de bain</strong> en raison de ses propriétés
              <strong>antidérapantes</strong>. Bien que plus doux que les autres
              pierres naturelles, le calcaire est suffisamment durable pour les
              applications résidentielles et commerciales lorsqu'il est correctement
              entretenu. Un scellage régulier est recommandé pour le protéger de
              l'humidité et des taches, en particulier dans les zones humides ou à
              fort trafic. <strong>Les carreaux de calcaire </strong> sont un choix
              écologique et intemporel pour <strong> les architectes </strong> et
              <strong>les designers</strong>, mettant en valeur les espaces avec leur
              élégance discrète et leur attrait naturel.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 4">
          <div class="col-sm-12">
            <h3 class="header">Qu’est-ce que les mosaïques ?</h3>
            <p class="description" style="text-align: justify">
              <strong>Les mosaiques de marbre</strong>, de
              <strong>travertin</strong> et de <strong>calcaire</strong> sont des
              <strong>carreaux décoratifs</strong> fabriqués à partir de
              <strong>pierres naturelles</strong> pour ajouter un look sophistiqué aux
              designs <strong>intérieurs</strong> et <strong>extérieurs</strong>. Ces
              <strong>mosaïques</strong> sont méticuleusement conçues en disposant de
              petits morceaux de pierre selon des motifs ou des formes complexes, ce
              qui en fait un choix populaire pour ajouter de l'élégance à diverses
              <strong>décorations architecturales</strong>.
              <strong>Les mosaïques en marbre</strong> sont appréciées pour leur
              <strong>finition polie</strong>, leur durabilité et leur attrait
              luxueux, présentant souvent des motifs de veines intemporels dans des
              tons de blanc, de gris ou de noir.
              <strong>Les mosaïques en travertin</strong> et
              <strong>en pierre calcaire</strong>, quant à elles, offrent un charme
              plus rustique avec leurs tons terreux et leur texture poreuse
              caractéristique, créant une ambiance chaleureuse et naturelle pour votre
              <strong>intérieur </strong> et <strong>décorations extérieures</strong>.
              Idéal pour les <strong>dosserets</strong>, les
              <strong>salles de bains</strong>, les <strong>cuisines</strong> et les
              <strong>murs caractéristiques</strong>, <strong>marbre</strong>,
              <strong>les travertin</strong> et les
              <strong>mosaïques en pierre calcaire</strong> allient style et
              fonctionnalité. Les <strong>mosaïques en pierre naturelle</strong> sont
              un choix de premier ordre pour les <strong>propriétaires</strong> et les
              <strong>designers</strong> qui cherchent à rehausser leurs
              <strong>designs élégants</strong> avec un mélange de styles classiques.
              beauté et praticité moderne. Les mosaïques peuvent offrir des idées de
              décorations colorées pour des projets <strong>résidentiels</strong> et
              <strong>commerciaux</strong>.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 5">
          <div class="col-sm-12">
            <h3 class="header">Qu'est-ce Que Les Produits En Pierre D'extérieur ?</h3>
            <p class="description" style="text-align: justify">
              <strong>Les produits en pierre d'extérieur</strong> sont des matériaux
              en pierre naturels ou manufacturés spécialement conçus pour être
              utilisés dans des <strong>applications extérieures</strong>. Ces
              produits sont conçus pour résister à diverses conditions
              météorologiques, y compris la pluie, l'exposition au soleil, le gel et
              la circulation piétonnière intense, ce qui en fait des solutions
              durables et polyvalentes pour les <strong>espaces extérieurs</strong>.
              Les produits en pierre d'extérieur courants
              comprennent<strong>pavés</strong>, <strong>carreaux</strong>,
              <strong>margelles</strong>, <strong>revêtement</strong> et
              <strong>pierres d'aménagement paysager</strong>, fabriquées à partir de
              matériaux comme <strong>travertin</strong>, <strong>marbre</strong>,
              <strong>granit</strong>, <strong>calcaire</strong> et
              <strong>ardoise</strong>. Ils sont fréquemment utilisés pour créer des
              <strong>patios</strong>, des<strong>allées</strong>, des<strong
                >entourages de piscines</strong
              >, des<strong>murs de jardin</strong>, des<strong>façades</strong> et
              d'autres <strong>éléments extérieurs</strong>. Reconnus pour leur beauté
              naturelle, leur <strong>résistance au glissement</strong> et leur faible
              entretien, les <strong>produits d'extérieur en pierre</strong> ajoutent
              une esthétique intemporelle tout en améliorant la fonctionnalité et la
              valeur des <strong>espaces extérieurs</strong>. le
              <strong>marbre</strong> et le <strong>travertin</strong>, en
              particulier, sont très recherchés pour les
              <strong>projets extérieurs</strong> en raison de leur beauté naturelle
              et de leur résistance durable. <strong>Le marbre</strong> offre un
              aspect luxueux et poli, parfait pour les espaces extérieurs sophistiqués
              tels que les <strong>patios</strong> et les
              <strong>allées de jardin</strong>. <strong>Le travertin</strong>, avec
              sa texture rustique et sa surface <strong>antidérapante</strong>, est
              idéal pour <strong>les abords de piscine</strong>,
              <strong>les allées</strong> et
              <strong>les escaliers extérieurs</strong>, assurant la sécurité sans
              compromettre le style. Les deux matériaux sont naturellement résistants
              à la chaleur, ce qui en fait un excellent choix pour les environnements
              ensoleillés. Lorsqu'ils sont correctement scellés et entretenus, les
              produits <strong>marble</strong>, <strong>travertin</strong> et
              <strong>limestone outdoor</strong> peuvent durer des décennies,
              conservant leur charme et augmentant la valeur de toute propriété.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 6">
          <div class="col-sm-12">
            <h3 class="header">
              Qu'est-ce Que Les Produits Pour Le Bain Et La Cuisine ?
            </h3>
            <p class="description" style="text-align: justify">
              La <strong>salle de bain</strong> et la <strong>cuisine</strong> sont
              les zones les plus populaires choisies pour être décorées avec
              l'élégance de la <strong>pierre naturelle</strong>. Transformez vos
              espaces <strong>de salle de bain</strong> et de
              <strong>cuisine</strong> avec la beauté intemporelle et la durabilité
              des produits en <strong>pierre naturelle</strong> fabriqués à partir de
              <strong>marbre</strong>, <strong>travertin</strong> et
              <strong>calcaire</strong>. Ces matériaux exquis apportent une touche de
              luxe et de sophistication, alliant attrait esthétique et fonctionnalité
              pratique. Le <strong>Marbre</strong> est la
              <strong>pierre naturelle</strong> la plus courante pour décorer vos
              <strong>salles de bains</strong> et <strong>cuisines</strong> avec ses
              veines élégantes et sa finition polie, et il ajoute une touche luxueuse
              aux <strong>comptoirs</strong>, aux <strong>dosserets</strong>, aux
              <strong>vanités</strong> et aux <strong>receveurs de douche</strong>.
              Ses motifs uniques garantissent qu'il n'y a pas deux pièces identiques,
              rendant votre espace vraiment unique en son genre. Bien que le
              <strong>travertin</strong> soit connu pour ses tons terreux et sa
              surface texturée, il offre un charme rustique mais raffiné. C'est un
              matériau idéal pour les <strong>éviers</strong>, les
              <strong>baignoires</strong>, les <strong>revêtements muraux</strong> et
              les <strong>sols</strong>, créant une atmosphère chaleureuse et
              accueillante. . Autre choix de <strong>pierre naturelle</strong> pour
              une conception artistique, la <strong>calcaire</strong> présente des
              textures et des brillances subtiles dans des applications telles que les
              <strong>receveurs de douche</strong>, les éviers et les
              <strong>pierres naturelles</strong>.
              <strong>îlots de cuisine</strong> tout en complétant parfaitement les
              designs modernes et traditionnels. Tandis que les
              <strong>comptoirs</strong> durables et résistants à la chaleur font de
              la cuisine un plaisir, les <strong>éviers en pierre</strong> et les
              <strong>baignoires</strong> élégants transforment les routines
              quotidiennes en expériences luxueuses. Les
              <strong>receveurs de douche en pierre</strong> et les
              <strong>baignoires</strong>, conçus à la fois pour le style et la
              fonctionnalité, rehaussent l'attrait de toutes les salles de bains
              <strong>résidentielles</strong> et <strong>commerciales</strong>. avec
              leur aspect élégant et homogène pour vos décorations de salle de bain et
              de cuisine.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 7">
          <div class="col-sm-12">
            <h3 class="header">Qu'est-ce Qu'une Dalle En Pierre Naturelle ? ?</h3>
            <p class="description" style="text-align: justify">
              Les superbes dalles de <strong>marbre</strong>, de
              <strong>travertin</strong> et de
              <strong>pierre naturelle calcaire</strong> sont l'un des meilleurs choix
              pour des surfaces époustouflantes. Améliorez vos espaces avec des
              <strong>dalles en pierre naturelle</strong> de qualité supérieure en
              <strong>marbre</strong>, <strong>travertin</strong> et
              <strong>calcaire</strong>. Parfaites pour une large gamme de surfaces,
              ces dalles sont idéales pour créer des
              <strong>comptoirs de cuisine</strong> luxueux, des
              <strong>vanités de salle de bains</strong> élégantes, des
              <strong>revêtements de sol</strong> durables et des
              <strong>revêtement mural</strong>. Qu'il s'agisse de concevoir des
              <strong>murs de douche</strong> élégants, des
              <strong>dessus de meubles</strong> personnalisés ou des surfaces de
              <strong>terrasse extérieure</strong>, nos
              <strong>dalles en pierre naturelle</strong> offrent une beauté
              intemporelle et une polyvalence inégalée. Chaque dalle est soigneusement
              sélectionnée pour ses motifs, couleurs et textures uniques, garantissant
              que vos surfaces sont aussi distinctives que votre style. Avec leur
              durabilité et leur élégance <strong>naturelle</strong>, le
              <strong>marbre</strong> offre une sophistication polie, le
              <strong>travertin</strong> ajoute un charme rustique et le
              <strong>calcaire</strong> crée un look subtil et raffiné. Ces
              <strong>dalles</strong> conviennent aussi bien aux espaces
              <strong>résidentiels</strong> que <strong>commerciaux</strong>,
              transformant les <strong>cuisines</strong>, les
              <strong>salles de bains</strong> , <strong>salons</strong>,
              <strong>bureaux</strong> et même <strong>espaces extérieurs</strong> en
              de superbes œuvres d'art. Explorez notre collection pour trouver la
              <strong>dalle de pierre naturelle</strong> parfaite pour vos
              <strong>conceptions architecturales</strong> et créez des surfaces qui
              résistent à l'épreuve du temps tout en ajoutant une élégance inégalée à
              chaque coin de votre espace.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 8">
          <div class="col-sm-12">
            <h3 class="header">Qu'est-ce Que Les Produits à Quartz ?</h3>
            <p class="description" style="text-align: justify">
              Les <strong>dalles de quartz</strong> sont un mélange élégant de beauté
              naturelle et de durabilité technique, ce qui en fait un choix polyvalent
              pour les applications <strong>résidentielles</strong> et
              <strong>commerciales</strong>. Composées de plus de 90 % de cristaux de
              <strong>quartz</strong> naturels combinés à des résines et des pigments,
              ces dalles offrent une résistance exceptionnelle et des
              <strong>surfaces</strong> non poreuses qui résistent aux taches, aux
              rayures et à la chaleur. Disponibles dans une large gamme de couleurs,
              de motifs et de finitions, les <strong>dalles de quartz</strong> peuvent
              imiter l'apparence de la <strong>pierre naturelle</strong> tout en
              offrant une cohérence améliorée et un entretien minimal. Qu'elles soient
              utilisées pour les <strong>comptoirs de cuisine</strong>, les
              <strong>vanités de salle de bains</strong> ou les
              <strong>revêtements muraux</strong>, les
              <strong>dalles de quartz</strong> offrent une apparence sophistiquée et
              polie qui complète Des designs <strong>contemporains</strong> et
              <strong>classiques</strong>. Les
              <strong>dalles de quartz</strong> peuvent également être utilisées pour
              les <strong>dosserets</strong>, les <strong>dessus de table</strong> ou
              les <strong>meubles</strong>, ce qui ajoute une touche de sophistication
              et de résilience à <strong>des dalles de quartz</strong>.
              <strong>tables à manger</strong>, <strong>tables basses</strong> et bien
              plus encore. Leur faible entretien et leur durabilité font des
              <strong>dalles de quartz</strong> un investissement à la fois pratique
              et élégant, en particulier pour les
              <strong>comptoirs de cuisine</strong> et les <strong>îlots</strong>,
              garantissant longévité et beauté pendant des années. viens. Que vous
              conceviez un espace minimaliste ou un
              <strong>intérieur</strong> audacieux et spectaculaire, ces dalles
              s'adaptent sans effort à votre vision. Leur apparence cohérente,
              associée à la possibilité de choisir différents
              <strong>profils de chant</strong> et
              <strong>finitions</strong> (<strong>poli</strong>,
              <strong>mat</strong> ou <strong>texturé</strong>), garantit qu'ils
              s'intègrent parfaitement dans n'importe quel
              <strong>style de conception architecturale</strong>. Leurs faibles
              besoins d'entretien et leur beauté durable en font les favoris des
              <strong>propriétaires</strong>, des <strong>architectes</strong> et des
              <strong>décorateurs d'intérieur</strong>. Avec le
              <strong>quartz</strong>, vous choisissez une
              <strong>surface</strong> qui résistera à l'épreuve du temps tout en
              conservant son élégance et sa fonctionnalité.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 9">
          <div class="col-sm-12">
            <h3 class="header">Qu'est-ce Que Les Sous-Produits ?</h3>
            <p class="description" style="text-align: justify">
              La <strong>pierre naturelle</strong> apporte une sensation de luxe et de
              beauté intemporelle à tous les <strong>lieux de vie</strong> comme les
              <strong>salons</strong>, les <strong>salles de bains</strong>,
              <strong>cuisines</strong> et <strong>jardins</strong> de
              <strong>vos projets commerciaux</strong> et
              <strong>résidentiels</strong>. Que vous conceviez des
              <strong>bâtiments résidentiels</strong> ou des
              <strong>bâtiments commerciaux</strong>, la
              <strong>pierre naturelle</strong> est le choix ultime pour créer une
              esthétique sophistiquée dans les
              <strong>conceptions architecturales</strong>. Fabriqués par la nature,
              des matériaux comme le <strong>travertin</strong>, le
              <strong>marbre</strong>, le <strong>calcaire</strong> et le
              <strong>granit</strong> offrent une durabilité, une élégance et un
              caractère unique inégalés. du caractère à n'importe quelle
              <strong>décoration</strong>. Chaque pièce de
              <strong>pierre naturelle</strong> est une œuvre d'art unique en son
              genre, présentant des motifs, des veines et des textures distincts qui
              ajoutent du caractère et de la sophistication à votre
              <strong>intérieur</strong> et <strong>les espaces extérieurs</strong>.
              Des rochers en pierre naturelle peuvent être sculptés pour aménager vos
              lieux <strong>intérieurs</strong> et <strong>extérieurs</strong> avec
              élégance. Les produits comme les <strong>escaliers</strong>, les
              <strong>moulures</strong>, les <strong>plinthes</strong> et les
              <strong>foyers</strong> sont parfaits pour les
              <strong>propriétaires</strong>, <strong>concepteurs</strong> et
              <strong>constructeurs</strong> à la recherche de solutions en pierre de
              haute qualité pour leurs décorations intérieures. Les
              <strong>fontaines</strong>, les <strong>balustrades</strong> et les
              <strong>pots de fleurs</strong> sont des
              <strong>choix élégants</strong> pour rehausser vos
              <strong>jardins</strong>, <strong>patios</strong>,
              <strong>piscines</strong> et terrasses avec un
              <strong>design extérieur</strong> luxueux. Que vous préfériez la
              sophistication <strong>polie</strong> du <strong>marbre</strong>, la
              chaleur <strong>rustique</strong> du <strong>travertin</strong> ou le
              minimalisme moderne du <strong> calcaire</strong>, les produits en
              pierre naturelle conviennent à une variété de styles de conception.
              Qu'il s'agisse d'améliorer vos <strong>intérieurs</strong> avec des
              <strong>moulures</strong> sophistiquées, de créer un point focal
              chaleureux avec des <strong>cheminées</strong> en pierre personnalisées
              ou de transformer des espaces extérieurs avec de superbes
              <strong>fontaines</strong>, nos produits en
              <strong>pierre naturelle</strong> allient beauté et fonctionnalité.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 11">
          <div class="col-sm-12">
            <h3 class="header">Qu'est-ce Que Le Matériel D'Installation ?</h3>
            <p class="description" style="text-align: justify">
              Trouvez des <strong>matériaux d'installation</strong> de première
              qualité pour vos projets de <strong>pierre naturelle</strong> et de
              <strong>carrelage</strong>, y compris des <strong>adhésifs</strong> et
              des <strong>scellants</strong> <strong>scellants</strong> et
              <strong>coulis</strong>. Nos <strong>adhésifs</strong> haut de gamme
              assurent une adhérence solide et durable pour tous les types de surfaces
              en <strong>pierre</strong> et <strong>carrelage</strong>, ce qui les
              rend idéaux pour les <strong>murs</strong>, les <strong>sols</strong> et
              les <strong>applications extérieures</strong>. Protégez votre
              investissement avec des <strong>scellants pour pierre</strong> avancés
              qui protègent contre les taches, l'humidité et l'usure tout en
              préservant la beauté naturelle de vos
              <strong>surfaces en pierre</strong>. Complétez le look avec des
              <strong>coulis</strong> durables de couleur assortie qui offrent une
              <strong>finition polie</strong> et des performances durables. Nos
              <strong>matériaux d'installation</strong> sont conçus pour relever les
              défis uniques <strong>de la pierre naturelle</strong>, garantissant une
              finition impeccable qui résiste à l'épreuve du temps. Choisissez parmi
              une gamme de produits adaptés à vos besoins spécifiques, que vous
              travailliez du marbre, du travertin ou du <strong>calcaire</strong>.
              Avec une application facile et des résultats de qualité professionnelle,
              ces matériaux simplifient le processus d'<strong>installation</strong>
              des <strong>carreaux en pierre naturelle</strong> pour les experts et
              les bricoleurs. Obtenez des résultats de décoration
              <strong>intérieure</strong> et
              <strong>extérieure</strong> époustouflants et durables avec des
              matériaux aussi fiables qu’efficaces.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 18">
          <div class="col-sm-12">
            <h3 class="header">Qu’est-ce Que Les Plaques de Plâtre ?</h3>
            <p class="description" style="text-align: justify">
              Les <strong>plaques de plâtre</strong>, également connues sous le nom de
              <strong>cloisons sèches</strong> ou <strong>plaques de plâtre</strong>,
              sont un <strong>matériau de construction</strong> léger et polyvalent
              utilisé pour créer des <strong>plaques de plâtre</strong> lisses.
              <strong>Murs intérieurs</strong> et <strong>plafonds</strong>.
              Fabriquées à partir d'un noyau de gypse pris en sandwich entre des
              couches de papier durable, les <strong>plaques de plâtre</strong> sont
              connues pour leur installation facile, leur rentabilité et leurs
              propriétés ignifuges. Il est disponible dans une variété de types, y
              compris les options <strong>résistant à l'humidité</strong>,
              <strong>résistant au feu</strong> et <strong>insonorisé</strong>, ce qui
              le rend adapté à <strong> projets résidentiels</strong>,
              <strong>commerciaux</strong> et <strong>industriels</strong>. Une fois
              installé, il peut être peint, tapissé ou carrelé pour correspondre à
              l’esthétique souhaitée. Les <strong>plaques de plâtre</strong> sont
              également légères, ce qui facilite le transport et la manipulation
              pendant la <strong>construction</strong>. Les plaques de plâtre sont
              très bénéfiques pour les bâtiments en raison de leur polyvalence et de
              leurs performances. Il offre une excellente isolation
              <strong>thermique</strong> et <strong>acoustique</strong>, améliorant
              l'efficacité énergétique et la réduction du bruit dans les
              <strong>espaces de vie</strong>. Ses variantes
              <strong>résistantes au feu</strong> ajoutent une couche de sécurité
              supplémentaire, tandis que les planches
              <strong>résistantes à l'humidité</strong> sont idéales pour les
              <strong>salles de bains</strong> et les <strong>cuisines</strong>, et
              autres zones humides. De plus, la capacité des
              <strong>plaques de plâtre</strong> à être facilement coupées et
              façonnées permet des <strong>conceptions</strong> créatives, ce qui en
              fait un matériau essentiel pour les projets de
              <strong>construction</strong> et de
              <strong>rénovation modernes. </strong>.
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
