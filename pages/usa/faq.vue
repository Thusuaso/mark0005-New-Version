<template>
  <div class="page-root">
    <h1 class="header mb-3">{{faq_header}}</h1>
    <div class="row m-auto text-center">
        <div class="col-sm-12">
            <div v-for="faq of faqs" :key="faq">
                <p class="faq_description fw-bold">? {{faq.question}}</p>
                <p class="faq_description">{{faq.answer}}</p>
                <hr/>
            </div>
            
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
    import { useStore } from '~/store/index';
    const store = useStore();
    const usa = store.getUsa;
    const faqs = usa.faq;
    const faq_header = usa.faq_header;
</script>