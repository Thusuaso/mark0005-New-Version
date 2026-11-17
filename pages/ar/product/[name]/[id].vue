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
            <h3 class="header" style="font-weight: bold">ما هو الرخام؟</h3>
            <p class="description" style="text-align: justify">
              <strong>البلاط الرخامي</strong> عبارة عن بلاط
              <strong> من الحجر الطبيعي </strong>مصنوع من<strong> الرخام</strong>، وهو
              صخرة متحولة تتشكل عندما يتعرض<strong> الحجر الجيري </strong> لضغط وحرارة
              شديدين. تشتهر كل بلاطة<strong> رخامية </strong>بعروقها الفريدة وتنوع
              ألوانها الغنية، وهي مميزة ومذهلة بصريًا. يسمح هيكلها البلوري بصقلها
              للحصول على لمعان عالي، مما يزيد من جاذبيتها الفاخرة لتصميماتك<strong>
                الداخلية
              </strong>
              و<strong>الخارجية. </strong>متوفر بتشطيبات متنوعة مثل<strong>
                المصقول، والشحذ، والمقلوب، والبلاط الرملي
              </strong>
              و<strong> البلاط الرخامي المطلي بالدغل </strong>يوفر تنوعًا في التصميم.
              يتم استخدامها على نطاق واسع في
              <strong> الأرضيات، وتكسية الجدران، وأسطح العمل </strong> و<strong>
                الحمامات
              </strong>
              لإضافة الأناقة إلى <strong> المساحات السكنية </strong> و<strong>
                التجارية </strong
              >. البلاط الرخامي مقاوم للحرارة، مما يجعله مناسبًا
              <strong> للمطابخ والمدافئ </strong> و<strong
                >للاستخدامات الخارجية </strong
              >وكذلك<strong> للديكورات الداخلية</strong>. يساعد الختم والصيانة
              المناسبة على حمايتهم من البقع والحفر. إن جمالها ومتانتها الخالدة يجعلها
              استثمارًا طويل الأمد في أي مشروع. باعتباره مادة طبيعية صديقة للبيئة، يعد
              الرخام خيارًا مستدامًا لتعزيز جماليات وقيمة ديكوراتك<strong>
                الداخلية
              </strong>
              و<strong> الخارجية.</strong>
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 2">
          <div class="col-sm-12">
            <h3 class="header">ما هو الترافرتين؟</h3>
            <p class="description" style="text-align: justify">
              <strong> الترافرتين </strong> هو حجر طبيعي يتكون من خلال الترسيب السريع
              لكربونات الكالسيوم في الينابيع المعدنية، وخاصة الينابيع الساخنة. وهو نوع
              من <strong> الحجر الجيري </strong> ذو بنية مسامية، ويتميز غالبًا بألوانه
              الترابية الدافئة مثل البيج والكريمي والأسمر والصدأ. يمنحه نسيج
              الترافرتين الفريد وحفره الطبيعية سحرًا ريفيًا، على الرغم من أنه يمكن
              ملؤها للحصول على لمسة نهائية أكثر سلاسة. متوفر بتشطيبات مثل
              <strong> مصقول</strong>، أو <strong> مصقول</strong>، أو
              <strong> مصقول</strong> أو <strong> متدحرج</strong>، أو
              <strong> حجر جيري </strong> متعدد الاستخدامات لمختلف أنماط التصميم
              المعماري. يُستخدم بشكل شائع في <strong> الأرضيات</strong>، و<strong>
                تكسية الجدران</strong
              >، و<strong> الأفنية</strong>، و<strong> محيط حمامات السباحة</strong>
              و<strong>أسطح الحمامات</strong>. نظرًا لخصائصه
              <strong>المقاومة للانزلاق</strong>.
              <strong>بلاط الترافرتين</strong> متين ويمكنه تحمل عوامل الطقس، مما يجعله
              مثاليًا للتطبيقات <strong>الداخلية</strong> و<strong>الخارجية</strong>.
              يعد <strong>الإغلاق المناسب</strong> أمرًا ضروريًا لحماية
              <strong>الحجر الجيري</strong> من التلطخ وامتصاص الرطوبة. إن جاذبيته
              الخالدة ودفئه الطبيعي يجعلان من <strong>الحجر الجيري</strong> خيارًا
              شائعًا لتحقيق ديكورات <strong>داخلية</strong> و<strong>خارجية</strong>
              كلاسيكية وأنيقة. باعتباره مادة صديقة للبيئة، يساهم الحجر الجيري في أفكار
              وتصميمات ديكور منزلي مستدامة وممتعة من الناحية الجمالية
              <strong>للمهندسين المعماريين</strong> و<strong>المصممين</strong>
              والمستخدمين النهائيين.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 3">
          <div class="col-sm-12">
            <h3 class="header">ما هو الحجر الجيري؟</h3>
            <p class="description" style="text-align: justify">
              <strong>بلاط الحجر الجيري</strong> مصنوع من الصخور الرسوبية التي تتشكل
              على مدى ملايين السنين من تراكم المواد العضوية مثل الأصداف والرواسب
              البحرية. يشتهر <strong>بلاط الحجر الجيري</strong> بألوانه الناعمة
              والمحايدة مثل الكريم والبيج والرمادي والأبيض، مما يخلق جمالية هادئة
              وطبيعية <strong>للديكورات الداخلية</strong> و<strong>الخارجية</strong>.
              قوي>. إن أنماطها الدقيقة وأنسجتها الناعمة تجعلها خيارًا متعدد
              الاستخدامات لكل من التصميمات المعمارية
              <strong>الحديثة</strong> و<strong>الكلاسيكية</strong>. يُستخدم
              <strong>بلاط الحجر الجيري</strong> بشكل شائع في
              <strong>الأرضيات</strong>، و<strong>تكسية الجدران</strong> و<strong
                >رصف الأماكن الخارجية</strong
              >، مما يوفر مزيجًا من الجمال والأداء الوظيفي. وهي ذات قيمة خاصة لقدرتها
              على البقاء باردًا تحت الأقدام، مما يجعلها مثالية
              <strong>للأجواء الدافئة</strong> و<strong>للمناطق الخارجية</strong>.
              متوفر بتشطيبات مثل <strong>مصقول</strong>، و<strong>مصقول</strong>،
              و<strong>متدحرج</strong>، و<strong>مسفوع بالرمل</strong>، و<strong
                >مطرق بالشجيرات</strong
              >؛ يعد <strong>الحجر الجيري</strong> الخيار الأفضل لمختلف
              <strong>التصميمات المعمارية</strong>. يُستخدم بشكل شائع في
              <strong>الأرضيات</strong>، و<strong>تكسية الجدران</strong>،
              و<strong>الباحات</strong>، و<strong>محيط حمامات السباحة</strong>،
              و<strong>أسطح الحمام</strong> نظرًا لخصائصه
              <strong>المقاومة للانزلاق</strong>. على الرغم من أنه أكثر ليونة من
              الأحجار الطبيعية الأخرى، إلا أن الحجر الجيري متين بدرجة كافية للاستخدام
              <strong>السكني</strong> و<strong>التجاري</strong> عند صيانته بشكل
              صحيح.يوصى بالإغلاق المنتظم لحمايته من الرطوبة والبقع، خاصة في المناطق
              الرطبة أو ذات حركة المرور العالية. يُعد
              <strong>بلاط الحجر الجيري</strong> خيارًا صديقًا للبيئة وخالدًا
              <strong>للمهندسين المعماريين</strong> و<strong>للمصممين</strong>، حيث
              يعمل على تحسين المساحات بأناقتها البسيطة وجاذبيتها الطبيعية.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 4">
          <div class="col-sm-12">
            <h3 class="header">ما هي الفسيفساء الحجرية الطبيعية؟</h3>
            <p class="description" style="text-align: justify">
              <strong>الرخام</strong> و<strong>الحجر الجيري</strong> و<strong
                >فسيفساء الحجر الجيري</strong
              >
              هي <strong>بلاطات زخرفية</strong> مصنوعة من
              <strong>أحجار طبيعية</strong> لإضافة المزيد مظهر متطور
              <strong>للتصميمات الداخلية</strong> و<strong>الخارجية</strong>. تم تصميم
              هذه <strong>الفسيفساء</strong> بدقة من خلال ترتيب قطع صغيرة من الحجر في
              أنماط أو أشكال معقدة، مما يجعلها خيارًا شائعًا لإضافة الأناقة إلى مختلف
              <strong>الزخارف المعمارية</strong>.
              <strong>الفسيفساء الرخامية</strong> تحظى بتقدير كبير بسبب
              <strong>التشطيب المصقول</strong> والمتانة والجاذبية الفاخرة، وغالبًا ما
              تعرض أنماط عروق خالدة بظلال من اللون الأبيض أو الرمادي أو الأسود. من
              ناحية أخرى، توفر <strong>الحجر الجيري</strong> و<strong
                >فسيفساء الحجر الجيري</strong
              >
              سحرًا ريفيًا أكثر بألوانها الترابية وملمسها المسامي المميز، مما يخلق
              أجواء دافئة وطبيعية <strong>لداخلك </strong> و
              <strong>الديكورات الخارجية</strong>. مثالية
              <strong>للبلاطات الخلفية</strong>، و<strong>للحمامات</strong>،
              و<strong>للمطابخ</strong>، و<strong>للجدران المميزة</strong>،
              و<strong>للرخام</strong>،
              <strong> يجمع كل من الحجر الجيري القوي</strong> و<strong
                >فسيفساء الحجر الجيري</strong
              >
              بين الأسلوب والوظيفة. <strong>فسيفساء الحجر الطبيعي</strong> هي الخيار
              الأفضل <strong>لأصحاب المنازل</strong> و<strong>المصممين</strong> الذين
              يسعون إلى تحسين <strong>تصميماتهم الأنيقة</strong> بمزيج من التصاميم
              الكلاسيكية. الجمال والتطبيق العملي الحديث. يمكن أن تقدم الفسيفساء
              أفكارًا للديكورات الملونة للمشاريع
              <strong>السكنية</strong> و<strong>التجارية</strong>.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 5">
          <div class="col-sm-12">
            <h3 class="header">ما هي منتجات الحجر في الهواء الطلق؟</h3>
            <p class="description" style="text-align: justify">
              <strong>المنتجات الحجرية الخارجية</strong> هي مواد حجرية طبيعية أو مصنعة
              مصممة خصيصًا للاستخدام في <strong>التطبيقات الخارجية</strong>. تم تصميم
              هذه المنتجات لتحمل الظروف الجوية المختلفة، بما في ذلك المطر والتعرض
              لأشعة الشمس والصقيع وحركة السير الكثيفة، مما يجعلها حلولًا متينة ومتعددة
              الاستخدامات <strong>للمساحات الخارجية</strong>. تشمل منتجات الحجر
              الخارجية الشائعة <strong>الأرضيات</strong>، و<strong></strong>البلاط،
              و<strong>المواجهة</strong>، و<strong>الكسوة</strong>، و<strong
                >أحجار تنسيق الحدائق</strong
              >، مصنوعة من مواد مثل <strong>الحجر الجيري</strong>،
              و<strong>الرخام</strong>، و<strong>الجرانيت</strong>، و<strong
                >الحجر الجيري</strong
              >، و<strong>الأردواز</strong>. يتم استخدامها بشكل متكرر لإنشاء
              <strong>الباحات</strong>، و<strong>الممرات</strong>، و<strong
                >محيط حمامات السباحة</strong
              >، و<strong>جدران الحدائق</strong>، و<strong>الواجهات</strong>.،
              و<strong>ميزات خارجية</strong> أخرى. تشتهر
              <strong>المنتجات الحجرية الخارجية</strong> بجمالها الطبيعي،
              <strong>ومقاومتها للانزلاق</strong>، وقلة صيانتها، مما يضيف جمالية خالدة
              مع تعزيز وظائف وقيمة <strong>المناطق الخارجية</strong>.يحظى
              <strong>الرخام</strong> و<strong>الحجر الجيري</strong>، على وجه الخصوص،
              بشعبية كبيرة في <strong>المشاريع الخارجية</strong> نظرًا لجمالهما
              الطبيعي وقوتهما الدائمة. يقدم <strong>الرخام</strong> مظهرًا فاخرًا
              مصقولًا، وهو مثالي للمساحات الخارجية المتطورة مثل
              <strong>الباحات</strong> و<strong>ممرات الحدائق</strong>. يعتبر
              <strong>الحجر الجيري</strong>، بملمسه الريفي وسطحه
              <strong>المقاوم للانزلاق</strong>، مثاليًا
              <strong>لمحيط حمامات السباحة</strong>، و<strong>الممرات</strong>،
              <strong>قوية>سلالم خارجية</strong>، مما يضمن السلامة دون المساس
              بالأناقة. كلتا المادتين مقاومتان للحرارة بشكل طبيعي، مما يجعلها اختيارًا
              ممتازًا للبيئات المشمسة. عند إغلاقها وصيانتها بشكل صحيح، يمكن أن تستمر
              منتجات <strong>الرخام</strong> و<strong>الحجر الجيري</strong> و<strong
                >الحجر الجيري الخارجي</strong
              >
              لعقود من الزمن، مما يحافظ على سحرها ويعزز قيمة أي عقار.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 6">
          <div class="col-sm-12">
            <h3 class="header">ما هي منتجات الحمام والمطبخ؟</h3>
            <p class="description" style="text-align: justify">
              <strong>الحمام</strong> و<strong>المطبخ</strong> هما أكثر المناطق التي
              تم اختيارها لتزيينها بأناقة <strong>الحجر الطبيعي</strong>. قم بتحويل
              مساحات <strong>الحمام</strong> و<strong>المطبخ</strong> لديك من خلال
              الجمال الخالد والمتانة التي تتميز بها منتجات
              <strong>الحجر الطبيعي</strong> المصنوعة من <strong>الرخام</strong>،
              <strong> >الحجر الجيري</strong>، و<strong>الحجر الجيري</strong>. تضفي
              هذه المواد الرائعة لمسة من الفخامة والرقي، وتجمع بين المظهر الجمالي
              والوظيفة العملية. <strong>الرخام</strong> هو
              <strong>الحجر الطبيعي</strong> الأكثر شيوعًا لتزيين
              <strong>حماماتك</strong> و<strong>مطابخك</strong> بعروقه الأنيقة وتشطيبه
              المصقول. فهو يضيف لمسة فاخرة إلى <strong>أسطح العمل</strong>، و<strong
                >البلاطات الخلفية</strong
              >، و<strong>المغاسل</strong>، و<strong>صواني الدش</strong>. تضمن أنماطها
              الفريدة عدم وجود قطعتين متشابهتين، مما يجعل مساحتك فريدة من نوعها حقًا.
              في حين أن <strong>الحجر الجيري</strong> معروف بألوانه الترابية وسطحه
              المزخرف، فإنه يوفر سحرًا ريفيًا ولكن راقيًا. إنها مادة مثالية
              <strong>للأحواض</strong>، و<strong>أحواض الاستحمام</strong>، و<strong
                >لكسوة الجدران</strong
              >، و<strong>للأرضيات</strong>، مما يخلق جوًا دافئًا وجذابًا . كخيار آخر
              من <strong>الحجر الطبيعي</strong> للتصميم الفني، يتمتع
              <strong>الحجر الجيري</strong> بأنسجة دقيقة ولمعان في تطبيقات مثل
              <strong>صواني الدش</strong>، والأحواض، و<strong>جزر المطبخ</strong> مع
              استكمال التصميمات الحديثة والتقليدية بسلاسة. في حين أن
              <strong>أسطح العمل</strong> المتينة والمقاومة للحرارة تجعل الطهي أمرًا
              ممتعًا، فإن <strong>الأحواض الحجرية</strong> و<strong
                >أحواض الاستحمام</strong
              >
              الأنيقة تحول الروتين اليومي إلى تجارب فاخرة.
              <strong>صواني الدش الحجرية</strong> و<strong>أحواض الاستحمام</strong>،
              المصممة لكل من الأسلوب والوظيفة، تعزز جاذبية أي حمامات
              <strong>سكنية</strong> و<strong>تجارية</strong> بمظهرها الأنيق والسلس
              لديكورات الحمام والمطبخ.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 7">
          <div class="col-sm-12">
            <h3 class="header">ما هو بلاطة الحجر الطبيعي؟</h3>
            <p class="description" style="text-align: justify">
              تُعد <strong>الرخام</strong> الرائعة و<strong>الحجر الجيري</strong>
              و<strong>ألواح الحجر الطبيعي من الحجر الجيري</strong> أحد أفضل الخيارات
              للأسطح المذهلة. عزز مساحاتك باستخدام
              <strong>ألواح الحجر الطبيعي</strong> المتميزة المصنوعة من
              <strong>الرخام</strong>، و<strong>الحجر الجيري</strong>، و<strong
                >الحجر الجيري</strong
              >. تعتبر هذه الألواح مثالية لمجموعة واسعة من الأسطح، كما أنها مثالية
              لإنشاء <strong>أسطح مطبخ</strong> فاخرة، و<strong>مغاسل حمامات</strong>
              أنيقة، و<strong>أرضيات</strong> متينة، و<strong>
                ملفتة للنظر. >تكسية الجدران</strong
              >. سواء تم تصميم <strong>جدران الدش</strong> الأنيقة، أو
              <strong>أسطح الأثاث</strong> المخصصة أو أسطح
              <strong>الفناء الخارجي</strong>، فإن
              <strong>ألواح الحجر الطبيعي</strong> لدينا توفر جمالًا خالدًا و براعة لا
              مثيل لها. يتم اختيار كل لوح بعناية لأنماطه وألوانه وملمسه الفريد، مما
              يضمن أن أسطحك مميزة مثل أسلوبك. بفضل متانته وأناقته
              <strong>الطبيعية</strong>، يوفر <strong>الرخام</strong> تطورًا مصقولًا،
              ويضيف <strong>الحجر الجيري</strong> سحرًا ريفيًا، ويخلق
              <strong>الحجر الجيري</strong> نظرة خفية وراقية. هذه
              <strong>الألواح</strong> مناسبة للمساحات
              <strong>السكنية</strong> و<strong>التجارية</strong>، حيث تعمل على تحويل
              <strong>المطابخ</strong> و<strong>الحمامات</strong> و<strong
                >غرف المعيشة</strong
              >، و<strong>المكاتب</strong>، وحتى <strong>المناطق الخارجية</strong> إلى
              أعمال فنية مذهلة. استكشف مجموعتنا للعثور على
              <strong>ألواح الحجر الطبيعي</strong> المثالية
              <strong>لتصميماتك المعمارية</strong> وأنشئ أسطحًا تصمد أمام اختبار الزمن
              مع إضافة أناقة لا مثيل لها إلى كل ركن من أركان مساحتك.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 8">
          <div class="col-sm-12">
            <h3 class="header">ما هي منتجات الكوارتز؟</h3>
            <p class="description" style="text-align: justify">
              <strong>ألواح الكوارتز</strong> عبارة عن مزيج أنيق من الجمال الطبيعي
              والمتانة الهندسية، مما يجعلها خيارًا متعدد الاستخدامات لكل من التطبيقات
              <strong>السكنية</strong> و<strong>التجارية</strong>. تتكون هذه الألواح
              من أكثر من 90% من بلورات <strong>الكوارتز</strong> الطبيعية الممزوجة
              بالراتنجات والأصباغ، وتوفر قوة استثنائية و<strong>أسطح</strong> غير
              مسامية تقاوم التلطخ والخدش والحرارة. تتوفر
              <strong>ألواح الكوارتز</strong> بمجموعة واسعة من الألوان والأنماط
              والتشطيبات، ويمكنها محاكاة مظهر <strong>الحجر الطبيعي</strong> مع توفير
              اتساق معزز وأقل قدر من الصيانة. سواء تم استخدامها
              <strong>لأسطح المطبخ</strong>، أو
              <strong>لمستحضرات تجميل الحمام</strong> أو
              <strong>لتكسية الجدران</strong>، فإن
              <strong>ألواح الكوارتز</strong> توفر مظهرًا متطورًا ولامعًا يكمل المظهر.
              <strong>التصميمات المعاصرة</strong> و<strong>الكلاسيكية</strong> على حدٍ
              سواء. يمكن استخدام <strong>ألواح الكوارتز</strong> أيضًا في
              <strong>البلاطات الخلفية</strong> أو <strong>أسطح الطاولات</strong> أو
              <strong>الأثاث</strong> مما يضيف لمسة من الرقي والمرونة إلى
              <strong>طاولات طعام</strong>، <strong>طاولات قهوة</strong>، والمزيد. إن
              طبيعتها التي تتطلب القليل من الصيانة ومتانتها تجعل من
              <strong>ألواح الكوارتز</strong> استثمارًا عمليًا وأنيقًا خاصة بالنسبة
              إلى <strong>أسطح المطبخ</strong> و<strong>الجزر</strong>، مما يضمن طول
              العمر والجمال لسنوات عديدة. يأتي. سواء كنت تصمم مساحة بسيطة أو
              <strong>تصميمًا داخليًا</strong> جريئًا ومثيرًا، فإن هذه الألواح تتكيف
              بسهولة مع رؤيتك. مظهرها المتسق، إلى جانب القدرة على اختيار
              <strong>ملفات تعريف الحواف</strong> و<strong>التشطيبات</strong> المختلفة
              (<strong>المصقولة</strong>، أو <strong>غير اللامعة</strong>، أو
              <strong>مزخرفة</strong>)، مما يضمن دمجها بسلاسة في أي
              <strong>نمط تصميم معماري</strong>. إن متطلبات الصيانة المنخفضة وجمالها
              الدائم يجعلها المفضلة لدى <strong>أصحاب المنازل</strong>، و<strong
                >المهندسين المعماريين</strong
              >
              و<strong>مصممي الديكور الداخلي</strong>. مع <strong>الكوارتز</strong>،
              أنت تختار <strong>سطحًا</strong> سيصمد أمام اختبار الزمن مع الحفاظ على
              أناقته ووظيفته.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 9">
          <div class="col-sm-12">
            <h3 class="header">ما هو حسب المنتجات؟</h3>
            <p class="description" style="text-align: justify">
              <strong>يضفي الحجر الطبيعي</strong> إحساسًا بالفخامة والجمال الخالد إلى
              أي <strong>أماكن معيشة</strong> مثل <strong>غرف المعيشة</strong>،
              و<strong>الحمامات</strong>، <strong> >المطابخ</strong> و<strong
                >الحدائق</strong
              >
              في <strong>مشاريعك التجارية</strong> و<strong>السكنية</strong>. سواء كنت
              تصمم مباني <strong>سكنية</strong> أو <strong>تجارية</strong>، فإن
              <strong>الحجر الطبيعي</strong> هو الخيار الأمثل لإنشاء جماليات متطورة في
              <strong>التصميمات المعمارية</strong>. توفر مواد مصنوعة بطبيعتها، مثل
              <strong>الحجر الجيري</strong> و<strong>الرخام</strong> و<strong
                >الحجر الجيري</strong
              >
              و<strong>الجرانيت</strong> متانة وأناقة وفريدة من نوعها. شخصية لأي
              <strong>زخرفة</strong>. تُعد كل قطعة من
              <strong>الحجر الطبيعي</strong> عملاً فنيًا فريدًا من نوعه، حيث تتميز
              بأنماط وعروق وأنسجة مميزة تضيف طابعًا رقيًا إلى
              <strong>ديكورك الداخلي</strong> <strong> قوي>المناطق الخارجية</strong>.
              يمكن نحت الصخور الحجرية الطبيعية لتصميم أماكنك
              <strong>الداخلية</strong> و<strong>الخارجية</strong> بأناقة. تعتبر
              المنتجات مثل <strong>السلالم</strong>، و<strong>القوالب</strong>،
              و<strong>الألواح</strong> و<strong>المدافئ</strong> مثالية
              <strong>لأصحاب المنازل</strong><strong>يبحث المصممون</strong> و<strong
                >البنائون</strong
              >
              الأقوياء عن حلول حجرية عالية الجودة للديكورات الداخلية الخاصة بهم.
              <strong>النوافير</strong>، و<strong>الدرابزينات</strong> و<strong
                >أواني الزهور</strong
              >
              هي <strong>خيارات أنيقة</strong> لرفع مستوى <strong>حدائقك</strong>،
              <strong>باحات</strong> و<strong>حمامات سباحة</strong> وشرفات ذات
              <strong>تصميم خارجي</strong> فاخر. سواء كنت تفضل الرقي
              <strong>المصقول</strong> الذي يتميز به <strong>الرخام</strong>، أو الدفء
              <strong>الريفي</strong> الذي يتميز به <strong>الحجر الجيري</strong> أو
              البساطة الحديثة التي يتميز بها <strong> الحجر الجيري</strong>، تتناسب
              منتجات الحجر الطبيعي مع مجموعة متنوعة من أنماط التصميم. سواء كنت ترغب في
              تحسين <strong>الديكورات الداخلية</strong> باستخدام
              <strong>القوالب</strong> المتطورة، أو إنشاء نقطة محورية مريحة باستخدام
              <strong>المدافئ</strong> الحجرية المخصصة، أو تحويل المساحات الخارجية
              باستخدام <strong>النوافير</strong> المذهلة ، تجمع منتجاتنا
              <strong>الأحجار الطبيعية</strong> بين الجمال والأداء الوظيفي.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 11">
          <div class="col-sm-12">
            <h3 class="header">ما هي مواد التثبيت؟</h3>
            <p class="description" style="text-align: justify">
              ابحث عن <strong>مواد تركيب</strong> عالية الجودة لمشروعات
              <strong>الحجر الطبيعي</strong> و<strong>البلاط</strong>، بما في ذلك
              <strong>المواد اللاصقة</strong>، و<strong>المواد المانعة للتسرب</strong
              >، و<strong>الجص</strong>. تضمن <strong>المواد اللاصقة</strong> المتميزة
              لدينا رابطة قوية ودائمة لجميع أنواع <strong>الحجر</strong> و<strong
                >أسطح البلاط</strong
              >، مما يجعلها مثالية <strong>للجدران</strong> و<strong>الأرضيات</strong>
              و<strong>التطبيقات الخارجية</strong>. قم بحماية استثمارك باستخدام
              <strong>مواد عزل الحجر</strong> المتقدمة التي تحمي من البقع والرطوبة
              والتآكل مع الحفاظ على الجمال الطبيعي <strong>للأسطح الحجرية</strong>.
              أكمل المظهر باستخدام <strong>الجص</strong> المتين والمطابق للألوان والذي
              يوفر <strong>لمسة نهائية مصقولة</strong> وأداء يدوم طويلاً. تم تصميم
              <strong>مواد التثبيت</strong> الخاصة بنا للتعامل مع التحديات الفريدة
              <strong>للحجر الطبيعي</strong>، مما يضمن الحصول على لمسة نهائية خالية من
              العيوب وتصمد أمام اختبار الزمن. اختر من بين مجموعة من المنتجات المصممة
              خصيصًا لتلبية احتياجاتك الخاصة، سواء كنت تتعامل مع الرخام أو الحجر
              الجيري أو <strong>الحجر الجيري</strong>. من خلال التطبيق السهل والنتائج
              الاحترافية، تعمل هذه المواد على تبسيط عملية <strong>تركيب</strong>
              <strong>بلاط الحجر الطبيعي</strong> لكل من الخبراء وعشاق الأعمال
              اليدوية. احصل على نتائج مذهلة ومتينة
              <strong>للديكور الداخلي</strong> و<strong>للديكور الخارجي</strong>
              باستخدام مواد موثوقة وفعالة.
            </p>
          </div>
        </div>
        <div class="row m-auto text-center" v-if="category_id == 18">
          <div class="col-sm-12">
            <h3 class="header">ما هو الجصي؟</h3>
            <p class="description" style="text-align: justify">
              <strong>الألواح الجصية</strong>، والمعروفة أيضًا باسم
              <strong>الجدران الجافة</strong> أو <strong>ألواح الجبس</strong>، هي
              <strong>مادة بناء</strong> خفيفة الوزن ومتعددة الاستخدامات تُستخدم
              لإنشاء <strong>مواد بناء </strong>
              <strong>سلسة. قوي>الجدران الداخلية</strong> و<strong>الأسقف</strong>.
              مصنوع من قلب الجبس المحصور بين طبقات من الورق المتين،
              <strong>اللوح الجصي</strong> معروف بسهولة تركيبه، وفعاليته من حيث
              التكلفة، وخصائصه المقاومة للحريق. وهو متوفر في مجموعة متنوعة من الأنواع،
              بما في ذلك الخيارات <strong>المقاومة للرطوبة</strong>، و<strong
                >المقاومة للحريق</strong
              >، و<strong>العازلة للصوت</strong>، مما يجعلها مناسبة لـ
              <strong> السكنية</strong>، و<strong>التجارية</strong>، و<strong
                >المشاريع الصناعية</strong
              >. بمجرد التثبيت، يمكن طلاؤه أو ورق الحائط أو البلاط ليتناسب مع الشكل
              الجمالي المطلوب. يتميز <strong>اللوح الجصي</strong> أيضًا بخفة الوزن،
              مما يجعل النقل والمناولة أسهل أثناء <strong>الإنشاء</strong>. يعد اللوح
              الجصي مفيدًا جدًا للمباني نظرًا لتعدد استخداماته وأدائه. إنه يوفر عزلًا
              <strong>حراريًا</strong> و<strong>صوتيًا</strong> ممتازًا، مما يعزز
              كفاءة استخدام الطاقة وتقليل الضوضاء داخل <strong>أماكن المعيشة</strong>.
              تضيف أشكالها <strong>المقاومة للحريق</strong> طبقة إضافية من الأمان،
              بينما تعتبر الألواح <strong>المقاومة للرطوبة</strong> مثالية
              <strong>للحمامات</strong> و<strong>للمطابخ</strong> وغيرها من المناطق
              الرطبة. علاوة على ذلك، فإن قدرة <strong>اللوح الجصي</strong> على القطع
              والتشكيل بسهولة تتيح <strong>تصميمات</strong> إبداعية، مما يجعلها مادة
              أساسية لمشاريع <strong>البناء</strong> و<strong
                >التجديدية الحديثة. </strong
              >.
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

/* --- Arapca --- */
.cat-intro {
  direction: rtl;
}

.cat-intro :deep(.description) {
  line-height: 2.1;
}
</style>
