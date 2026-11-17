<template>
    <SharedFancybox :options="{ Carousel: { transition: 'slide' } }">
        <div class="product_photos">
            <template v-for="img of except_photo" :key="img.Id">
                <!-- Video Fancybox'a BAGLANMIYOR: lightbox'a giren bir mp4
                     yalnizca tiklayinca aciliyordu, izgarada ise bos kare
                     olarak duruyordu. Yerinde oynatici hem goruntuyu geri
                     getiriyor hem de ziyaretciyi sayfadan cikarmiyor. -->
                <div v-if="isVideoPath(img.imagePath)" class="product_photo product_photo--video">
                    <video :src="img.imagePath" controls playsinline preload="metadata"
                        :aria-label="img.name"></video>
                </div>
                <a v-else class="product_photo" :href="img.imagePath" data-fancybox="gallery" :aria-label="img.name">
                    <img :src="img.imagePath" :alt="img.name" loading="lazy" />
                    <span class="product_photo_zoom" aria-hidden="true">
                        <i class="bi-zoom-in"></i>
                    </span>
                </a>
            </template>
        </div>
    </SharedFancybox>
</template>
<script lang="ts" setup>
defineProps<{
    photos?: { imagePath: string; name: string }[];
    except_photo?: { Id: number; imagePath: string; name: string }[];
}>();
</script>
