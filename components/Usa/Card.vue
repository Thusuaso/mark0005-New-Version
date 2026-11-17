<template>
    <div class="customContainer">
        <div class="customElement">
            <a :href="link">
                <div class="card_title2" style="font-size:16px;">
                    {{ text }}
                </div>
                <img class="lazyload" :src="image" :alt="text" />
                <div class="card_title" style="font-size:16px;">
                    ${{ price }} / {{ stock }} sqft / {{ size }}
                </div>
            </a>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    }
});
const { link, image, text,price,stock,size } = props;
</script>
<style scoped>
.customContainer {
    width: 100%;
    height: 250px;
    margin: 0px auto;
    margin-bottom: 25px;
}

.customElement {
    width: 100%;
    height: 250px;
    position: relative;
}

.customElement .card_title {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 3px rgb(0, 0, 0);
    background-color: rgba(123, 122, 122, 0.5);
    font-size: 14px;
}
.customElement .card_title2 {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 3px rgb(0, 0, 0);
    background-color: rgba(123, 122, 122, 0.5);
    font-size: 16px;
}

.customElement img {
    width: 100%;
    height: 250px;
    object-fit: fill;
    box-shadow: 1px 1px 8px black;
    transition: all 1s ease-in-out;
}

.customElement img:hover {
    box-shadow: none;
}
</style>