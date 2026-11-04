<template>
    <div class="product_app">
        <ul class="product_app_list">
            <li v-for="app in application" :key="app.name" class="product_app_item"
                :class="`product_app_item--${statusOf(app.status)}`">
                <i class="product_app_icon" :class="iconOf(app.status)" aria-hidden="true"></i>
                <span class="product_app_name">{{ app.name }}</span>
                <span class="product_app_status">{{ app.status }}</span>
            </li>
        </ul>

        <template v-if="specification?.length">
            <h3 class="product_desc_title">{{ specification_header }}</h3>
            <ul class="product_app_specs">
                <li v-for="spe in specification" :key="spe?.name" class="product_app_spec">
                    <!-- Ikon cizili (Shared/FinishIcon): CDN'deki soluk raster
                         rozetlerin yerine. Taninmayan bir yuzey tipi gelirse
                         bilesen bos donuyor ve eski gorsel yedege dusuyor. -->
                    <span class="product_app_spec_icon">
                        <SharedFinishIcon :source="spe?.link" />
                        <img v-if="!known(spe?.link)" :src="spe?.link" :alt="spe?.name"
                             width="64" height="64" loading="lazy" />
                    </span>
                    <span>{{ spe?.name }}</span>
                </li>
            </ul>
        </template>

        <a v-if="test_report" class="product_app_report" :href="test_report" target="_blank" rel="noopener">
            <!-- Ikon cizili (Shared/ReportIcon). Onceden burada firmanin
                 logosu duruyordu; satirin ne oldugunu anlatmiyordu. -->
            <span class="product_app_report_mark">
                <SharedReportIcon />
            </span>
            <span class="product_app_report_label">{{ test_report_header }}</span>
            <i class="bi-filetype-pdf product_app_report_icon" aria-hidden="true"></i>
        </a>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    application?: { name: string; status: string }[];
    specification?: { name: string; link: string }[];
    specification_header?: string;
    test_report_header?: string;
    test_report?: string;
}>();

/* Durum metni assets/data/*.json icinde dile gore geliyor (YES/OUI/SI/DA/نعم).
   Taninmayan bir deger gelirse ikon gosterilmeyip sadece metin yazilir —
   yeni bir dil eklendiginde yanlis onay isareti cikmasin. */
/* Cizili ikonu olan yuzey tipleri (bkz. Shared/FinishIcon.vue). */
const FINISHES = ['honed', 'polished', 'brushed', 'sandblasted', 'bushhammered'];
const known = (link?: string) => {
    const file = String(link ?? '').split('/').pop()?.split('.')[0]?.toLowerCase().replace(/[^a-z]/g, '');
    return FINISHES.includes(file ?? '');
};

const POSITIVE = ['YES', 'OUI', 'SÍ', 'SI', 'ДА', 'نعم'];
const NEGATIVE = ['NO', 'NON', 'НЕТ', 'لا'];

const statusOf = (status?: string) => {
    const value = (status ?? '').trim().toUpperCase();
    if (POSITIVE.includes(value)) return 'yes';
    if (NEGATIVE.includes(value)) return 'no';
    return 'unknown';
};

const iconOf = (status?: string) => {
    const state = statusOf(status);
    if (state === 'yes') return 'bi-check-circle-fill';
    if (state === 'no') return 'bi-x-circle';
    return '';
};
</script>
