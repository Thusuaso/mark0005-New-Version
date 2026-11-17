<template>
  <div>
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-body">
          <button
            @click="closeModal"
            class="close-btn"
            aria-label="Kapat"
            style=""
          >
            &times;
          </button>
          <img
            src="~/public/image/banner-mobile.jpeg"
            :alt="BANNER_ALT"
            width="300"
            height="450"
            style="text-align: center; vertical-align: top; margin: 0px auto"
            @click="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* Banner tamamen YAZIDAN olusan bir gorsel: fuar adi, tarihi, salonu ve
   stant numarasi yalnizca piksellerde duruyor. Alt metin o yaziyi birebir
   tasiyor — gorsel inmezse ya da ekran okuyucu kullaniliyorsa bilgi baska
   hicbir yerde yazmiyor.

   NOT: Banner 24-27 Kasim 2025 tarihli, yani gecmis bir fuari duyuruyor.
   Guncellenince bu metin de guncellenmeli. */
const BANNER_ALT =
  "Visit us at The Big 5 Expo in Dubai, 24-27 November 2025, " +
  "Dubai World Trade Centre, Sheikh Rashid Hall A187";

let isModalOpen = ref(true);
let cookie = useCookie("modal_section_visible");

const closeModal = () => {
  isModalOpen.value = false;
  cookie.value = "false";
  sessionStorage.setItem("modal_section_visible", "false");

  // Modal kapandığında, olay dinleyicisini kaldır
};

// export default {
//   data() {
//     return {
//       // Modal'ın açık/kapalı durumunu tutan reaktif değişken
//       isModalOpen: true,
//     };
//   },
//   methods: {
//     openModal() {
//       this.isModalOpen = true;
//       // Modal açıldığında, ESC tuşunu dinlemeye başla
//       document.addEventListener("keydown", this.handleKeydown);
//     },

//     handleKeydown(event) {
//       // Basılan tuş "Escape" (Esc) ise modal'ı kapat
//       if (event.key === "Escape") {
//         this.closeModal();
//       }
//     },
//   },
//   // Bileşen sayfadan kaldırıldığında (Navigasyon veya koşullu render sonucu) temizlik yap
//   beforeDestroy() {
//     // Vue 2'de (Nuxt 2): beforeDestroy kullanılır.
//     // Olası hafıza sızıntısını önlemek için dinleyiciyi kaldır
//     document.removeEventListener("keydown", this.handleKeydown);
//   },
//   // Nuxt 3 (Vue 3) kullanıyorsanız, bunun yerine beforeUnmount kullanın.
//   /*
//   beforeUnmount() {
//      document.removeEventListener('keydown', this.handleKeydown);
//   }
//   */
// };
</script>

<style scoped>
/* Modal Arka Planı (Overlay) */
.modal-overlay {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Karartılmış, yarı saydam arka plan */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Sayfadaki diğer tüm öğelerin üzerinde olmasını sağlar */
  backdrop-filter: blur(2px); /* Hafif bulanıklık (Opsiyonel) */
}

/* Modal İçerik Kutusu */
.modal-content {
  background: white;
  border-radius: 10px;
  width: 300px;
  height: 450px;
  max-width: 300px;
  max-height: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: transform 0.3s ease-out; /* Animasyon için */
  transform: scale(1);
}

/* Modal Başlık Kısmı */
.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f7f7f7;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

/* Kapatma Butonu (X işareti) */
.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  color: #777;
  padding: 0;
  transition: color 0.2s;
  width: 45px;
  height: 45px;
  border-bottom-left-radius: 100%;
  border: 1px solid white;
  position: absolute;
  top: -10px;
  left: 90%;
  z-index: 1000000;
  background-color: black;
}

.close-btn:hover {
  opacity: 100%;
  color: white;
}

/* Modal İçerik ve Alt Kısım */
.modal-body {
  padding: 0px;
}

.modal-footer {
  padding: 10px 20px;
  border-top: 1px solid #eee;
  text-align: right;
}

.kapat-btn {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.kapat-btn:hover {
  background-color: #c82333;
}

/* Açma Butonu */
.open-btn {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 17px;
}
</style>
