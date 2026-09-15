<template>
    <div class="product_desc">
        <dl class="product_specs">
            <div class="product_spec">
                <dt>{{ code_header }}</dt>
                <dd>{{ code }}</dd>
            </div>
            <div class="product_spec">
                <dt>{{ stone_header }}</dt>
                <dd>{{ stone.toUpperCase() }}</dd>
            </div>
            <div class="product_spec">
                <dt>{{ country_header }}</dt>
                <dd>{{ country }}</dd>
            </div>
            <div class="product_spec">
                <dt>{{ variation_header }}</dt>
                <dd>{{ variation }}</dd>
            </div>
        </dl>

        <h3 class="product_desc_title">{{ desc_header }}</h3>
        <p class="product_desc_text">{{ desc }}</p>

        <template v-if="hashtags.length">
            <h3 class="product_desc_title">{{ hash_header }}</h3>
            <ul class="product_tags">
                <li v-for="tag in hashtags" :key="tag" class="product_tag">#{{ tag }}</li>
            </ul>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    desc: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stone: {
        type: String,
        required: true
    },
    code: {
        type:String,
        required:true
    },
    desc_header:{
        type:String,
        required:true
    },
    hash_header: {
        type:String,
        required:true
    },
    code_header: {
        type: String,
        required:true
    },
    stone_header: {
        type: String,
        required: true
    },
    country_header: {
        type: String,
        required: true
    },
    variation_header: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required:true
    },
    variation:{
        type: String,
        required:true
    }
});
const hashtags = computed(() =>
    props.hash.split('#').map(tag => tag.trim()).filter(Boolean)
);
</script>