<template>
  <div class="page-root">
  <h1 class="header mb-3">{{ about.header }}</h1>
  <div class="row m-auto text-center">
    <div class="col-sm-6">
      <h3 class="subheader">{{ about.title_1 }}</h3>
      <ul class="about-page-description">
        <li
          class="about-page-description"
          v-for="item in about.items_1"
          :key="item.id"
        >
          {{ item.value }}
        </li>
      </ul>
      <br />
      <h3 class="subheader">{{ about.title_2 }}</h3>
      <ul class="about-page-description">
        <li
          class="about-page-description"
          v-for="item in about.items_2"
          :key="item.id"
        >
          {{ item.value }}
        </li>
      </ul>
      <br />
      <ul class="d-flex justify-content-center list-unstyled">
        <li
          class="col-2"
          v-for="social of about.socials"
          style="list-style-type: none"
        >
          <a :href="social.link" target="_blank" style="color: #1357bc">
            <i :class="social.icon" class="text-decoration-none"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-sm-6">
      <figure class="image is-16by9">
        <iframe
          class="has-ratio"
          src="https://www.youtube.com/embed/PqEfhqwvU_U?si=hhee2ExHZMgIkhLp"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style="width: 100%; height: 450px"
        ></iframe>
      </figure>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "~/store/index";
const store = useStore();
const about = store.getAbout;
</script>
