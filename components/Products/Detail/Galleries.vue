<template>
    <div class="product_gallery">
        <Galleria v-model:activeIndex="active_index" :value="photos" :numVisible="5" :circular="true"
            :showItemNavigators="photos.length > 1" :showThumbnails="photos.length > 1"
            :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <!-- Video karede: tiklama buyutmeyi DEGIL oynatmayi acmali,
                     o yuzden buyutme dinleyicileri ve buyutec rozeti yalnizca
                     fotograflarda bagli. -->
                <div v-if="isVideoPath(slotProps.item.imagePath)" class="product_gallery_frame product_gallery_frame--video">
                    <video class="product_gallery_video" :src="slotProps.item.imagePath" controls playsinline
                        preload="metadata" :aria-label="slotProps.item.name"></video>
                    <span v-if="photos.length > 1" class="product_gallery_counter">
                        {{ active_index + 1 }} / {{ photos.length }}
                    </span>
                </div>
                <div v-else class="product_gallery_frame" role="button" tabindex="0" @click="imageClickVisible"
                    @keydown.enter="imageClickVisible" @keydown.space.prevent="imageClickVisible">
                    <img :src="slotProps.item.imagePath" :alt="slotProps.item.name" />
                    <span class="product_gallery_zoom" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round">
                            <circle cx="11" cy="11" r="7" />
                            <path d="M20 20l-4.3-4.3M11 8v6M8 11h6" />
                        </svg>
                    </span>
                    <span v-if="photos.length > 1" class="product_gallery_counter">
                        {{ active_index + 1 }} / {{ photos.length }}
                    </span>
                </div>
            </template>
            <template #thumbnail="slotProps">
                <!-- Kucuk resimde kontrol yok: serit zaten tiklanabilir, video
                     etiketi burada sadece ilk kareyi (preload="metadata")
                     gostermek icin duruyor. Uzerindeki ucgen, seritte hangi
                     karenin video oldugunu belli ediyor. -->
                <span v-if="isVideoPath(slotProps.item.imagePath)" class="product_gallery_thumb product_gallery_thumb--video">
                    <video :src="slotProps.item.imagePath" preload="metadata" muted playsinline tabindex="-1"></video>
                    <span class="product_gallery_thumb_play" aria-hidden="true"><i class="bi-play-fill"></i></span>
                </span>
                <img v-else class="product_gallery_thumb" :src="slotProps.item.imagePath" :alt="slotProps.item.name" />
            </template>
        </Galleria>

        <Galleria v-model:visible="image_click_visible" v-model:activeIndex="active_index" :value="photos"
            :responsiveOptions="responsiveOptions" :numVisible="7" :circular="true" :fullScreen="true"
            :showItemNavigators="photos.length > 1" :showThumbnails="photos.length > 1"
            containerClass="product_gallery_full">
            <template #item="slotProps">
                <video v-if="isVideoPath(slotProps.item.imagePath)" class="product_gallery_full_video"
                    :src="slotProps.item.imagePath" controls playsinline preload="metadata"
                    :aria-label="slotProps.item.name"></video>
                <img v-else :src="slotProps.item.imagePath" :alt="slotProps.item.name" />
            </template>
            <template #thumbnail="slotProps">
                <span v-if="isVideoPath(slotProps.item.imagePath)" class="product_gallery_thumb product_gallery_thumb--video">
                    <video :src="slotProps.item.imagePath" preload="metadata" muted playsinline tabindex="-1"></video>
                    <span class="product_gallery_thumb_play" aria-hidden="true"><i class="bi-play-fill"></i></span>
                </span>
                <img v-else class="product_gallery_thumb" :src="slotProps.item.imagePath" :alt="slotProps.item.name" />
            </template>
        </Galleria>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    photos: {
        type: Array,
        required: true
    }
});
const image_click_visible = ref(false);
const active_index = ref(0);
const responsiveOptions = ref([
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 4
    },
    {
        breakpoint: '560px',
        numVisible: 3
    }
]);
const imageClickVisible = () => {
    image_click_visible.value = true;
};
</script>
