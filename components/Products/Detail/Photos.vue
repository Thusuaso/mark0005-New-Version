<template>
    <SharedFancybox :options="{ Carousel: { transition: 'slide' } }">
        <div class="product_photos">
            <a v-for="img of except_photo" :key="img.Id" class="product_photo" :href="img.imagePath"
                data-fancybox="gallery" :aria-label="img.name">
                <img :src="img.imagePath" :alt="img.name" loading="lazy" />
                <span class="product_photo_zoom" aria-hidden="true">
                    <i class="bi-zoom-in"></i>
                </span>
            </a>
        </div>
    </SharedFancybox>
</template>
<script lang="ts" setup>
defineProps<{
    photos?: { imagePath: string; name: string }[];
    except_photo?: { Id: number; imagePath: string; name: string }[];
}>();
</script>
