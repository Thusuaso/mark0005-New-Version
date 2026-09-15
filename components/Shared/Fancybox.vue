<script setup>
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
    options: Object,
})

/* Ayni sayfada birden fazla <SharedFancybox> olabilir (ornegin USA stok detayinda iki tane,
   ayni "gallery" grubunu paylasiyorlar). Baglamayi sayfa basina tek sefer yapiyoruz;
   aksi halde her gezinmede yeni bir baglanti ekleniyor, tiklayinca ust uste
   birden fazla galeri aciliyor ve defalarca kapatmak gerekiyordu. */
const SELECTOR = '[data-fancybox]'

/* Sayfa yuklenirken URL'deki #hash ile galerinin kendiliginden acilmasi
   sadece bu genel ayara bakiyor; bind() secenegi yetmiyor */
if (import.meta.client) NativeFancybox.defaults.Hash = false

onMounted(() => {
    const state = (window.__mkFancybox ??= { count: 0 })
    if (state.count === 0) {
        NativeFancybox.bind(SELECTOR, {
            // Adres cubugundaki #hash ile galerinin kendiliginden acilmasini engelle
            Hash: false,
            ...(props.options || {}),
        })
    }
    state.count++
})

onBeforeUnmount(() => {
    const state = window.__mkFancybox
    if (!state) return
    state.count = Math.max(0, state.count - 1)
    if (state.count === 0) {
        NativeFancybox.close(true)
        NativeFancybox.unbind(SELECTOR)
    }
})
</script>

<template>
    <slot />
</template>
