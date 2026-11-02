<template>
  <div class="page-root">
    <h1 class="header mb-3">{{header.toUpperCase()}}</h1>
    <div class="row m-auto text-center">
        <div class="col-sm-5">
            <SharedFancybox :options="{
        Carousel: {
            transition: 'slide'
        }
    }">
            <a class="fancybox ml-3 mb-3 col-sm-4" 
                data-fancybox="gallery" :href="first_photo">
                <div class="customContainer " style="height:450px;">
                    <div class="customElement" style="height:450px;">
                        <img class="lazyload" :src="first_photo" style="height:450px;" />


                    </div>
                </div>
            </a>
                        </SharedFancybox>
        </div>
        <div class="col-sm-7" style="margin-top:10px;">

            <div class="row text-center" style="margin-bottom:-10px;">
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.sku }}: </span><span>{{ detail.SkuNo }}</span></p>
                </div>
                <div class="col-sm-6">
                    <div class="border border-info bg-dark bg-gradient rounded text-light p-2">
                        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar" :style="{width:oran + '%'}">{{ oran }}%</div>
                        </div>
                    </div>

                </div> 

            </div>
            <div class="row  text-center" style="margin-bottom:-10px;">
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.sale_price }}: </span><span>${{ detail.Fiyat }}/sqft</span></p>
                </div>
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.in_stock }}: </span><span>{{ detail.Stok_Sqft }} {{ usa.available }}</span></p>
                </div>
            </div>
            <div class="row  text-center" style="margin-bottom:-10px;">
                <div class="col-sm-6" v-if="detail.Edge == '' || detail.Edge == null || detail.Edge == undefined || detail.Edge == ' ' || detail.Edge== 'NULL'">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.surface }}: </span><span>{{ detail.Surface }}</span></p>

                </div>

                <div class="col-sm-6" v-else>
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.surface }}: </span><span>{{ detail.Surface }} & {{ detail.Edge }}</span></p>

                </div>
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.size }}: </span><span>{{ detail.Size }}</span></p>

                </div>

            </div>
            <div class="row  text-center" style="margin-bottom:-10px;">
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.per_box }}: </span><span>{{ detail.box_detail }}</span></p>
                </div>
                <div class="col-sm-6">
                    <p class="border border-info bg-dark bg-gradient rounded text-light p-1"><span>{{ usa.per_crate }}: </span><span>{{ detail.crate_detail }}</span></p>

                </div>

            </div>
            <div class="header" style="font-weight: bold;font-size:14px;margin:0px;margin-top:2px;">
                {{ usa.description }}
            </div>
            <p class="description" style="font-size:14px;margin:0px;">
                {{ detail.description }}
            </p>
            <hr style="margin-top:7px;margin-bottom:7px;"/>
            <div class="header" style="font-weight: bold;font-size:14px;margin:0px;">
                {{ usa.delivery_terms }}
            </div>
            <p class="description" style="font-size:14px;margin:0px;">
                {{ usa.delivery_terms_desc }} 
            </p>
            <hr style="margin-top:7px;margin-bottom:7px;"/>
            <div class="header" style="font-weight: bold;font-size:14px;margin:0px;" v-if="detail.hashtags_es.length >0">
                HASTAGS
            </div>
                <p class="text-break description" style="font-size:14px;margin:0px;" v-if="detail.hashtags_es.length >0">
                    <a href="" class="text-decoration-none"  v-for="hash in detail.hashtags_es.trim().substring(0,detail.hashtags_es.length).split(',')"><strong>#{{ hash.trim() }}</strong></a>

                </p>

        </div>
    </div>
    <hr style="margin-top:25px;"/>
    <div class="row m-auto text-center">
        <SharedFancybox :options="{
        Carousel: {
            transition: 'slide'
        }
    }">
            <a class="fancybox ml-3 mb-3 col-sm-4" v-for="img of photos.splice(1)" :key="img.id" :href="img.image"
                data-fancybox="gallery">
                <div class="customContainer ">
                    <div class="customElement">
                        <img class="lazyload" :src="img.image" />


                    </div>
                </div>
            </a>
        </SharedFancybox>

    </div>
  </div>
</template>

<script setup lang="ts">
    import {useStore} from '~/store/index';
    import control from '~/lang/control';
    const store = useStore();
    const router = useRouter();
    let product = await $fetch('/api/usa/product/detail/' + router.currentRoute._value.params.id);
    let detail = control.lang_usa_detail_product(product.detail,store.getLang);
    let header = detail.name;
    let photos = product.photos;
    let usa = store.getUsa;
    let oran = parseInt((detail.Stok_Sqft/ detail.MaxStock) * 100);
    if(oran > 100){
        oran = 100;
    };
    const first_photo = photos[0].image;
</script>
<style scoped>
    strong {
        text-align: left;
        font-style: italic;
        padding:0px;
        margin-right:6px;
        /* white-space: pre;
        word-wrap: normal;
        resize: none;
        box-sizing: border-box; */
    } 
</style>