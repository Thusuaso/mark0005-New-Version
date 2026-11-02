<template>
  <div class="page-root">
  <p>Please enter your e-mail address for the catalog.</p>
  <div class="row">
    <div class="col-sm-6">
      <label for="exampleInputEmail1" class="form-label">{{
        contact.form.email
      }}</label>
      <InputText
        name="field"
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email"
        :invalid="!isRequiredMail(email)"
        @update:modelValue="mailControl($event)"
        @paste.prevent="onPaste"
      />
      <div id="emailHelp" class="form-text" v-if="!isRequiredMail(email)">
        {{ contact.form.field_2 }}
      </div>
      <div
        id="emailHelp"
        class="form-text"
        v-if="isRequiredMail(email)"
        style="height: 20px"
      ></div>
    </div>
    <div class="col-sm-6">
      <Button
        type="submit"
        class="btn btn-success w-100"
        @click="sendMail"
        style="margin-top: 32px"
      >
        {{ contact.form.send }}
      </Button>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/index";
const store = useStore();
let email = ref("");
const contact = store.getContact;
const { $toast } = useNuxtApp();
let button_status = ref(false);
let catalog_link = "https://cdn.mekmarimage.com/category/catalog-2025.pdf";
function isRequiredMail(value: any) {
  const val = value.split("@");
  if (val.length == 2) {
    return true;
  } else {
    return false;
  }
}
function mailControl(event: any) {
  if (
    event === "export@mekmar.com" ||
    event === "export1@mekmar.com" ||
    event === "export2@mekmar.com" ||
    event === "export@mekmar.co" ||
    event == "export1@mekmar.co" ||
    event == "export2@mekmar.co" ||
    event == "export@mekmar" ||
    event == "export1@mekmar" ||
    event == "export2@mekmar"
  ) {
    email.value = "";

    $toast.error("This email address is not allowed.");
  }
}
function onPaste(event: any) {
  $toast.error("Copy-paste is not allowed.");
  email.value = "";
}
function sendMail(event: any) {
  if (email.value === "" || email.value === null || email.value === undefined) {
    $toast.error("E-mail field cannot be empty.");
    return;
  } else if (
    email.value === "export@mekmar.com" ||
    email.value === "export1@mekmar.com" ||
    email.value === "export2@mekmar.com"
  ) {
    $toast.error("This email address is not allowed.");
    email = ref("");
    return;
  } else {
    useFetch("/api/sendCategory", {
      method: "POST",
      body: {
        email: email.value,
        link: "https://cdn.mekmarimage.com/category/catalog-2025.pdf",
      },
    });
    $toast.success("Mail Sent...");
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.slider {
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.slides {
  display: flex;

  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  /*
  scroll-snap-points-x: repeat(300px);
  scroll-snap-type: mandatory;
  */
}
.slides::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.slides::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
.slides::-webkit-scrollbar-track {
  background: transparent;
}
.slides > div {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 500px;
  height: 635px;
  margin-right: 50px;
  border-radius: 10px;
  background: #eee;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
.slides > div:target {
  /*   transform: scale(0.8); */
}
.author-info {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.75rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
}
.author-info a {
  color: white;
}
img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slider > a {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0 0.5rem 0;
  position: relative;
}
.slider > a:active {
  top: 1px;
}
.slider > a:focus {
  background: #000;
}

/* Don't need button navigation */
@supports (scroll-snap-type) {
  .slider > a {
    display: none;
  }
}

html,
body {
  height: 100%;
  overflow: hidden;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #74abe2, #5563de);
  font-family: var(--mk-ff-body);
}
</style>
