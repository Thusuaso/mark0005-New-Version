export default defineSitemapEventHandler(async (e) => {
    const posts = await Promise.all([
      {
        _path: '/product/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/limestone/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/mosaics/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/outdoor/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/bath-and-kitchen/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/slabs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/quartz/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/by-product/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/installation-materials/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/living-room/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/kitchen/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/bathroom/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/landscape/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/garage/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/pool/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/facede/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/wall/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/area/floor/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/al-greishi-villa-project/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/alawadhi-project/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/adams-project/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/kaddour-project/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/golyan-project/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/beauchamp-project/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/vallinis-project/19',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/jackson-project/20',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/al-sabouni-project/21',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/bader-project/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/mbı-project/26',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/johnson-project/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/littoral-project/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/besse-project/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/nader-project/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/kirry-project/31',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/homayoun-project/32',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/mansour-project/1032',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/hotel-verdi-project/1033',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/khajavi-project/1034',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/andersen-project/1035',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/eislend-project/1036',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/mtt-project/1037',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/hoga-project/1041',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/wall-project/1042',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/al-mahruqi-project/1044',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/san-project/1045',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/crb-project/1046',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/lily-project/1047',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/dgcell-project/1048',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/braun-project/1049',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/tmrp-project/1050',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/randolph-project/1052',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/duo-project/1053',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/gebing-project/1054',
        modifiedAt: new Date(),
      },
      {
        _path: '/project/detail/durham-project/1055',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-light-marble/451',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/blanco-ivory-marble/274',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-lilac-marble/395',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cloudy-grey-marble/941',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/imperial-carrara-marble/979',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/palisandro-marble/942',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble/229',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/alaska-grey-marble/954',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/diana-royal-marble-/437',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-giallo-marble/687',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nero-marquina-marble-/483',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/crema-marfil-marble/477',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/solaris-blue-marble/681',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/dolomite-white-marble/540',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-grey-marble/244',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/lucid-grey-marble/940',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ocean-grey-marble/585',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-tumbled/750',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/storm-grey-marble/619',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/armani-brown-marble/957',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-calacatta-marble/686',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-gold-marble/685',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-natural/749',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/salome-marble/785',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/puffin-grey-marble/545',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/sofita-beige-marble/292',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/savannah-grey-marble/761',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/oasis-grey-marble/688',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/asgrey-marble/684',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-sandblasted-/746',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cappuccino-light-marble/230',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-dark-marble/218',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mende-white-line-marble/754',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/siena-gold-marble-/672',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/carrara-white-marble/475',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-tiger-marble/217',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/coffee-royal-marble/476',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-antique-marble/786',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/burdur-beige-marble/389',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-blue-marble/242',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone/537',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ottoman-beige-marble/312',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/latte-cream-marble-/435',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-beige-marble/275',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pasha-white-marble/696',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/toros-black-marble/279',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/equator-white-marble/396',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/botticino-cream-marble-antique/336',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-antique/647',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/basalt/579',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-light-marble/487',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/royal-beige-marble/237',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/afyon-sugar-marble/420',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/adranos-white-marble/288',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-alicante-marble/486',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-sandblasted-marble/401',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cappuccino-medium-marble/241',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-bamboo/748',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-levanto-marble/536',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pietra-grey-marble/485',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/leonardo-vein-cut-travertine/879',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-vein-cut-travertine/201',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-travertine-honed/41',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/walnut-vein-cut-travertine/39',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-vein-cut-travertine/46',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-vein-cut-travertine/390',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-travertine-natural/547',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-travertine-polished/546',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mina-rustic-vein-cut-travertine/973',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/leonardo-cross-cut-travertine/891',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine/33',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/valencia-travertine/948',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-grey-travertine/43',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-gold-travertine/34',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-travertine/37',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-travertine-pattern-set/801',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/red-travertine/40',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/walnut-travertine/45',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-rustic-travertine/416',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-natural-pattern-set-travertine/42',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-pattern-set-travertine/49',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/scabos-pattern-set-travertine/236',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-grey-pattern-set-travertine/120',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gold-travertine-pattern-set/119',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/volcano-pattern-set-travertine/48',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/walnut-pattern-set-travertine/698',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ivory-rustic-pattern-set-travertine/588',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tuscany-mix-pattern-set-travertine/760',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mina-rustic-pattern-set-travertine/206',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/scott-rustic-pattern-set-travertine/210',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/storm-noche-pattern-set-travertine/693',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-pillowed-pattern-set/381',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-antique-travertine/391',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-antique-travertine/122',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nesco-antique-travertine/587',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/licom-antique-travertine/480',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-grey-antique-travertine/270',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-antique-travertine/202',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-splitface-travertine/484',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-splitface-travertine/213',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rustic-splitface-travertine/212',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-mocha-cream-limestone/949',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-limestone/332',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/perla-limestone/787',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/jerusalem-limestone-/333',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/seagrass-limestone/337',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-paver/415',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-grey-travertine-paver/317',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-sandblasted-paver/964',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-travertine-paver/200',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gold-travertine-paver/199',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-grey-marble-paver/971',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/licom-travertine-paver/966',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-natural-paver/969',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-tumbled-paver/970',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/walnut-travertine-paver/100',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-light-marble-paver/535',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shellstone-limestone-paver/980',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/grey-crazy-paver/951',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/beige-crazy-paver/952',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/white-crazy-paver/854',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/black-angel-pebble/498',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/snow-flakes-pebble/499',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/dolomite-pebble/490',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nyx-pebble/500',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/green-angel-pebble/501',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rainbow-pebble/502',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/granite-pebble/503',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-laguna-pebble/504',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tiger-gneiss-pebble/505',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/lilac-pebble/506',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/egean-brown-pebble/507',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/angel-sparks-pebble/508',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/basalt-pebble/509',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/river-green-pebble/512',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/river-gravels/520',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-slate/495',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/black-angel-flagstone/853',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/river-rock-stone/519',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/meteora-rock-stone/494',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pipeline-rock-stone/496',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/spaghetti-rock-stone/493',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nyx-natural-birdbath/856',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/lilac-natural-birdbath/857',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rainbow-natural-birdbath/858',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/white-natural-birdbath/859',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/black-angel-birdbath/860',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/angel-sparks-birdbath/862',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/black-angel-column/521',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-laguna-column/522',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/lilac-column/523',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/white-column/524',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nyx-column/525',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-101/659',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-107/665',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-114/756',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-115/802',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-3/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-10/60',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-6/53',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-105/663',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-38/76',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-2/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-1/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-103/661',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-106/664',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-109/667',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-102/660',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-110/668',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-113/751',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-37/75',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-112/695',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-104/662',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-7/54',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-5/52',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-8/55',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-34/72',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-21/63',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-11/58',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-22/64',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-9/56',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-24/66',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-23/65',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-26/883',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-14/61',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-28/69',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vessel-sink-model-36/74',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-44/80',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-40/903',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-46/81',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-53/78',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-49/82',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-50/83',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-42/77',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/farmer-sink-model-56/936',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-101/920',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-102/921',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-62/85',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-66/86',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-70/87',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-63/84',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/shower-tray-model-64/890',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-countertop/398',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-countertop/400',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/beige-marble-mountertop/399',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-marble-countertop/397',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-56/88',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-57/89',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-101/932',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-102/933',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-103/934',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-104/935',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-105/937',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bathtub-model-106/974',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-Slab/109',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-travertine-slab/102',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-slab/101',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-limestone-slab/462',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/royal-beige-marble-slab/379',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-lilac-marble-slab/365',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/black-eagle-white-marble-slab/581',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/baiyulan-beige-marble-slab/586',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/puffin-grey-vein-cut-marble-Slab/590',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/puffin-grey-marble-slabs/592',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ocean-grey-marble-slab/596',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-slab/646',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-light-marble-slab/674',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/blue-river-marble-slab/915',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/latte-cream-marble-slab/675',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/crema-marfil-marble-slab/694',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pasha-white-marble-slab/631',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-giallo-marble-slab/939',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/savannah-grey-marble-slab/583',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/afyon-sugar-marble-slab/597',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/astan-grey-marble-slab/914',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/equator-white-marble-slab/403',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/storm-grey-marble-slab/676',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/lilac-dark-marble-slab/917',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/sugar-violet-marble-slab/840',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/verde-guatemala-marble-slab/938',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pasha-vita-marble-slab/632',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-light-marble-slab/460',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/blanco-ivory-marble-slab/375',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/persian-silver-travertine-slab/580',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/platinum-white-marble-slabs/591',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-alicante-marble-slab/679',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/oasis-river-marble-slab/673',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/toros-black-marble-slab/593',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/massa-blanca-marble-slab/680',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-dark-marble-slab/248',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/coffee-royal-marble-slab/533',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-vein-cut-travertine-slab/394',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/solaris-blue-marble-slab/682',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/asgrey-marble-slab/683',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/burdur-beige-marble-slab/691',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gold-travertine-slab/762',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/diana-royal-marble-slab/532',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-grey-travertine-slab/266',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/red-travertine-slab/107',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-grey-marble-slab/454',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cappuccino-light-marble-slab/692',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cappucino-medium-marble-slab/376',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mende-white-marble-slab/699',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-travertine-slab/252',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/imperial-brown-marble-slab/584',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/olive-maroon-marble-slab/629',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/sofita-beige-marble-slab/465',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ottoman-beige-marble-slab/238',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-calacatta-marble-slab/442',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-gold-marble-slab/670',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nero-marquina-marble-slabs/594',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/olive-brown-marble-slab/763',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pietra-grey-marble-slab/648',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/dolomite-white-marble-slab/463',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/salome-marble-slab/655',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/rosso-levanto-marble-Slab/443',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/adranos-white-marble-slab/377',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/perla-limestone-slab/755',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/fantasy-white-marble-slab/794',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/carrara-white-marble-slab/419',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-beige-marble-slab/795',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/jerusalem-limestone-slab/455',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/leonardo-vein-cut-travertine-slab/796',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/siena-gold-marble-slab/671',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-resin-travertine-slab/106',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/onyx-cross-cut-slab/656',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/onyx-honey-comb-slab/657',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/onyx-vein-cut-slab/658',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tundra-blue-marble-slab/254',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-venato-marble-slab/110',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-vein-cut-travertine-slab/479',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-vein-cut-travertine-slab/269',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/golden-river-marble-slab/439',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/palisandro-marble-slab/943',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-moca-cream-limestone-slab/950',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/elsa-quartz-slab/701',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/galaxy-quartz-slab/702',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gereme-quartz-slab/703',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/efesus-quartz-slab/704',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/karia-quartz-slab/705',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/magnolia-quartz-slab/706',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/truva-grey-quartz-slab/707',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/venato-quartz-slab/708',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/irlana-quartz-slab/709',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/helene-quartz-slab/851',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/artistic-black-quartz-slab/764',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-erin-quartz-slab/765',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-lea-quartz-slab/766',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-sue-quartz-slab/767',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-vela-quartz-slab/768',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-mina-quartz-slab/910',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/fantasy-quartz-slab/772',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ice-white-quartz-slab/773',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/idea-quartz-slab/774',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/magnet-quartz-slab/776',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/naris-quartz-slab/777',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/night-quartz-slab/778',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kafkas-quartz-slab/909',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/peak-quartz-slab/779',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/regnis-quartz-slab/780',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/riyana-quartz-slab/781',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/alya-quartz-slab/889',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/scarlet-quartz-slab/782',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/versatile-quartz-slab/783',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mystral-grey-quartz-slab/898',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/polar-breeze-quartz-slab/899',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gloria-quartz-slab/900',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/milas-quartz-slab/901',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/alba-vela-quartz-slab/902',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/mystic-brown-quartz/975',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/astoria-quartz/976',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/linda-quartz/977',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/storm-quartz/978',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-rivera-quartz-slab/981',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/tender-quartz-slab/982',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/hidra-quartz-slab/983',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/ariston-quartz-slab/984',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/crystal-white-quartz-slab/985',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/calacatta-oro-quartz-slab/986',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-stairs/382',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-vein-cut-travertine-stairs/953',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/diana-royal-marble-stairs/958',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-dark-marble-stairs/383',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-stairs/384',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/gold-travertine-stairs/264',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-lilac-marble-stairs/955',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-travertine-stairs/956',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/noche-vein-cut-travertine-stairs/972',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bluestone-stairs/959',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/vanilla-beige-marble-stairs/960',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/turkish-lilac-marble-fireplace/962',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-fireplace/965',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-limestone-fireplace/963',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-fireplace/968',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-square-table-Top/757',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-round-table-Top/538',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/toros-black-marble-square-table-Top/759',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nero-marquina-marble-round-table-Top/758',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/nero-marquina-marble-ellipse-table-Top/539',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/emperador-beige-marble-vase/905',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-vase/904',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-balustrade/209',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/bianco-ibiza-marble-balustrade/464',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/classic-travertine-flowerpot/907',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/silver-travertine-flowerpot/906',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-fountain-oslo/837',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-drains/797',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/medallion-dahlia/884',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/medallion-magnolia/886',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/medallion-poinciana/885',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-fountain-Rome/833',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-fountain-madrid/838',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-fountain-paris/832',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-fountain-beirut/651',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-fountain-moscow/836',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-fountain-muscat/653',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-fountain-london/839',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-fountain-riyadh/649',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/baseboard-molding/203',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/baseboard-tuli/531',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/pencil-molding/204',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-dora/406',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-ogee-2/404',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-ogee-1/265',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-tilt/407',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-cup/208',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/molding-rope/207',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-tile-adhesive-1051/444',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-white-tile-adhesive-1052/445',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-technoflex-adhesive-1054/446',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-technopool-adhesive-1062/908',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-grout---2000-fuga/634',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-grout---2200-ultra-fuga/635',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-grout---2300-fuga-flex/636',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-grout---2500-ultra-fuga-flex/637',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/kalekim-grout---2900-fugapool/639',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/sealing---maxiseal-vh72/633',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/polish---maximax-vh44/700',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/cleaner---maxiclean-vht62/925',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-51/325',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-h515/789',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-51/803',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-h315/791',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-hx44/817',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-d44/790',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-p-44/829',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-cb-bb/828',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-m-22/181',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-d22/190',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-s-rp/814',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-h24/359',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-m-mp/788',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-wg-r/827',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-s-p16/848',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-rv/826',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-r/261',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cc-44/127',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cc-24/124',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mt-w-3d22/372',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mt-c-3d31/374',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tb-c-p26/743',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-y-pz15/392',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-s-pz15/410',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-c-pz26/346',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-p16/731',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-r/931',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tb-y-p26/744',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-p26/771',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-y-3d22/263',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-pz15/816',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-py-imp/434',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-44/182',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cw-s/724',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-ms-wg-p16/849',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-24/174',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-wbl-b/323',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-hx44/271',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/limestone-mosaic-lp-lb-ln/717',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-&-limestone-mosaic-dp-lbs-ln/718',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-ln/578',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-h515/716',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-h27/589',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tu-s-h315/710',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-mp/627',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-24/168',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-24/713',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-lm/623',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-lm/721',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-&-limestone-mosaic-dp-wg-lm/722',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-r/144',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-cn-515/819',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-pg-r/823',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-m3-24/139',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-hx22/714',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/limestone-mosaic-lp-w-ar/729',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-pq/622',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-24/329',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-wbl-bb/135',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-wbl-t/149',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-pq/805',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-gb-b/811',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ccb-b/807',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-hx44/620',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-pg-hx44/799',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-fs/726',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-fs/725',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cc-md/728',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-b-24/793',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-ms-w-44/159',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-44/178',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cb-lf/723',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-bl-c27/800',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-c27/896',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-c27/897',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-22/134',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ccy-t/128',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ccb-o/813',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-&-travertine-mosaic-dp-ws-hx44/624',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-w-hx44/808',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-wg-sky/727',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-m3-d44/720',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-op/628',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-mp/712',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-n-mp/830',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-cc-51/193',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-y-515/844',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-s-515/845',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-m3-22/141',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-cn-22/821',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-p-515/847',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-515/846',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-d22/175',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-m3-24/742',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-m-d22/831',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-44/327',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-44/136',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-m3-44/138',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-g-rp/326',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-24/262',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tf-c-44/544',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-c-3d22/373',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-22/166',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-51/358',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-51/189',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-rp/349',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-cn-b/177',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-44/820',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-c-52/348',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-22/188',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-h24/191',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tt-n-24/357',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-s-24/158',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-n-51/162',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-c-51/343',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tv-c-v44/338',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-ts-c-24/150',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/travertine-mosaic-tv-c-44/172',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ps-hx44/944',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ps-ln/947',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ps-c27/945',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/marble-mosaic-mp-ps-rp/946',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132607/552',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132608/553',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132609/554',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132610/555',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132611/556',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132617/559',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132619/560',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132620/561',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132621/562',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132622/563',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132623/564',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132624/565',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132627/568',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132629/569',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132644/571',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132645/572',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132647/573',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132648/574',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132649/575',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132663/576',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132664/577',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132591/894',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132606/551',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132603/548',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132605/550',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132604/549',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/glass-mosaic-gl132626/567',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/brushed-&-sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/finish/bamboo',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/finish/filled',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/finish/unfilled',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/3/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/3/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/3/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/finish/matt',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/tumbled-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/paver',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/landscape',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/rock-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/column-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/finish/river-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/vessel-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/farmer-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/bathtub',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/pedestal-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/shower-tray',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/finish/countertop',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/finish/marble',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/finish/travertine',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/finish/bookmatched',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/finish/limestone',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/finish/onyx',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/stairs',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/fountain',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/molding',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/table-top',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/fireplace',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/medallion',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/vase',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/flowerpot',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/balustrade',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/finish/drain',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/finish/grouting',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/finish/tile-adhesives',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/finish/tile-cleaner',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/finish/tile-sealers',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/18/finish/fireproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/18/finish/waterproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/18/finish/standard',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/1/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/3/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/3/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/grey/2',
        modifiedAt: new Date(),
      },      {
        _path: '/product/filter/category/4/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/beige/4',
        modifiedAt: new Date(),
      },      {
        _path: '/product/filter/category/7/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/8/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/edge/straight/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/edge/chiseled/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/edge/tumbled/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/4/material/glass/3',
        modifiedAt: new Date(),
      },      {
        _path: '/product/filter/category/4/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/7/material/onyx/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/style/cross cut/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/2/style/vein cut/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/type/paver/22',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/type/pebble/24',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/type/column/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/type/birdbath/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/5/type/crazy paver/23',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/type/sink/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/type/bathtub/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/type/shower tray/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/6/type/countertop/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/stairs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/fountain/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/molding/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/tabletop/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/fireplace/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/medallion/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/balustrade/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/flowerpot/12',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/9/type/vase/28',
        modifiedAt: new Date(),
      },      {
        _path: '/product/filter/category/9/type/drain/14',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/type/grout/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/type/adhesive/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/type/sealer/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/type/cleaner/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/filter/category/11/type/polish/30',
        modifiedAt: new Date(),
      },

      /*FR*/
      {
        _path: '/fr/product/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/limestone/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/mosaics/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/outdoor/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/bath-and-kitchen/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/slabs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/quartz/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/by-product/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/installation-materials/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/living-room/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/kitchen/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/bathroom/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/landscape/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/garage/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/pool/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/facede/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/wall/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/area/floor/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/al-greishi-villa-project/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/alawadhi-project/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/adams-project/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/kaddour-project/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/golyan-project/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/beauchamp-project/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/vallinis-project/19',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/jackson-project/20',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/al-sabouni-project/21',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/bader-project/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/mbı-project/26',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/johnson-project/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/littoral-project/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/besse-project/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/nader-project/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/kirry-project/31',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/homayoun-project/32',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/mansour-project/1032',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/hotel-verdi-project/1033',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/khajavi-project/1034',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/andersen-project/1035',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/eislend-project/1036',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/mtt-project/1037',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/hoga-project/1041',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/wall-project/1042',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/al-mahruqi-project/1044',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/san-project/1045',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/crb-project/1046',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/lily-project/1047',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/dgcell-project/1048',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/braun-project/1049',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/tmrp-project/1050',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/randolph-project/1052',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/duo-project/1053',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/gebing-project/1054',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/project/detail/durham-project/1055',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-light-marble/451',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/blanco-ivory-marble/274',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-lilac-marble/395',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cloudy-grey-marble/941',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/imperial-carrara-marble/979',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/palisandro-marble/942',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble/229',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/alaska-grey-marble/954',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/diana-royal-marble-/437',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-giallo-marble/687',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nero-marquina-marble-/483',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/crema-marfil-marble/477',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/solaris-blue-marble/681',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/dolomite-white-marble/540',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-grey-marble/244',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/lucid-grey-marble/940',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ocean-grey-marble/585',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-tumbled/750',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/storm-grey-marble/619',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/armani-brown-marble/957',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-calacatta-marble/686',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-gold-marble/685',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-natural/749',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/salome-marble/785',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/puffin-grey-marble/545',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/sofita-beige-marble/292',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/savannah-grey-marble/761',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/oasis-grey-marble/688',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/asgrey-marble/684',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-sandblasted-/746',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cappuccino-light-marble/230',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-dark-marble/218',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mende-white-line-marble/754',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/siena-gold-marble-/672',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/carrara-white-marble/475',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-tiger-marble/217',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/coffee-royal-marble/476',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-antique-marble/786',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/burdur-beige-marble/389',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-blue-marble/242',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone/537',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ottoman-beige-marble/312',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/latte-cream-marble-/435',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-beige-marble/275',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pasha-white-marble/696',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/toros-black-marble/279',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/equator-white-marble/396',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/botticino-cream-marble-antique/336',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-antique/647',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/basalt/579',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-light-marble/487',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/royal-beige-marble/237',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/afyon-sugar-marble/420',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/adranos-white-marble/288',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-alicante-marble/486',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-sandblasted-marble/401',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cappuccino-medium-marble/241',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-bamboo/748',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-levanto-marble/536',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pietra-grey-marble/485',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/leonardo-vein-cut-travertine/879',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-vein-cut-travertine/201',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-travertine-honed/41',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/walnut-vein-cut-travertine/39',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-vein-cut-travertine/46',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/yellow-vein-cut-travertine/390',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-travertine-natural/547',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-travertine-polished/546',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mina-rustic-vein-cut-travertine/973',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/leonardo-cross-cut-travertine/891',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine/33',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/valencia-travertine/948',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-grey-travertine/43',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/yellow-gold-travertine/34',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-travertine/37',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-travertine-pattern-set/801',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/red-travertine/40',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/walnut-travertine/45',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-rustic-travertine/416',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-natural-pattern-set-travertine/42',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-pattern-set-travertine/49',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/scabos-pattern-set-travertine/236',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-grey-pattern-set-travertine/120',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gold-travertine-pattern-set/119',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/volcano-pattern-set-travertine/48',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/walnut-pattern-set-travertine/698',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ivory-rustic-pattern-set-travertine/588',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tuscany-mix-pattern-set-travertine/760',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mina-rustic-pattern-set-travertine/206',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/scott-rustic-pattern-set-travertine/210',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/storm-noche-pattern-set-travertine/693',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-pillowed-pattern-set/381',
        modifiedAt: new Date(),
      },
      {
        _path: '/product/detail/yellow-antique-travertine/391',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-antique-travertine/122',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nesco-antique-travertine/587',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/licom-antique-travertine/480',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-grey-antique-travertine/270',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-antique-travertine/202',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-splitface-travertine/484',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-splitface-travertine/213',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rustic-splitface-travertine/212',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-mocha-cream-limestone/949',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-limestone/332',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/perla-limestone/787',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/jerusalem-limestone-/333',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/seagrass-limestone/337',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-paver/415',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-grey-travertine-paver/317',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-sandblasted-paver/964',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-travertine-paver/200',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gold-travertine-paver/199',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-grey-marble-paver/971',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/licom-travertine-paver/966',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-natural-paver/969',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-tumbled-paver/970',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/walnut-travertine-paver/100',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-light-marble-paver/535',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shellstone-limestone-paver/980',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/grey-crazy-paver/951',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/beige-crazy-paver/952',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/white-crazy-paver/854',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/black-angel-pebble/498',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/snow-flakes-pebble/499',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/dolomite-pebble/490',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nyx-pebble/500',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/green-angel-pebble/501',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rainbow-pebble/502',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/granite-pebble/503',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-laguna-pebble/504',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tiger-gneiss-pebble/505',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/lilac-pebble/506',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/egean-brown-pebble/507',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/angel-sparks-pebble/508',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/basalt-pebble/509',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/river-green-pebble/512',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/river-gravels/520',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/yellow-slate/495',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/black-angel-flagstone/853',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/river-rock-stone/519',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/meteora-rock-stone/494',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pipeline-rock-stone/496',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/spaghetti-rock-stone/493',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nyx-natural-birdbath/856',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/lilac-natural-birdbath/857',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rainbow-natural-birdbath/858',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/white-natural-birdbath/859',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/black-angel-birdbath/860',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/angel-sparks-birdbath/862',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/black-angel-column/521',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-laguna-column/522',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/lilac-column/523',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/white-column/524',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nyx-column/525',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-101/659',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-107/665',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-114/756',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-115/802',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-3/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-10/60',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-6/53',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-105/663',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-38/76',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-2/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-1/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-103/661',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-106/664',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-109/667',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-102/660',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-110/668',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-113/751',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-37/75',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-112/695',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-104/662',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-7/54',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-5/52',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-8/55',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-34/72',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-21/63',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-11/58',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-22/64',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-9/56',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-24/66',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-23/65',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-26/883',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-14/61',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-28/69',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vessel-sink-model-36/74',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-44/80',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-40/903',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-46/81',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-53/78',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-49/82',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-50/83',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-42/77',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/farmer-sink-model-56/936',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-101/920',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-102/921',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-62/85',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-66/86',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-70/87',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-63/84',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/shower-tray-model-64/890',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-countertop/398',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-countertop/400',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/beige-marble-mountertop/399',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-marble-countertop/397',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-56/88',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-57/89',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-101/932',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-102/933',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-103/934',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-104/935',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-105/937',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bathtub-model-106/974',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-Slab/109',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-travertine-slab/102',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-slab/101',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-limestone-slab/462',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/royal-beige-marble-slab/379',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-lilac-marble-slab/365',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/black-eagle-white-marble-slab/581',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/baiyulan-beige-marble-slab/586',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/puffin-grey-vein-cut-marble-Slab/590',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/puffin-grey-marble-slabs/592',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ocean-grey-marble-slab/596',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-slab/646',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-light-marble-slab/674',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/blue-river-marble-slab/915',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/latte-cream-marble-slab/675',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/crema-marfil-marble-slab/694',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pasha-white-marble-slab/631',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-giallo-marble-slab/939',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/savannah-grey-marble-slab/583',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/afyon-sugar-marble-slab/597',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/astan-grey-marble-slab/914',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/equator-white-marble-slab/403',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/storm-grey-marble-slab/676',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/lilac-dark-marble-slab/917',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/sugar-violet-marble-slab/840',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/verde-guatemala-marble-slab/938',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pasha-vita-marble-slab/632',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-light-marble-slab/460',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/blanco-ivory-marble-slab/375',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/persian-silver-travertine-slab/580',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/platinum-white-marble-slabs/591',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-alicante-marble-slab/679',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/oasis-river-marble-slab/673',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/toros-black-marble-slab/593',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/massa-blanca-marble-slab/680',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-dark-marble-slab/248',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/coffee-royal-marble-slab/533',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-vein-cut-travertine-slab/394',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/solaris-blue-marble-slab/682',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/asgrey-marble-slab/683',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/burdur-beige-marble-slab/691',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gold-travertine-slab/762',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/diana-royal-marble-slab/532',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-grey-travertine-slab/266',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/red-travertine-slab/107',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-grey-marble-slab/454',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cappuccino-light-marble-slab/692',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cappucino-medium-marble-slab/376',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mende-white-marble-slab/699',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-travertine-slab/252',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/imperial-brown-marble-slab/584',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/olive-maroon-marble-slab/629',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/sofita-beige-marble-slab/465',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ottoman-beige-marble-slab/238',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-calacatta-marble-slab/442',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-gold-marble-slab/670',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nero-marquina-marble-slabs/594',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/olive-brown-marble-slab/763',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pietra-grey-marble-slab/648',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/dolomite-white-marble-slab/463',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/salome-marble-slab/655',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/rosso-levanto-marble-Slab/443',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/adranos-white-marble-slab/377',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/perla-limestone-slab/755',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/fantasy-white-marble-slab/794',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/carrara-white-marble-slab/419',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-beige-marble-slab/795',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/jerusalem-limestone-slab/455',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/leonardo-vein-cut-travertine-slab/796',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/siena-gold-marble-slab/671',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-resin-travertine-slab/106',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/onyx-cross-cut-slab/656',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/onyx-honey-comb-slab/657',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/onyx-vein-cut-slab/658',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tundra-blue-marble-slab/254',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-venato-marble-slab/110',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-vein-cut-travertine-slab/479',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/yellow-vein-cut-travertine-slab/269',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/golden-river-marble-slab/439',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/palisandro-marble-slab/943',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-moca-cream-limestone-slab/950',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/elsa-quartz-slab/701',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/galaxy-quartz-slab/702',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gereme-quartz-slab/703',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/efesus-quartz-slab/704',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/karia-quartz-slab/705',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/magnolia-quartz-slab/706',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/truva-grey-quartz-slab/707',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/venato-quartz-slab/708',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/irlana-quartz-slab/709',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/helene-quartz-slab/851',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/artistic-black-quartz-slab/764',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-erin-quartz-slab/765',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-lea-quartz-slab/766',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-sue-quartz-slab/767',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-vela-quartz-slab/768',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-mina-quartz-slab/910',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/fantasy-quartz-slab/772',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ice-white-quartz-slab/773',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/idea-quartz-slab/774',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/magnet-quartz-slab/776',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/naris-quartz-slab/777',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/night-quartz-slab/778',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kafkas-quartz-slab/909',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/peak-quartz-slab/779',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/regnis-quartz-slab/780',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/riyana-quartz-slab/781',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/alya-quartz-slab/889',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/scarlet-quartz-slab/782',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/versatile-quartz-slab/783',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mystral-grey-quartz-slab/898',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/polar-breeze-quartz-slab/899',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gloria-quartz-slab/900',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/milas-quartz-slab/901',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/alba-vela-quartz-slab/902',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/mystic-brown-quartz/975',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/astoria-quartz/976',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/linda-quartz/977',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/storm-quartz/978',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-rivera-quartz-slab/981',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/tender-quartz-slab/982',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/hidra-quartz-slab/983',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/ariston-quartz-slab/984',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/crystal-white-quartz-slab/985',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/calacatta-oro-quartz-slab/986',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-stairs/382',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-vein-cut-travertine-stairs/953',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/diana-royal-marble-stairs/958',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-dark-marble-stairs/383',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-stairs/384',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/gold-travertine-stairs/264',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-lilac-marble-stairs/955',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-travertine-stairs/956',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/noche-vein-cut-travertine-stairs/972',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bluestone-stairs/959',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/vanilla-beige-marble-stairs/960',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/turkish-lilac-marble-fireplace/962',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-fireplace/965',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-limestone-fireplace/963',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-fireplace/968',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-square-table-Top/757',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-round-table-Top/538',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/toros-black-marble-square-table-Top/759',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nero-marquina-marble-round-table-Top/758',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/nero-marquina-marble-ellipse-table-Top/539',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/emperador-beige-marble-vase/905',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-vase/904',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-balustrade/209',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/bianco-ibiza-marble-balustrade/464',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/classic-travertine-flowerpot/907',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/silver-travertine-flowerpot/906',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-fountain-oslo/837',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-drains/797',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/medallion-dahlia/884',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/medallion-magnolia/886',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/medallion-poinciana/885',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-fountain-Rome/833',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-fountain-madrid/838',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-fountain-paris/832',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-fountain-beirut/651',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-fountain-moscow/836',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-fountain-muscat/653',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-fountain-london/839',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-fountain-riyadh/649',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/baseboard-molding/203',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/baseboard-tuli/531',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/pencil-molding/204',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-dora/406',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-ogee-2/404',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-ogee-1/265',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-tilt/407',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-cup/208',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/molding-rope/207',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-tile-adhesive-1051/444',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-white-tile-adhesive-1052/445',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-technoflex-adhesive-1054/446',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-technopool-adhesive-1062/908',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-grout---2000-fuga/634',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-grout---2200-ultra-fuga/635',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-grout---2300-fuga-flex/636',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-grout---2500-ultra-fuga-flex/637',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/kalekim-grout---2900-fugapool/639',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/sealing---maxiseal-vh72/633',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/polish---maximax-vh44/700',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/cleaner---maxiclean-vht62/925',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-51/325',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-h515/789',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-51/803',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-h315/791',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-hx44/817',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-d44/790',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-p-44/829',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-cb-bb/828',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-m-22/181',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-d22/190',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-s-rp/814',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-h24/359',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-m-mp/788',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-wg-r/827',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-s-p16/848',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-rv/826',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-r/261',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cc-44/127',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cc-24/124',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mt-w-3d22/372',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mt-c-3d31/374',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tb-c-p26/743',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-y-pz15/392',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-s-pz15/410',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-c-pz26/346',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-p16/731',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-r/931',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tb-y-p26/744',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-p26/771',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-y-3d22/263',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-pz15/816',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-py-imp/434',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-44/182',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cw-s/724',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-ms-wg-p16/849',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-24/174',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-wbl-b/323',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-hx44/271',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/limestone-mosaic-lp-lb-ln/717',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-&-limestone-mosaic-dp-lbs-ln/718',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-ln/578',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-h515/716',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-h27/589',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tu-s-h315/710',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-mp/627',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-24/168',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-24/713',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-lm/623',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-lm/721',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-&-limestone-mosaic-dp-wg-lm/722',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-r/144',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-cn-515/819',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-pg-r/823',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-m3-24/139',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-hx22/714',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/limestone-mosaic-lp-w-ar/729',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-pq/622',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-24/329',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-wbl-bb/135',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-wbl-t/149',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-pq/805',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-gb-b/811',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ccb-b/807',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-hx44/620',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-pg-hx44/799',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-fs/726',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-fs/725',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cc-md/728',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-b-24/793',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-ms-w-44/159',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-44/178',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cb-lf/723',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-bl-c27/800',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-c27/896',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-c27/897',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-22/134',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ccy-t/128',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ccb-o/813',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-&-travertine-mosaic-dp-ws-hx44/624',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-w-hx44/808',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-wg-sky/727',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-m3-d44/720',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-op/628',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-mp/712',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-n-mp/830',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-cc-51/193',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-y-515/844',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-s-515/845',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-m3-22/141',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-cn-22/821',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-p-515/847',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-515/846',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-d22/175',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-m3-24/742',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-m-d22/831',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-44/327',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-44/136',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-m3-44/138',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-g-rp/326',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-24/262',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tf-c-44/544',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-c-3d22/373',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-22/166',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-51/358',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-51/189',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-rp/349',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-cn-b/177',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-44/820',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-c-52/348',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-22/188',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-h24/191',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tt-n-24/357',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-s-24/158',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-n-51/162',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-c-51/343',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tv-c-v44/338',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-ts-c-24/150',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/travertine-mosaic-tv-c-44/172',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ps-hx44/944',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ps-ln/947',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ps-c27/945',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/marble-mosaic-mp-ps-rp/946',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132607/552',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132608/553',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132609/554',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132610/555',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132611/556',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132617/559',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132619/560',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132620/561',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132621/562',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132622/563',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132623/564',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132624/565',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132627/568',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132629/569',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132644/571',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132645/572',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132647/573',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132648/574',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132649/575',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132663/576',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132664/577',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132591/894',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132606/551',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132603/548',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132605/550',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132604/549',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/detail/glass-mosaic-gl132626/567',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/brushed-&-sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/finish/bamboo',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/finish/filled',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/finish/unfilled',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/3/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/3/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/3/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/finish/matt',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/tumbled-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/paver',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/landscape',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/rock-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/column-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/finish/river-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/vessel-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/farmer-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/bathtub',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/pedestal-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/shower-tray',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/finish/countertop',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/finish/marble',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/finish/travertine',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/finish/bookmatched',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/finish/limestone',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/finish/onyx',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/stairs',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/fountain',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/molding',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/table-top',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/fireplace',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/medallion',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/vase',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/flowerpot',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/balustrade',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/finish/drain',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/finish/grouting',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/finish/tile-adhesives',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/finish/tile-cleaner',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/finish/tile-sealers',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/18/finish/fireproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/18/finish/waterproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/18/finish/standard',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/1/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/3/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/3/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/grey/2',
        modifiedAt: new Date(),
      },      {
        _path: '/fr/product/filter/category/4/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '7fr/product/filter/category/5/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/beige/4',
        modifiedAt: new Date(),
      },      {
        _path: '/product/filter/category/7/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/8/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/edge/straight/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/edge/chiseled/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/edge/tumbled/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/4/material/glass/3',
        modifiedAt: new Date(),
      },      {
        _path: '/fr/product/filter/category/4/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/7/material/onyx/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/style/cross cut/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/2/style/vein cut/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/type/paver/22',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/type/pebble/24',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/type/column/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/type/birdbath/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/5/type/crazy paver/23',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/type/sink/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/type/bathtub/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/type/shower tray/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/6/type/countertop/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/stairs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/fountain/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/molding/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/tabletop/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/fireplace/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/medallion/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/balustrade/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/flowerpot/12',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/9/type/vase/28',
        modifiedAt: new Date(),
      },      {
        _path: '/fr/product/filter/category/9/type/drain/14',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/type/grout/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/type/adhesive/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/type/sealer/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/type/cleaner/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/product/filter/category/11/type/polish/30',
        modifiedAt: new Date(),
      },

      /*ES */

      {
        _path: '/es/product/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/limestone/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/mosaics/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/outdoor/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/bath-and-kitchen/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/slabs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/quartz/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/by-product/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/installation-materials/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/living-room/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/kitchen/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/bathroom/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/landscape/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/garage/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/pool/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/facede/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/wall/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/area/floor/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/al-greishi-villa-project/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/alawadhi-project/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/adams-project/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/kaddour-project/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/golyan-project/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/beauchamp-project/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/vallinis-project/19',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/jackson-project/20',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/al-sabouni-project/21',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/bader-project/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/mbı-project/26',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/johnson-project/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/littoral-project/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/besse-project/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/nader-project/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/kirry-project/31',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/homayoun-project/32',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/mansour-project/1032',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/hotel-verdi-project/1033',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/khajavi-project/1034',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/andersen-project/1035',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/eislend-project/1036',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/mtt-project/1037',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/hoga-project/1041',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/wall-project/1042',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/al-mahruqi-project/1044',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/san-project/1045',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/crb-project/1046',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/lily-project/1047',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/dgcell-project/1048',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/braun-project/1049',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/tmrp-project/1050',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/randolph-project/1052',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/duo-project/1053',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/gebing-project/1054',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/project/detail/durham-project/1055',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-light-marble/451',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/blanco-ivory-marble/274',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-lilac-marble/395',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cloudy-grey-marble/941',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/imperial-carrara-marble/979',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/palisandro-marble/942',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble/229',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/alaska-grey-marble/954',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/diana-royal-marble-/437',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-giallo-marble/687',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nero-marquina-marble-/483',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/crema-marfil-marble/477',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/solaris-blue-marble/681',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/dolomite-white-marble/540',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-grey-marble/244',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/lucid-grey-marble/940',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ocean-grey-marble/585',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-tumbled/750',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/storm-grey-marble/619',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/armani-brown-marble/957',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-calacatta-marble/686',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-gold-marble/685',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-natural/749',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/salome-marble/785',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/puffin-grey-marble/545',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/sofita-beige-marble/292',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/savannah-grey-marble/761',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/oasis-grey-marble/688',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/asgrey-marble/684',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-sandblasted-/746',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cappuccino-light-marble/230',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-dark-marble/218',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mende-white-line-marble/754',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/siena-gold-marble-/672',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/carrara-white-marble/475',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-tiger-marble/217',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/coffee-royal-marble/476',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-antique-marble/786',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/burdur-beige-marble/389',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-blue-marble/242',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone/537',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ottoman-beige-marble/312',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/latte-cream-marble-/435',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-beige-marble/275',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pasha-white-marble/696',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/toros-black-marble/279',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/equator-white-marble/396',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/botticino-cream-marble-antique/336',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-antique/647',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/basalt/579',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-light-marble/487',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/royal-beige-marble/237',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/afyon-sugar-marble/420',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/adranos-white-marble/288',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-alicante-marble/486',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-sandblasted-marble/401',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cappuccino-medium-marble/241',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-bamboo/748',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-levanto-marble/536',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pietra-grey-marble/485',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/leonardo-vein-cut-travertine/879',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-vein-cut-travertine/201',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-travertine-honed/41',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/walnut-vein-cut-travertine/39',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-vein-cut-travertine/46',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/yellow-vein-cut-travertine/390',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-travertine-natural/547',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-travertine-polished/546',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mina-rustic-vein-cut-travertine/973',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/leonardo-cross-cut-travertine/891',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine/33',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/valencia-travertine/948',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-grey-travertine/43',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/yellow-gold-travertine/34',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-travertine/37',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-travertine-pattern-set/801',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/red-travertine/40',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/walnut-travertine/45',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-rustic-travertine/416',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-natural-pattern-set-travertine/42',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-pattern-set-travertine/49',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/scabos-pattern-set-travertine/236',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-grey-pattern-set-travertine/120',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gold-travertine-pattern-set/119',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/volcano-pattern-set-travertine/48',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/walnut-pattern-set-travertine/698',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ivory-rustic-pattern-set-travertine/588',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tuscany-mix-pattern-set-travertine/760',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mina-rustic-pattern-set-travertine/206',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/scott-rustic-pattern-set-travertine/210',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/storm-noche-pattern-set-travertine/693',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-pillowed-pattern-set/381',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/yellow-antique-travertine/391',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-antique-travertine/122',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nesco-antique-travertine/587',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/licom-antique-travertine/480',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-grey-antique-travertine/270',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-antique-travertine/202',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-splitface-travertine/484',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-splitface-travertine/213',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rustic-splitface-travertine/212',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-mocha-cream-limestone/949',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-limestone/332',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/perla-limestone/787',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/jerusalem-limestone-/333',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/seagrass-limestone/337',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-paver/415',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-grey-travertine-paver/317',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-sandblasted-paver/964',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-travertine-paver/200',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gold-travertine-paver/199',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-grey-marble-paver/971',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/licom-travertine-paver/966',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-natural-paver/969',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-tumbled-paver/970',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/walnut-travertine-paver/100',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-light-marble-paver/535',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shellstone-limestone-paver/980',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/grey-crazy-paver/951',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/beige-crazy-paver/952',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/white-crazy-paver/854',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/black-angel-pebble/498',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/snow-flakes-pebble/499',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/dolomite-pebble/490',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nyx-pebble/500',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/green-angel-pebble/501',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rainbow-pebble/502',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/granite-pebble/503',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-laguna-pebble/504',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tiger-gneiss-pebble/505',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/lilac-pebble/506',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/egean-brown-pebble/507',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/angel-sparks-pebble/508',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/basalt-pebble/509',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/river-green-pebble/512',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/river-gravels/520',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/yellow-slate/495',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/black-angel-flagstone/853',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/river-rock-stone/519',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/meteora-rock-stone/494',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pipeline-rock-stone/496',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/spaghetti-rock-stone/493',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nyx-natural-birdbath/856',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/lilac-natural-birdbath/857',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rainbow-natural-birdbath/858',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/white-natural-birdbath/859',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/black-angel-birdbath/860',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/angel-sparks-birdbath/862',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/black-angel-column/521',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-laguna-column/522',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/lilac-column/523',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/white-column/524',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nyx-column/525',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-101/659',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-107/665',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-114/756',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-115/802',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-3/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-10/60',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-6/53',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-105/663',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-38/76',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-2/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-1/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-103/661',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-106/664',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-109/667',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-102/660',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-110/668',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-113/751',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-37/75',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-112/695',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-104/662',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-7/54',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-5/52',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-8/55',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-34/72',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-21/63',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-11/58',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-22/64',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-9/56',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-24/66',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-23/65',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-26/883',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-14/61',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-28/69',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vessel-sink-model-36/74',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-44/80',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-40/903',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-46/81',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-53/78',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-49/82',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-50/83',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-42/77',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/farmer-sink-model-56/936',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-101/920',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-102/921',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-62/85',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-66/86',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-70/87',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-63/84',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/shower-tray-model-64/890',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-countertop/398',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-countertop/400',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/beige-marble-mountertop/399',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-marble-countertop/397',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-56/88',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-57/89',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-101/932',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-102/933',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-103/934',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-104/935',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-105/937',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bathtub-model-106/974',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-Slab/109',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-travertine-slab/102',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-slab/101',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-limestone-slab/462',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/royal-beige-marble-slab/379',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-lilac-marble-slab/365',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/black-eagle-white-marble-slab/581',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/baiyulan-beige-marble-slab/586',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/puffin-grey-vein-cut-marble-Slab/590',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/puffin-grey-marble-slabs/592',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ocean-grey-marble-slab/596',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-slab/646',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-light-marble-slab/674',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/blue-river-marble-slab/915',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/latte-cream-marble-slab/675',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/crema-marfil-marble-slab/694',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pasha-white-marble-slab/631',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-giallo-marble-slab/939',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/savannah-grey-marble-slab/583',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/afyon-sugar-marble-slab/597',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/astan-grey-marble-slab/914',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/equator-white-marble-slab/403',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/storm-grey-marble-slab/676',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/lilac-dark-marble-slab/917',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/sugar-violet-marble-slab/840',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/verde-guatemala-marble-slab/938',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pasha-vita-marble-slab/632',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-light-marble-slab/460',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/blanco-ivory-marble-slab/375',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/persian-silver-travertine-slab/580',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/platinum-white-marble-slabs/591',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-alicante-marble-slab/679',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/oasis-river-marble-slab/673',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/toros-black-marble-slab/593',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/massa-blanca-marble-slab/680',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-dark-marble-slab/248',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/coffee-royal-marble-slab/533',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-vein-cut-travertine-slab/394',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/solaris-blue-marble-slab/682',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/asgrey-marble-slab/683',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/burdur-beige-marble-slab/691',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gold-travertine-slab/762',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/diana-royal-marble-slab/532',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-grey-travertine-slab/266',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/red-travertine-slab/107',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-grey-marble-slab/454',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cappuccino-light-marble-slab/692',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cappucino-medium-marble-slab/376',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mende-white-marble-slab/699',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-travertine-slab/252',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/imperial-brown-marble-slab/584',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/olive-maroon-marble-slab/629',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/sofita-beige-marble-slab/465',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ottoman-beige-marble-slab/238',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-calacatta-marble-slab/442',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-gold-marble-slab/670',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nero-marquina-marble-slabs/594',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/olive-brown-marble-slab/763',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pietra-grey-marble-slab/648',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/dolomite-white-marble-slab/463',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/salome-marble-slab/655',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/rosso-levanto-marble-Slab/443',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/adranos-white-marble-slab/377',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/perla-limestone-slab/755',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/fantasy-white-marble-slab/794',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/carrara-white-marble-slab/419',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-beige-marble-slab/795',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/jerusalem-limestone-slab/455',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/leonardo-vein-cut-travertine-slab/796',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/siena-gold-marble-slab/671',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-resin-travertine-slab/106',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/onyx-cross-cut-slab/656',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/onyx-honey-comb-slab/657',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/onyx-vein-cut-slab/658',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tundra-blue-marble-slab/254',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-venato-marble-slab/110',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-vein-cut-travertine-slab/479',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/yellow-vein-cut-travertine-slab/269',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/golden-river-marble-slab/439',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/palisandro-marble-slab/943',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-moca-cream-limestone-slab/950',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/elsa-quartz-slab/701',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/galaxy-quartz-slab/702',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gereme-quartz-slab/703',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/efesus-quartz-slab/704',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/karia-quartz-slab/705',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/magnolia-quartz-slab/706',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/truva-grey-quartz-slab/707',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/venato-quartz-slab/708',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/irlana-quartz-slab/709',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/helene-quartz-slab/851',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/artistic-black-quartz-slab/764',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-erin-quartz-slab/765',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-lea-quartz-slab/766',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-sue-quartz-slab/767',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-vela-quartz-slab/768',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-mina-quartz-slab/910',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/fantasy-quartz-slab/772',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ice-white-quartz-slab/773',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/idea-quartz-slab/774',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/magnet-quartz-slab/776',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/naris-quartz-slab/777',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/night-quartz-slab/778',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kafkas-quartz-slab/909',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/peak-quartz-slab/779',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/regnis-quartz-slab/780',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/riyana-quartz-slab/781',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/alya-quartz-slab/889',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/scarlet-quartz-slab/782',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/versatile-quartz-slab/783',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mystral-grey-quartz-slab/898',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/polar-breeze-quartz-slab/899',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gloria-quartz-slab/900',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/milas-quartz-slab/901',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/alba-vela-quartz-slab/902',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/mystic-brown-quartz/975',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/astoria-quartz/976',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/linda-quartz/977',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/storm-quartz/978',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-rivera-quartz-slab/981',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/tender-quartz-slab/982',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/hidra-quartz-slab/983',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/ariston-quartz-slab/984',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/crystal-white-quartz-slab/985',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/calacatta-oro-quartz-slab/986',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-stairs/382',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-vein-cut-travertine-stairs/953',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/diana-royal-marble-stairs/958',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-dark-marble-stairs/383',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-stairs/384',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/gold-travertine-stairs/264',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-lilac-marble-stairs/955',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-travertine-stairs/956',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/noche-vein-cut-travertine-stairs/972',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bluestone-stairs/959',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/vanilla-beige-marble-stairs/960',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/turkish-lilac-marble-fireplace/962',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-fireplace/965',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-limestone-fireplace/963',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-fireplace/968',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-square-table-Top/757',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-round-table-Top/538',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/toros-black-marble-square-table-Top/759',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nero-marquina-marble-round-table-Top/758',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/nero-marquina-marble-ellipse-table-Top/539',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/emperador-beige-marble-vase/905',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-vase/904',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-balustrade/209',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/bianco-ibiza-marble-balustrade/464',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/classic-travertine-flowerpot/907',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/silver-travertine-flowerpot/906',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-fountain-oslo/837',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-drains/797',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/medallion-dahlia/884',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/medallion-magnolia/886',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/medallion-poinciana/885',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-fountain-Rome/833',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-fountain-madrid/838',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-fountain-paris/832',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-fountain-beirut/651',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-fountain-moscow/836',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-fountain-muscat/653',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-fountain-london/839',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-fountain-riyadh/649',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/baseboard-molding/203',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/baseboard-tuli/531',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/pencil-molding/204',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-dora/406',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-ogee-2/404',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-ogee-1/265',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-tilt/407',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-cup/208',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/molding-rope/207',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-tile-adhesive-1051/444',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-white-tile-adhesive-1052/445',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-technoflex-adhesive-1054/446',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-technopool-adhesive-1062/908',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-grout---2000-fuga/634',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-grout---2200-ultra-fuga/635',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-grout---2300-fuga-flex/636',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-grout---2500-ultra-fuga-flex/637',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/kalekim-grout---2900-fugapool/639',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/sealing---maxiseal-vh72/633',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/polish---maximax-vh44/700',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/cleaner---maxiclean-vht62/925',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-51/325',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-h515/789',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-51/803',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-h315/791',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-hx44/817',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-d44/790',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-p-44/829',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-cb-bb/828',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-m-22/181',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-d22/190',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-s-rp/814',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-h24/359',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-m-mp/788',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-wg-r/827',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-s-p16/848',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-rv/826',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-r/261',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cc-44/127',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cc-24/124',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mt-w-3d22/372',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mt-c-3d31/374',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tb-c-p26/743',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-y-pz15/392',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-s-pz15/410',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-c-pz26/346',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-p16/731',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-r/931',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tb-y-p26/744',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-p26/771',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-y-3d22/263',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-pz15/816',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-py-imp/434',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-44/182',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cw-s/724',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-ms-wg-p16/849',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-24/174',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-wbl-b/323',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-hx44/271',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/limestone-mosaic-lp-lb-ln/717',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-&-limestone-mosaic-dp-lbs-ln/718',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-ln/578',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-h515/716',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-h27/589',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tu-s-h315/710',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-mp/627',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-24/168',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-24/713',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-lm/623',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-lm/721',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-&-limestone-mosaic-dp-wg-lm/722',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-r/144',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-cn-515/819',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-pg-r/823',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-m3-24/139',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-hx22/714',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/limestone-mosaic-lp-w-ar/729',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-pq/622',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-24/329',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-wbl-bb/135',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-wbl-t/149',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-pq/805',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-gb-b/811',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ccb-b/807',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-hx44/620',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-pg-hx44/799',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-fs/726',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-fs/725',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cc-md/728',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-b-24/793',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-ms-w-44/159',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-44/178',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cb-lf/723',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-bl-c27/800',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-c27/896',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-c27/897',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-22/134',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ccy-t/128',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ccb-o/813',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-&-travertine-mosaic-dp-ws-hx44/624',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-w-hx44/808',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-wg-sky/727',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-m3-d44/720',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-op/628',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-mp/712',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-n-mp/830',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-cc-51/193',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-y-515/844',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-s-515/845',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-m3-22/141',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-cn-22/821',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-p-515/847',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-515/846',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-d22/175',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-m3-24/742',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-m-d22/831',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-44/327',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-44/136',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-m3-44/138',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-g-rp/326',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-24/262',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tf-c-44/544',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-c-3d22/373',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-22/166',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-51/358',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-51/189',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-rp/349',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-cn-b/177',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-44/820',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-c-52/348',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-22/188',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-h24/191',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tt-n-24/357',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-s-24/158',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-n-51/162',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-c-51/343',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tv-c-v44/338',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-ts-c-24/150',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/travertine-mosaic-tv-c-44/172',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ps-hx44/944',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ps-ln/947',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ps-c27/945',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/marble-mosaic-mp-ps-rp/946',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132607/552',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132608/553',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132609/554',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132610/555',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132611/556',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132617/559',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132619/560',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132620/561',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132621/562',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132622/563',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132623/564',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132624/565',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132627/568',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132629/569',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132644/571',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132645/572',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132647/573',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132648/574',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132649/575',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132663/576',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132664/577',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132591/894',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132606/551',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132603/548',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132605/550',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132604/549',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/detail/glass-mosaic-gl132626/567',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/brushed-&-sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/finish/bamboo',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/finish/filled',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/finish/unfilled',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/3/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/3/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/3/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/finish/matt',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/tumbled-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/paver',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/landscape',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/rock-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/column-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/finish/river-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/vessel-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/farmer-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/bathtub',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/pedestal-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/shower-tray',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/finish/countertop',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/finish/marble',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/finish/travertine',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/finish/bookmatched',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/finish/limestone',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/finish/onyx',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/stairs',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/fountain',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/molding',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/table-top',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/fireplace',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/medallion',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/vase',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/flowerpot',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/balustrade',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/finish/drain',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/finish/grouting',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/finish/tile-adhesives',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/finish/tile-cleaner',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/finish/tile-sealers',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/18/finish/fireproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/18/finish/waterproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/18/finish/standard',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/1/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/3/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/3/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/grey/2',
        modifiedAt: new Date(),
      },      {
        _path: '/es/product/filter/category/4/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/beige/4',
        modifiedAt: new Date(),
      },      {
        _path: '/es/product/filter/category/7/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/8/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/edge/straight/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/edge/chiseled/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/edge/tumbled/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/4/material/glass/3',
        modifiedAt: new Date(),
      },      {
        _path: '/es/product/filter/category/4/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/7/material/onyx/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/style/cross cut/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/2/style/vein cut/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/type/paver/22',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/type/pebble/24',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/type/column/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/type/birdbath/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/5/type/crazy paver/23',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/type/sink/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/type/bathtub/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/type/shower tray/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/6/type/countertop/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/stairs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/fountain/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/molding/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/tabletop/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/fireplace/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/medallion/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/balustrade/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/flowerpot/12',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/9/type/vase/28',
        modifiedAt: new Date(),
      },      {
        _path: '/es/product/filter/category/9/type/drain/14',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/type/grout/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/type/adhesive/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/type/sealer/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/type/cleaner/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/product/filter/category/11/type/polish/30',
        modifiedAt: new Date(),
      },

      /*Ru */


      {
        _path: '/ru/product/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/limestone/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/mosaics/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/outdoor/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/bath-and-kitchen/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/slabs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/quartz/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/by-product/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/installation-materials/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/living-room/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/kitchen/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/bathroom/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/landscape/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/garage/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/pool/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/facede/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/wall/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/area/floor/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/al-greishi-villa-project/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/alawadhi-project/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/adams-project/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/kaddour-project/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/golyan-project/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/beauchamp-project/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/vallinis-project/19',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/jackson-project/20',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/al-sabouni-project/21',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/bader-project/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/mbı-project/26',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/johnson-project/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/littoral-project/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/besse-project/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/nader-project/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/kirry-project/31',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/homayoun-project/32',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/mansour-project/1032',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/hotel-verdi-project/1033',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/khajavi-project/1034',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/andersen-project/1035',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/eislend-project/1036',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/mtt-project/1037',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/hoga-project/1041',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/wall-project/1042',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/al-mahruqi-project/1044',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/san-project/1045',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/crb-project/1046',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/lily-project/1047',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/dgcell-project/1048',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/braun-project/1049',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/tmrp-project/1050',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/randolph-project/1052',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/duo-project/1053',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/gebing-project/1054',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/project/detail/durham-project/1055',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-light-marble/451',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/blanco-ivory-marble/274',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-lilac-marble/395',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cloudy-grey-marble/941',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/imperial-carrara-marble/979',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/palisandro-marble/942',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble/229',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/alaska-grey-marble/954',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/diana-royal-marble-/437',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-giallo-marble/687',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nero-marquina-marble-/483',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/crema-marfil-marble/477',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/solaris-blue-marble/681',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/dolomite-white-marble/540',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-grey-marble/244',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/lucid-grey-marble/940',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ocean-grey-marble/585',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-tumbled/750',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/storm-grey-marble/619',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/armani-brown-marble/957',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-calacatta-marble/686',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-gold-marble/685',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-natural/749',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/salome-marble/785',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/puffin-grey-marble/545',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/sofita-beige-marble/292',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/savannah-grey-marble/761',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/oasis-grey-marble/688',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/asgrey-marble/684',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-sandblasted-/746',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cappuccino-light-marble/230',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-dark-marble/218',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mende-white-line-marble/754',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/siena-gold-marble-/672',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/carrara-white-marble/475',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-tiger-marble/217',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/coffee-royal-marble/476',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-antique-marble/786',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/burdur-beige-marble/389',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-blue-marble/242',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone/537',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ottoman-beige-marble/312',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/latte-cream-marble-/435',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-beige-marble/275',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pasha-white-marble/696',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/toros-black-marble/279',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/equator-white-marble/396',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/botticino-cream-marble-antique/336',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-antique/647',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/basalt/579',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-light-marble/487',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/royal-beige-marble/237',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/afyon-sugar-marble/420',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/adranos-white-marble/288',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-alicante-marble/486',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-sandblasted-marble/401',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cappuccino-medium-marble/241',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-bamboo/748',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-levanto-marble/536',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pietra-grey-marble/485',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/leonardo-vein-cut-travertine/879',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-vein-cut-travertine/201',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-travertine-honed/41',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/walnut-vein-cut-travertine/39',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-vein-cut-travertine/46',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/yellow-vein-cut-travertine/390',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-travertine-natural/547',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-travertine-polished/546',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mina-rustic-vein-cut-travertine/973',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/leonardo-cross-cut-travertine/891',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine/33',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/valencia-travertine/948',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-grey-travertine/43',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/yellow-gold-travertine/34',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-travertine/37',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-travertine-pattern-set/801',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/red-travertine/40',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/walnut-travertine/45',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-rustic-travertine/416',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-natural-pattern-set-travertine/42',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-pattern-set-travertine/49',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/scabos-pattern-set-travertine/236',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-grey-pattern-set-travertine/120',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gold-travertine-pattern-set/119',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/volcano-pattern-set-travertine/48',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/walnut-pattern-set-travertine/698',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ivory-rustic-pattern-set-travertine/588',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tuscany-mix-pattern-set-travertine/760',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mina-rustic-pattern-set-travertine/206',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/scott-rustic-pattern-set-travertine/210',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/storm-noche-pattern-set-travertine/693',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-pillowed-pattern-set/381',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/yellow-antique-travertine/391',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-antique-travertine/122',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nesco-antique-travertine/587',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/licom-antique-travertine/480',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-grey-antique-travertine/270',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-antique-travertine/202',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-splitface-travertine/484',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-splitface-travertine/213',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rustic-splitface-travertine/212',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-mocha-cream-limestone/949',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-limestone/332',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/perla-limestone/787',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/jerusalem-limestone-/333',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/seagrass-limestone/337',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-paver/415',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-grey-travertine-paver/317',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-sandblasted-paver/964',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-travertine-paver/200',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gold-travertine-paver/199',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-grey-marble-paver/971',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/licom-travertine-paver/966',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-natural-paver/969',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-tumbled-paver/970',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/walnut-travertine-paver/100',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-light-marble-paver/535',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shellstone-limestone-paver/980',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/grey-crazy-paver/951',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/beige-crazy-paver/952',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/white-crazy-paver/854',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/black-angel-pebble/498',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/snow-flakes-pebble/499',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/dolomite-pebble/490',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nyx-pebble/500',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/green-angel-pebble/501',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rainbow-pebble/502',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/granite-pebble/503',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-laguna-pebble/504',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tiger-gneiss-pebble/505',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/lilac-pebble/506',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/egean-brown-pebble/507',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/angel-sparks-pebble/508',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/basalt-pebble/509',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/river-green-pebble/512',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/river-gravels/520',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/yellow-slate/495',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/black-angel-flagstone/853',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/river-rock-stone/519',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/meteora-rock-stone/494',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pipeline-rock-stone/496',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/spaghetti-rock-stone/493',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nyx-natural-birdbath/856',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/lilac-natural-birdbath/857',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rainbow-natural-birdbath/858',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/white-natural-birdbath/859',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/black-angel-birdbath/860',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/angel-sparks-birdbath/862',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/black-angel-column/521',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-laguna-column/522',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/lilac-column/523',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/white-column/524',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nyx-column/525',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-101/659',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-107/665',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-114/756',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-115/802',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-3/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-10/60',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-6/53',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-105/663',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-38/76',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-2/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-1/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-103/661',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-106/664',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-109/667',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-102/660',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-110/668',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-113/751',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-37/75',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-112/695',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-104/662',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-7/54',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-5/52',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-8/55',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-34/72',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-21/63',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-11/58',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-22/64',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-9/56',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-24/66',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-23/65',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-26/883',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-14/61',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-28/69',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vessel-sink-model-36/74',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-44/80',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-40/903',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-46/81',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-53/78',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-49/82',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-50/83',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-42/77',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/farmer-sink-model-56/936',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-101/920',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-102/921',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-62/85',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-66/86',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-70/87',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-63/84',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/shower-tray-model-64/890',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-countertop/398',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-countertop/400',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/beige-marble-mountertop/399',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-marble-countertop/397',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-56/88',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-57/89',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-101/932',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-102/933',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-103/934',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-104/935',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-105/937',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bathtub-model-106/974',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-Slab/109',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-travertine-slab/102',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-slab/101',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-limestone-slab/462',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/royal-beige-marble-slab/379',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-lilac-marble-slab/365',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/black-eagle-white-marble-slab/581',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/baiyulan-beige-marble-slab/586',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/puffin-grey-vein-cut-marble-Slab/590',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/puffin-grey-marble-slabs/592',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ocean-grey-marble-slab/596',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-slab/646',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-light-marble-slab/674',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/blue-river-marble-slab/915',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/latte-cream-marble-slab/675',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/crema-marfil-marble-slab/694',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pasha-white-marble-slab/631',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-giallo-marble-slab/939',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/savannah-grey-marble-slab/583',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/afyon-sugar-marble-slab/597',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/astan-grey-marble-slab/914',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/equator-white-marble-slab/403',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/storm-grey-marble-slab/676',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/lilac-dark-marble-slab/917',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/sugar-violet-marble-slab/840',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/verde-guatemala-marble-slab/938',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pasha-vita-marble-slab/632',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-light-marble-slab/460',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/blanco-ivory-marble-slab/375',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/persian-silver-travertine-slab/580',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/platinum-white-marble-slabs/591',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-alicante-marble-slab/679',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/oasis-river-marble-slab/673',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/toros-black-marble-slab/593',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/massa-blanca-marble-slab/680',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-dark-marble-slab/248',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/coffee-royal-marble-slab/533',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-vein-cut-travertine-slab/394',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/solaris-blue-marble-slab/682',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/asgrey-marble-slab/683',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/burdur-beige-marble-slab/691',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gold-travertine-slab/762',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/diana-royal-marble-slab/532',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-grey-travertine-slab/266',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/red-travertine-slab/107',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-grey-marble-slab/454',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cappuccino-light-marble-slab/692',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cappucino-medium-marble-slab/376',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mende-white-marble-slab/699',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-travertine-slab/252',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/imperial-brown-marble-slab/584',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/olive-maroon-marble-slab/629',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/sofita-beige-marble-slab/465',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ottoman-beige-marble-slab/238',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-calacatta-marble-slab/442',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-gold-marble-slab/670',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nero-marquina-marble-slabs/594',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/olive-brown-marble-slab/763',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pietra-grey-marble-slab/648',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/dolomite-white-marble-slab/463',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/salome-marble-slab/655',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/rosso-levanto-marble-Slab/443',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/adranos-white-marble-slab/377',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/perla-limestone-slab/755',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/fantasy-white-marble-slab/794',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/carrara-white-marble-slab/419',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-beige-marble-slab/795',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/jerusalem-limestone-slab/455',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/leonardo-vein-cut-travertine-slab/796',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/siena-gold-marble-slab/671',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-resin-travertine-slab/106',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/onyx-cross-cut-slab/656',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/onyx-honey-comb-slab/657',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/onyx-vein-cut-slab/658',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tundra-blue-marble-slab/254',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-venato-marble-slab/110',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-vein-cut-travertine-slab/479',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/yellow-vein-cut-travertine-slab/269',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/golden-river-marble-slab/439',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/palisandro-marble-slab/943',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-moca-cream-limestone-slab/950',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/elsa-quartz-slab/701',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/galaxy-quartz-slab/702',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gereme-quartz-slab/703',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/efesus-quartz-slab/704',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/karia-quartz-slab/705',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/magnolia-quartz-slab/706',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/truva-grey-quartz-slab/707',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/venato-quartz-slab/708',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/irlana-quartz-slab/709',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/helene-quartz-slab/851',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/artistic-black-quartz-slab/764',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-erin-quartz-slab/765',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-lea-quartz-slab/766',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-sue-quartz-slab/767',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-vela-quartz-slab/768',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-mina-quartz-slab/910',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/fantasy-quartz-slab/772',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ice-white-quartz-slab/773',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/idea-quartz-slab/774',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/magnet-quartz-slab/776',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/naris-quartz-slab/777',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/night-quartz-slab/778',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kafkas-quartz-slab/909',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/peak-quartz-slab/779',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/regnis-quartz-slab/780',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/riyana-quartz-slab/781',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/alya-quartz-slab/889',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/scarlet-quartz-slab/782',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/versatile-quartz-slab/783',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mystral-grey-quartz-slab/898',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/polar-breeze-quartz-slab/899',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gloria-quartz-slab/900',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/milas-quartz-slab/901',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/alba-vela-quartz-slab/902',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/mystic-brown-quartz/975',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/astoria-quartz/976',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/linda-quartz/977',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/storm-quartz/978',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-rivera-quartz-slab/981',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/tender-quartz-slab/982',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/hidra-quartz-slab/983',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/ariston-quartz-slab/984',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/crystal-white-quartz-slab/985',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/calacatta-oro-quartz-slab/986',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-stairs/382',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-vein-cut-travertine-stairs/953',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/diana-royal-marble-stairs/958',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-dark-marble-stairs/383',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-stairs/384',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/gold-travertine-stairs/264',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-lilac-marble-stairs/955',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-travertine-stairs/956',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/noche-vein-cut-travertine-stairs/972',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bluestone-stairs/959',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/vanilla-beige-marble-stairs/960',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/turkish-lilac-marble-fireplace/962',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-fireplace/965',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-limestone-fireplace/963',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-fireplace/968',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-square-table-Top/757',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-round-table-Top/538',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/toros-black-marble-square-table-Top/759',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nero-marquina-marble-round-table-Top/758',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/nero-marquina-marble-ellipse-table-Top/539',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/emperador-beige-marble-vase/905',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-vase/904',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-balustrade/209',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/bianco-ibiza-marble-balustrade/464',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/classic-travertine-flowerpot/907',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/silver-travertine-flowerpot/906',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-fountain-oslo/837',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-drains/797',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/medallion-dahlia/884',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/medallion-magnolia/886',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/medallion-poinciana/885',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-fountain-Rome/833',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-fountain-madrid/838',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-fountain-paris/832',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-fountain-beirut/651',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-fountain-moscow/836',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-fountain-muscat/653',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-fountain-london/839',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-fountain-riyadh/649',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/baseboard-molding/203',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/baseboard-tuli/531',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/pencil-molding/204',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-dora/406',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-ogee-2/404',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-ogee-1/265',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-tilt/407',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-cup/208',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/molding-rope/207',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-tile-adhesive-1051/444',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-white-tile-adhesive-1052/445',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-technoflex-adhesive-1054/446',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-technopool-adhesive-1062/908',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-grout---2000-fuga/634',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-grout---2200-ultra-fuga/635',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-grout---2300-fuga-flex/636',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-grout---2500-ultra-fuga-flex/637',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/kalekim-grout---2900-fugapool/639',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/sealing---maxiseal-vh72/633',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/polish---maximax-vh44/700',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/cleaner---maxiclean-vht62/925',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-51/325',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-h515/789',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-51/803',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-h315/791',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-hx44/817',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-d44/790',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-p-44/829',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-cb-bb/828',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-m-22/181',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-d22/190',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-s-rp/814',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-h24/359',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-m-mp/788',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-wg-r/827',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-s-p16/848',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-rv/826',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-r/261',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cc-44/127',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cc-24/124',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mt-w-3d22/372',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mt-c-3d31/374',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tb-c-p26/743',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-y-pz15/392',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-s-pz15/410',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-c-pz26/346',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-p16/731',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-r/931',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tb-y-p26/744',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-p26/771',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-y-3d22/263',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-pz15/816',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-py-imp/434',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-44/182',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cw-s/724',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-ms-wg-p16/849',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-24/174',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-wbl-b/323',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-hx44/271',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/limestone-mosaic-lp-lb-ln/717',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-&-limestone-mosaic-dp-lbs-ln/718',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-ln/578',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-h515/716',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-h27/589',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tu-s-h315/710',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-mp/627',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-24/168',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-24/713',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-lm/623',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-lm/721',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-&-limestone-mosaic-dp-wg-lm/722',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-r/144',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-cn-515/819',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-pg-r/823',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-m3-24/139',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-hx22/714',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/limestone-mosaic-lp-w-ar/729',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-pq/622',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-24/329',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-wbl-bb/135',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-wbl-t/149',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-pq/805',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-gb-b/811',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ccb-b/807',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-hx44/620',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-pg-hx44/799',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-fs/726',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-fs/725',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cc-md/728',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-b-24/793',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-ms-w-44/159',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-44/178',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cb-lf/723',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-bl-c27/800',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-c27/896',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-c27/897',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-22/134',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ccy-t/128',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ccb-o/813',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-&-travertine-mosaic-dp-ws-hx44/624',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-w-hx44/808',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-wg-sky/727',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-m3-d44/720',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-op/628',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-mp/712',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-n-mp/830',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-cc-51/193',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-y-515/844',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-s-515/845',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-m3-22/141',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-cn-22/821',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-p-515/847',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-515/846',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-d22/175',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-m3-24/742',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-m-d22/831',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-44/327',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-44/136',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-m3-44/138',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-g-rp/326',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-24/262',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tf-c-44/544',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-c-3d22/373',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-22/166',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-51/358',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-51/189',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-rp/349',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-cn-b/177',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-44/820',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-c-52/348',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-22/188',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-h24/191',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tt-n-24/357',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-s-24/158',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-n-51/162',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-c-51/343',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tv-c-v44/338',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-ts-c-24/150',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/travertine-mosaic-tv-c-44/172',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ps-hx44/944',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ps-ln/947',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ps-c27/945',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/marble-mosaic-mp-ps-rp/946',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132607/552',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132608/553',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132609/554',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132610/555',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132611/556',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132617/559',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132619/560',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132620/561',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132621/562',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132622/563',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132623/564',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132624/565',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132627/568',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132629/569',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132644/571',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132645/572',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132647/573',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132648/574',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132649/575',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132663/576',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132664/577',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132591/894',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132606/551',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132603/548',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132605/550',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132604/549',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/detail/glass-mosaic-gl132626/567',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/brushed-&-sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/finish/bamboo',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/finish/filled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/finish/unfilled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/3/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/3/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/3/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/finish/matt',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/tumbled-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/paver',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/landscape',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/rock-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/column-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/finish/river-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/vessel-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/farmer-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/bathtub',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/pedestal-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/shower-tray',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/finish/countertop',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/finish/marble',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/finish/travertine',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/finish/bookmatched',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/finish/limestone',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/finish/onyx',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/stairs',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/fountain',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/molding',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/table-top',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/fireplace',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/medallion',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/vase',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/flowerpot',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/balustrade',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/finish/drain',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/finish/grouting',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/finish/tile-adhesives',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/finish/tile-cleaner',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/finish/tile-sealers',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/18/finish/fireproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/18/finish/waterproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/18/finish/standard',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/1/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/3/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/3/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/grey/2',
        modifiedAt: new Date(),
      },      {
        _path: '/ru/product/filter/category/4/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/beige/4',
        modifiedAt: new Date(),
      },      {
        _path: '/ru/product/filter/category/7/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/8/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/edge/straight/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/edge/chiseled/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/edge/tumbled/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/4/material/glass/3',
        modifiedAt: new Date(),
      },      {
        _path: '/ru/product/filter/category/4/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/7/material/onyx/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/style/cross cut/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/2/style/vein cut/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/type/paver/22',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/type/pebble/24',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/type/column/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/type/birdbath/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/5/type/crazy paver/23',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/type/sink/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/type/bathtub/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/type/shower tray/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/6/type/countertop/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/stairs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/fountain/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/molding/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/tabletop/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/fireplace/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/medallion/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/balustrade/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/flowerpot/12',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/9/type/vase/28',
        modifiedAt: new Date(),
      },      {
        _path: '/ru/product/filter/category/9/type/drain/14',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/type/grout/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/type/adhesive/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/type/sealer/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/type/cleaner/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/product/filter/category/11/type/polish/30',
        modifiedAt: new Date(),
      },
      
      /*Ar */


      

      {
        _path: '/ar/product/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/limestone/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/mosaics/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/outdoor/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/bath-and-kitchen/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/slabs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/quartz/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/by-product/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/installation-materials/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/living-room/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/kitchen/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/bathroom/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/landscape/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/garage/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/pool/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/facede/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/wall/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/area/floor/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/al-greishi-villa-project/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/alawadhi-project/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/adams-project/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/kaddour-project/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/golyan-project/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/beauchamp-project/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/vallinis-project/19',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/jackson-project/20',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/al-sabouni-project/21',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/bader-project/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/mbı-project/26',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/johnson-project/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/littoral-project/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/besse-project/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/nader-project/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/kirry-project/31',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/homayoun-project/32',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/mansour-project/1032',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/hotel-verdi-project/1033',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/khajavi-project/1034',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/andersen-project/1035',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/eislend-project/1036',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/mtt-project/1037',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/hoga-project/1041',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/wall-project/1042',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/al-mahruqi-project/1044',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/san-project/1045',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/crb-project/1046',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/lily-project/1047',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/dgcell-project/1048',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/braun-project/1049',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/tmrp-project/1050',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/randolph-project/1052',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/duo-project/1053',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/gebing-project/1054',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/project/detail/durham-project/1055',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-light-marble/451',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/blanco-ivory-marble/274',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-lilac-marble/395',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cloudy-grey-marble/941',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/imperial-carrara-marble/979',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/palisandro-marble/942',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble/229',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/alaska-grey-marble/954',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/diana-royal-marble-/437',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-giallo-marble/687',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nero-marquina-marble-/483',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/crema-marfil-marble/477',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/solaris-blue-marble/681',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/dolomite-white-marble/540',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-grey-marble/244',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/lucid-grey-marble/940',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ocean-grey-marble/585',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-tumbled/750',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/storm-grey-marble/619',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/armani-brown-marble/957',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-calacatta-marble/686',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-gold-marble/685',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-natural/749',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/salome-marble/785',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/puffin-grey-marble/545',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/sofita-beige-marble/292',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/savannah-grey-marble/761',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/oasis-grey-marble/688',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/asgrey-marble/684',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-sandblasted-/746',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cappuccino-light-marble/230',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-dark-marble/218',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mende-white-line-marble/754',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/siena-gold-marble-/672',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/carrara-white-marble/475',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-tiger-marble/217',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/coffee-royal-marble/476',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-antique-marble/786',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/burdur-beige-marble/389',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-blue-marble/242',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone/537',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ottoman-beige-marble/312',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/latte-cream-marble-/435',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-beige-marble/275',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pasha-white-marble/696',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/toros-black-marble/279',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/equator-white-marble/396',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/botticino-cream-marble-antique/336',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-antique/647',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/basalt/579',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-light-marble/487',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/royal-beige-marble/237',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/afyon-sugar-marble/420',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/adranos-white-marble/288',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-alicante-marble/486',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-sandblasted-marble/401',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cappuccino-medium-marble/241',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-bamboo/748',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-levanto-marble/536',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pietra-grey-marble/485',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/leonardo-vein-cut-travertine/879',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-vein-cut-travertine/201',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-travertine-honed/41',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/walnut-vein-cut-travertine/39',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-vein-cut-travertine/46',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/yellow-vein-cut-travertine/390',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-travertine-natural/547',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-travertine-polished/546',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mina-rustic-vein-cut-travertine/973',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/leonardo-cross-cut-travertine/891',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine/33',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/valencia-travertine/948',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-grey-travertine/43',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/yellow-gold-travertine/34',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-travertine/37',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-travertine-pattern-set/801',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/red-travertine/40',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/walnut-travertine/45',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-rustic-travertine/416',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-natural-pattern-set-travertine/42',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-pattern-set-travertine/49',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/scabos-pattern-set-travertine/236',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-grey-pattern-set-travertine/120',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gold-travertine-pattern-set/119',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/volcano-pattern-set-travertine/48',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/walnut-pattern-set-travertine/698',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ivory-rustic-pattern-set-travertine/588',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tuscany-mix-pattern-set-travertine/760',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mina-rustic-pattern-set-travertine/206',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/scott-rustic-pattern-set-travertine/210',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/storm-noche-pattern-set-travertine/693',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-pillowed-pattern-set/381',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/yellow-antique-travertine/391',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-antique-travertine/122',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nesco-antique-travertine/587',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/licom-antique-travertine/480',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-grey-antique-travertine/270',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-antique-travertine/202',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-splitface-travertine/484',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-splitface-travertine/213',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rustic-splitface-travertine/212',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-mocha-cream-limestone/949',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-limestone/332',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/perla-limestone/787',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/jerusalem-limestone-/333',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/seagrass-limestone/337',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-paver/415',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-grey-travertine-paver/317',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-sandblasted-paver/964',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-travertine-paver/200',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gold-travertine-paver/199',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-grey-marble-paver/971',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/licom-travertine-paver/966',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-natural-paver/969',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-tumbled-paver/970',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/walnut-travertine-paver/100',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-light-marble-paver/535',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shellstone-limestone-paver/980',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/grey-crazy-paver/951',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/beige-crazy-paver/952',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/white-crazy-paver/854',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/black-angel-pebble/498',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/snow-flakes-pebble/499',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/dolomite-pebble/490',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nyx-pebble/500',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/green-angel-pebble/501',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rainbow-pebble/502',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/granite-pebble/503',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-laguna-pebble/504',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tiger-gneiss-pebble/505',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/lilac-pebble/506',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/egean-brown-pebble/507',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/angel-sparks-pebble/508',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/basalt-pebble/509',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/river-green-pebble/512',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/river-gravels/520',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/yellow-slate/495',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/black-angel-flagstone/853',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/river-rock-stone/519',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/meteora-rock-stone/494',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pipeline-rock-stone/496',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/spaghetti-rock-stone/493',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nyx-natural-birdbath/856',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/lilac-natural-birdbath/857',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rainbow-natural-birdbath/858',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/white-natural-birdbath/859',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/black-angel-birdbath/860',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/angel-sparks-birdbath/862',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/black-angel-column/521',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-laguna-column/522',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/lilac-column/523',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/white-column/524',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nyx-column/525',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-101/659',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-107/665',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-114/756',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-115/802',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-3/28',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-10/60',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-27/68',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-6/53',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-105/663',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-38/76',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-2/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-1/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-103/661',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-106/664',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-109/667',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-102/660',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-110/668',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-113/751',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-37/75',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-112/695',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-104/662',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-7/54',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-5/52',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-8/55',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-34/72',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-21/63',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-11/58',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-22/64',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-9/56',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-24/66',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-23/65',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-26/883',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-14/61',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-28/69',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vessel-sink-model-36/74',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-44/80',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-40/903',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-46/81',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-53/78',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-49/82',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-50/83',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-42/77',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/farmer-sink-model-56/936',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-101/920',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-102/921',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-62/85',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-66/86',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-70/87',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-63/84',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/shower-tray-model-64/890',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-countertop/398',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-countertop/400',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/beige-marble-mountertop/399',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-marble-countertop/397',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-56/88',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-57/89',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-101/932',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-102/933',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-103/934',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-104/935',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-105/937',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bathtub-model-106/974',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-Slab/109',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-travertine-slab/102',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-slab/101',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-limestone-slab/462',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/royal-beige-marble-slab/379',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-lilac-marble-slab/365',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/black-eagle-white-marble-slab/581',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/baiyulan-beige-marble-slab/586',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/puffin-grey-vein-cut-marble-Slab/590',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/puffin-grey-marble-slabs/592',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ocean-grey-marble-slab/596',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-slab/646',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-light-marble-slab/674',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/blue-river-marble-slab/915',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/latte-cream-marble-slab/675',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/crema-marfil-marble-slab/694',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pasha-white-marble-slab/631',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-giallo-marble-slab/939',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/savannah-grey-marble-slab/583',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/afyon-sugar-marble-slab/597',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/astan-grey-marble-slab/914',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/equator-white-marble-slab/403',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/storm-grey-marble-slab/676',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/lilac-dark-marble-slab/917',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/sugar-violet-marble-slab/840',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/verde-guatemala-marble-slab/938',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pasha-vita-marble-slab/632',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-light-marble-slab/460',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/blanco-ivory-marble-slab/375',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/persian-silver-travertine-slab/580',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/platinum-white-marble-slabs/591',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-alicante-marble-slab/679',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/oasis-river-marble-slab/673',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/toros-black-marble-slab/593',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/massa-blanca-marble-slab/680',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-dark-marble-slab/248',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/coffee-royal-marble-slab/533',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-vein-cut-travertine-slab/394',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/solaris-blue-marble-slab/682',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/asgrey-marble-slab/683',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/burdur-beige-marble-slab/691',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gold-travertine-slab/762',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/diana-royal-marble-slab/532',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-grey-travertine-slab/266',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/red-travertine-slab/107',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-grey-marble-slab/454',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cappuccino-light-marble-slab/692',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cappucino-medium-marble-slab/376',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mende-white-marble-slab/699',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-travertine-slab/252',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/imperial-brown-marble-slab/584',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/olive-maroon-marble-slab/629',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/sofita-beige-marble-slab/465',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ottoman-beige-marble-slab/238',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-calacatta-marble-slab/442',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-gold-marble-slab/670',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nero-marquina-marble-slabs/594',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/olive-brown-marble-slab/763',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pietra-grey-marble-slab/648',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/dolomite-white-marble-slab/463',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/salome-marble-slab/655',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/rosso-levanto-marble-Slab/443',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/adranos-white-marble-slab/377',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/perla-limestone-slab/755',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/fantasy-white-marble-slab/794',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/carrara-white-marble-slab/419',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-beige-marble-slab/795',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/jerusalem-limestone-slab/455',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/leonardo-vein-cut-travertine-slab/796',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/siena-gold-marble-slab/671',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-resin-travertine-slab/106',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/onyx-cross-cut-slab/656',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/onyx-honey-comb-slab/657',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/onyx-vein-cut-slab/658',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tundra-blue-marble-slab/254',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-venato-marble-slab/110',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-vein-cut-travertine-slab/479',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/yellow-vein-cut-travertine-slab/269',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/golden-river-marble-slab/439',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/palisandro-marble-slab/943',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-moca-cream-limestone-slab/950',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/elsa-quartz-slab/701',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/galaxy-quartz-slab/702',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gereme-quartz-slab/703',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/efesus-quartz-slab/704',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/karia-quartz-slab/705',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/magnolia-quartz-slab/706',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/truva-grey-quartz-slab/707',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/venato-quartz-slab/708',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/irlana-quartz-slab/709',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/helene-quartz-slab/851',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/artistic-black-quartz-slab/764',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-erin-quartz-slab/765',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-lea-quartz-slab/766',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-sue-quartz-slab/767',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-vela-quartz-slab/768',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-mina-quartz-slab/910',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/fantasy-quartz-slab/772',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ice-white-quartz-slab/773',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/idea-quartz-slab/774',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/magnet-quartz-slab/776',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/naris-quartz-slab/777',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/night-quartz-slab/778',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kafkas-quartz-slab/909',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/peak-quartz-slab/779',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/regnis-quartz-slab/780',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/riyana-quartz-slab/781',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/alya-quartz-slab/889',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/scarlet-quartz-slab/782',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/versatile-quartz-slab/783',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mystral-grey-quartz-slab/898',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/polar-breeze-quartz-slab/899',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gloria-quartz-slab/900',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/milas-quartz-slab/901',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/alba-vela-quartz-slab/902',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/mystic-brown-quartz/975',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/astoria-quartz/976',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/linda-quartz/977',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/storm-quartz/978',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-rivera-quartz-slab/981',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/tender-quartz-slab/982',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/hidra-quartz-slab/983',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/ariston-quartz-slab/984',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/crystal-white-quartz-slab/985',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/calacatta-oro-quartz-slab/986',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-stairs/382',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-vein-cut-travertine-stairs/953',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/diana-royal-marble-stairs/958',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-dark-marble-stairs/383',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-stairs/384',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/gold-travertine-stairs/264',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-lilac-marble-stairs/955',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-travertine-stairs/956',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/noche-vein-cut-travertine-stairs/972',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bluestone-stairs/959',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/vanilla-beige-marble-stairs/960',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/turkish-lilac-marble-fireplace/962',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-fireplace/965',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-limestone-fireplace/963',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-fireplace/968',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-square-table-Top/757',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-round-table-Top/538',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/toros-black-marble-square-table-Top/759',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nero-marquina-marble-round-table-Top/758',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/nero-marquina-marble-ellipse-table-Top/539',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/emperador-beige-marble-vase/905',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-vase/904',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-balustrade/209',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/bianco-ibiza-marble-balustrade/464',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/classic-travertine-flowerpot/907',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/silver-travertine-flowerpot/906',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-fountain-oslo/837',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-drains/797',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/medallion-dahlia/884',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/medallion-magnolia/886',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/medallion-poinciana/885',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-fountain-Rome/833',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-fountain-madrid/838',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-fountain-paris/832',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-fountain-beirut/651',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-fountain-moscow/836',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-fountain-muscat/653',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-fountain-london/839',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-fountain-riyadh/649',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/baseboard-molding/203',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/baseboard-tuli/531',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/pencil-molding/204',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-dora/406',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-ogee-2/404',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-ogee-1/265',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-tilt/407',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-cup/208',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/molding-rope/207',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-tile-adhesive-1051/444',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-white-tile-adhesive-1052/445',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-technoflex-adhesive-1054/446',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-technopool-adhesive-1062/908',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-grout---2000-fuga/634',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-grout---2200-ultra-fuga/635',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-grout---2300-fuga-flex/636',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-grout---2500-ultra-fuga-flex/637',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/kalekim-grout---2900-fugapool/639',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/sealing---maxiseal-vh72/633',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/polish---maximax-vh44/700',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/cleaner---maxiclean-vht62/925',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-51/325',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-h515/789',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-51/803',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-h315/791',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-hx44/817',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-d44/790',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-p-44/829',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-cb-bb/828',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-m-22/181',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-d22/190',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-s-rp/814',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-h24/359',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-m-mp/788',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-wg-r/827',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-s-p16/848',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-rv/826',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-r/261',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cc-44/127',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cc-24/124',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mt-w-3d22/372',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mt-c-3d31/374',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tb-c-p26/743',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-y-pz15/392',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-s-pz15/410',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-c-pz26/346',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-p16/731',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-r/931',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tb-y-p26/744',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-p26/771',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-y-3d22/263',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-pz15/816',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-py-imp/434',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-44/182',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cw-s/724',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-ms-wg-p16/849',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-24/174',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-wbl-b/323',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-hx44/271',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/limestone-mosaic-lp-lb-ln/717',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-&-limestone-mosaic-dp-lbs-ln/718',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-ln/578',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-h515/716',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-h27/589',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tu-s-h315/710',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-mp/627',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-24/168',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-24/713',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-lm/623',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-lm/721',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-&-limestone-mosaic-dp-wg-lm/722',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-r/144',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-cn-515/819',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-pg-r/823',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-m3-24/139',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-hx22/714',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/limestone-mosaic-lp-w-ar/729',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-pq/622',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-24/329',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-wbl-bb/135',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-wbl-t/149',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-pq/805',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-gb-b/811',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ccb-b/807',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-hx44/620',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-pg-hx44/799',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-fs/726',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-fs/725',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cc-md/728',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-b-24/793',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-ms-w-44/159',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-44/178',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cb-lf/723',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-bl-c27/800',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-c27/896',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-c27/897',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-22/134',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ccy-t/128',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ccb-o/813',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-&-travertine-mosaic-dp-ws-hx44/624',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-w-hx44/808',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-wg-sky/727',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-m3-d44/720',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-op/628',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-mp/712',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-n-mp/830',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-cc-51/193',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-y-515/844',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-s-515/845',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-m3-22/141',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-cn-22/821',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-p-515/847',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-515/846',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-d22/175',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-m3-24/742',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-m-d22/831',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-44/327',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-44/136',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-m3-44/138',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-g-rp/326',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-24/262',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tf-c-44/544',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-c-3d22/373',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-22/166',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-51/358',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-51/189',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-rp/349',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-cn-b/177',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-44/820',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-c-52/348',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-22/188',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-h24/191',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tt-n-24/357',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-s-24/158',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-n-51/162',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-c-51/343',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tv-c-v44/338',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-ts-c-24/150',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/travertine-mosaic-tv-c-44/172',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ps-hx44/944',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ps-ln/947',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ps-c27/945',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/marble-mosaic-mp-ps-rp/946',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132607/552',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132608/553',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132609/554',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132610/555',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132611/556',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132617/559',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132619/560',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132620/561',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132621/562',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132622/563',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132623/564',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132624/565',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132627/568',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132629/569',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132644/571',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132645/572',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132647/573',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132648/574',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132649/575',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132663/576',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132664/577',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132591/894',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132606/551',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132603/548',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132605/550',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132604/549',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/detail/glass-mosaic-gl132626/567',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/brushed-&-sandblasted',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/finish/bamboo',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/finish/filled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/finish/unfilled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/3/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/3/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/3/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/finish/matt',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/tumbled-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/paver',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/landscape',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/splitface',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/rock-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/column-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/tumbled',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/finish/river-group',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/vessel-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/farmer-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/bathtub',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/pedestal-sink',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/shower-tray',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/finish/countertop',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/finish/marble',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/finish/travertine',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/finish/bookmatched',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/finish/limestone',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/finish/onyx',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/brushed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/finish/honed',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/stairs',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/fountain',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/molding',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/table-top',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/fireplace',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/medallion',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/vase',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/flowerpot',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/balustrade',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/finish/drain',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/finish/grouting',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/finish/tile-adhesives',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/finish/tile-cleaner',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/finish/tile-sealers',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/finish/polished',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/18/finish/fireproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/18/finish/waterproof',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/18/finish/standard',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/1/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/3/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/3/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/grey/2',
        modifiedAt: new Date(),
      },      {
        _path: '/ar/product/filter/category/4/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/color/multicolor/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/beige/4',
        modifiedAt: new Date(),
      },      {
        _path: '/ar/product/filter/category/7/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/blue/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/color/green/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/8/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/beige/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/brown/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/grey/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/black/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/red-pink-purple/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/color/yellow/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/color/white/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/edge/straight/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/edge/chiseled/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/edge/tumbled/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/4/material/glass/3',
        modifiedAt: new Date(),
      },      {
        _path: '/ar/product/filter/category/4/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/material/marble/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/material/travertine/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/material/limestone/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/7/material/onyx/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/style/cross cut/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/2/style/vein cut/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/type/paver/22',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/type/pebble/24',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/type/column/27',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/type/birdbath/25',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/5/type/crazy paver/23',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/type/sink/1',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/type/bathtub/4',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/type/shower tray/3',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/6/type/countertop/2',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/stairs/7',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/fountain/5',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/molding/6',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/tabletop/8',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/fireplace/9',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/medallion/10',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/balustrade/11',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/flowerpot/12',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/9/type/vase/28',
        modifiedAt: new Date(),
      },      {
        _path: '/ar/product/filter/category/9/type/drain/14',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/type/grout/29',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/type/adhesive/16',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/type/sealer/17',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/type/cleaner/18',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/product/filter/category/11/type/polish/30',
        modifiedAt: new Date(),
      },
      {
        _path: '/projects/detail/ahly-project/1064',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/projects/detail/ahly-project/1064',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/projects/detail/ahly-project/1064',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/projects/detail/ahly-project/1064',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/projects/detail/ahly-project/1064',
        modifiedAt: new Date(),
      },

      {
        _path: '/projects/detail/arsea-project/1065',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/projects/detail/arsea-project/1065',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/projects/detail/arsea-project/1065',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/projects/detail/arsea-project/1065',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/projects/detail/arsea-project/1065',
        modifiedAt: new Date(),
      },

      {
        _path: '/projects/detail/art-project-2/1066',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/projects/detail/art-project-2/1066',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/projects/detail/art-project-2/1066',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/projects/detail/art-project-2/1066',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/projects/detail/art-project-2/1066',
        modifiedAt: new Date(),
      },


      
      {
        _path: '/projects/detail/b-mart-project/1067',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/projects/detail/b-mart-project/1067',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/projects/detail/b-mart-project/1067',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/projects/detail/b-mart-project/1067',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/projects/detail/b-mart-project/1067',
        modifiedAt: new Date(),
      },

      {
        _path: '/faq',
        modifiedAt: new Date(),
      },
      {
        _path: '/fr/faq',
        modifiedAt: new Date(),
      },
      {
        _path: '/es/faq',
        modifiedAt: new Date(),
      },
      {
        _path: '/ru/faq',
        modifiedAt: new Date(),
      },
      {
        _path: '/ar/faq',
        modifiedAt: new Date(),
      }









      



    ]);
    return posts.map((p) => {
      return {
        loc: p._path,
        lastmod: p.modifiedAt,
      };
    });
  });
  