<template>
  <div
    class="container row m-auto text-center"
    v-if="selectedLang.status == 'en'"
  >
    <div class="col-sm-3 fs-1 text-decoration-none fw-light">
      <NuxtLink
        class="text-decoration-none fw-light"
        :to="selectedLang.link"
        style="color: #1357bc"
      >
        <img
          class="logo_mekmar"
          src="https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
          alt="mekmar-logo"
          style="width: 300px; height: 42px"
        />
      </NuxtLink>
    </div>
    <div class="col-sm-9">
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary"
        style="padding-top: 0px"
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <a
            class="navbar-brand"
            href="https://cdn.mekmarimage.com/category/catalog-2025.pdf"
            id="catalog_link_mobile"
            >CATALOG</a
          >
          <SharedLangDropdown />

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SharedSearchBox
              :key="String(usa_link_status)"
              :usa="usa_link_status"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item custom_navbar_css_en">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_en"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.home"
                  >{{ navbar.home }}</NuxtLink
                >
              </li>

              <li
                class="nav-item dropdown custom_navbar_css_en"
                style="margin-right: 5px"
              >
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_en"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.product }}
                </a>

                <div class="dropdown-menu site_mega">
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.categories" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.colors" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.areas" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                </div>
              </li>
              <li class="nav-item dropdown custom_navbar_css_en">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_en"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.info }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.about"
                      >{{ navbar.about }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.faq"
                      >{{ navbar.faq }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.catalog"
                      target="_blank"
                      >{{ navbar.catalog }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item custom_navbar_css_en">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_en"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.fabrication"
                  >{{ navbar.fabrication }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_en">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_en"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.videos"
                  >{{ navbar.videos }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_en">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_en"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.project"
                  >{{ navbar.project }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_en">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_en"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.contact"
                  >{{ navbar.contact }}</NuxtLink
                >
              </li>
              <li class="nav-item dropdown custom_navbar_css_en">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_en"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.usa }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usastock"
                      >{{ navbar.usastock }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usaabout"
                      >{{ navbar.usaabout }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usacontact"
                      >{{ navbar.usacontact }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usafaq"
                      >{{ navbar.usafaq }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <!-- <SharedLangDropdown /> -->
              <!-- <Select
                v-model="selectedLang"
                :options="langs"
                optionLabel="name"
                class=""
                @change="changeLang($event)"
                dropdown
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value.name"
                      :src="slotProps.value.img"
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                      width="18px"
                      height="18px"
                    />
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <a :href="slotProps.option.link">
                    <img
                      :alt="slotProps.option.name"
                      :src="slotProps.option.img"
                      :class="`flag flag-${slotProps.option.code.toLowerCase()}`"
                      width="22px"
                      height="22px"
                    />
                  </a>
                </template>
              </Select> -->
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div
    class="container row m-auto text-center"
    v-if="selectedLang.status == 'fr'"
  >
    <div class="col-sm-3 fs-1 text-decoration-none fw-light">
      <NuxtLink
        class="text-decoration-none fw-light"
        :to="selectedLang.link"
        style="color: #1357bc"
      >
        <img
          class="logo_mekmar"
          src="https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
          alt="mekmar-logo"
          style="width: 300px; height: 42px"
        />
      </NuxtLink>
    </div>
    <div class="col-sm-9">
      <nav class="navbar navbar-expand-lg" style="padding-top: 0px">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/fr/catalog" id="catalog_link_mobile"
            >CATALOGUE</a
          >
          <SharedLangDropdown />
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SharedSearchBox
              :key="String(usa_link_status)"
              :usa="usa_link_status"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item custom_navbar_css_fr">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.home"
                  >{{ navbar.home }}</NuxtLink
                >
              </li>

              <li
                class="nav-item dropdown custom_navbar_css_fr"
                style="margin-right: 5px"
              >
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.product }}
                </a>

                <div class="dropdown-menu site_mega">
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.categories" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.colors" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.areas" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                </div>
              </li>
              <li class="nav-item dropdown custom_navbar_css_fr">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.info }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.about"
                      >{{ navbar.about }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.faq"
                      >{{ navbar.faq }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.catalog"
                      target="_blank"
                      >{{ navbar.catalog }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item custom_navbar_css_fr">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.fabrication"
                  >{{ navbar.fabrication }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_fr">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.videos"
                  >{{ navbar.videos }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_fr">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.project"
                  >{{ navbar.project }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_fr">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.contact"
                  >{{ navbar.contact }}</NuxtLink
                >
              </li>
              <li class="nav-item dropdown custom_navbar_css_fr">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_fr"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.usa }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usastock"
                      >{{ navbar.usastock }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usaabout"
                      >{{ navbar.usaabout }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usacontact"
                      >{{ navbar.usacontact }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usafaq"
                      >{{ navbar.usafaq }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <!-- <SharedLangDropdown /> -->

              <!-- <Select
                v-model="selectedLang"
                :options="langs"
                optionLabel="name"
                class="w-full md:w-50"
                @change="changeLang($event)"
                dropdown
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value.name"
                      :src="slotProps.value.img"
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                      width="18px"
                      height="18px"
                    />
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <a :href="slotProps.option.link" class="w-100">
                    <img
                      :alt="slotProps.option.name"
                      :src="slotProps.option.img"
                      :class="`flag flag-${slotProps.option.code.toLowerCase()}`"
                      width="22px"
                      height="22px"
                    />
                  </a>
                </template>
              </Select> -->
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div
    class="container row m-auto text-center"
    v-if="selectedLang.status == 'es'"
  >
    <div class="col-sm-3 fs-1 text-decoration-none fw-light">
      <NuxtLink
        class="text-decoration-none fw-light"
        :to="selectedLang.link"
        style="color: #1357bc"
      >
        <img
          class="logo_mekmar"
          src="https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
          alt="mekmar-logo"
          style="width: 300px; height: 42px"
        />
      </NuxtLink>
    </div>
    <div class="col-sm-9">
      <nav class="navbar navbar-expand-lg" style="padding-top: 0px">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/es/catalog" id="catalog_link_mobile"
            >CATALOGAR</a
          >
          <SharedLangDropdown />
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SharedSearchBox
              :key="String(usa_link_status)"
              :usa="usa_link_status"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item custom_navbar_css_es">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_es"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.home"
                  >{{ navbar.home }}</NuxtLink
                >
              </li>

              <li
                class="nav-item dropdown custom_navbar_css_es"
                style="margin-right: 5px"
              >
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_es"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.product }}
                </a>

                <div class="dropdown-menu site_mega">
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.categories" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.colors" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.areas" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                </div>
              </li>
              <li class="nav-item dropdown custom_navbar_css_es">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_es"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.info }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.about"
                      >{{ navbar.about }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.faq"
                      >{{ navbar.faq }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.catalog"
                      target="_blank"
                      >{{ navbar.catalog }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item custom_navbar_css_es">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_es"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.fabrication"
                  >{{ navbar.fabrication }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_es">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_es"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.videos"
                  >{{ navbar.videos }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_es">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_es"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.project"
                  >{{ navbar.project }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_es">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_es"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.contact"
                  >{{ navbar.contact }}</NuxtLink
                >
              </li>
              <li class="nav-item dropdown custom_navbar_css_es">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_es"
                  href="#"
                  style="font-weight: bold"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.usa }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usastock"
                      >{{ navbar.usastock }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usaabout"
                      >{{ navbar.usaabout }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usacontact"
                      >{{ navbar.usacontact }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usafaq"
                      >{{ navbar.usafaq }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <!-- <SharedLangDropdown /> -->

              <!-- <Select
                v-model="selectedLang"
                :options="langs"
                optionLabel="name"
                class="w-full md:w-50"
                @change="changeLang($event)"
                dropdown
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value.name"
                      :src="slotProps.value.img"
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                      width="18px"
                      height="18px"
                    />
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <a :href="slotProps.option.link" class="w-100">
                    <img
                      :alt="slotProps.option.name"
                      :src="slotProps.option.img"
                      :class="`flag flag-${slotProps.option.code.toLowerCase()}`"
                      width="22px"
                      height="22px"
                    />
                  </a>
                </template>
              </Select> -->
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div
    class="container row m-auto text-center"
    v-if="selectedLang.status == 'ru'"
  >
    <div class="col-sm-3 fs-1 text-decoration-none fw-light">
      <NuxtLink
        class="text-decoration-none fw-light"
        :to="selectedLang.link"
        style="color: #1357bc"
      >
        <img
          class="logo_mekmar"
          src="https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
          alt="mekmar-logo"
          style="width: 300px; height: 42px"
        />
      </NuxtLink>
    </div>
    <div class="col-sm-9">
      <nav class="navbar navbar-expand-lg" style="padding-top: 0px">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="/ru/catalog" id="catalog_link_mobile"
            >КАТАЛОГ</a
          >
          <SharedLangDropdown />
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SharedSearchBox
              :key="String(usa_link_status)"
              :usa="usa_link_status"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item custom_navbar_css_ru">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.home"
                  >{{ navbar.home }}</NuxtLink
                >
              </li>

              <li
                class="nav-item dropdown custom_navbar_css_ru"
                style="margin-right: 5px"
              >
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.product }}
                </a>

                <div class="dropdown-menu site_mega">
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.categories" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.colors" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.areas" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                </div>
              </li>
              <li class="nav-item dropdown custom_navbar_css_ru">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.info }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.about"
                      >{{ navbar.about }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.faq"
                      >{{ navbar.faq }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.catalog"
                      target="_blank"
                      >{{ navbar.catalog }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item custom_navbar_css_ru">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.fabrication"
                  >{{ navbar.fabrication }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ru">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.videos"
                  >{{ navbar.videos }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ru">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.project"
                  >{{ navbar.project }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ru">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ru"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.contact"
                  >{{ navbar.contact }}</NuxtLink
                >
              </li>
              <li class="nav-item dropdown custom_navbar_css_ru">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ru"
                  href="#"
                  style="font-weight: bold"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.usa }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usastock"
                      >{{ navbar.usastock }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usaabout"
                      >{{ navbar.usaabout }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usacontact"
                      >{{ navbar.usacontact }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usafaq"
                      >{{ navbar.usafaq }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <!-- <SharedLangDropdown /> -->

              <!-- <Select
                v-model="selectedLang"
                :options="langs"
                optionLabel="name"
                class="w-full md:w-50"
                @change="changeLang($event)"
                dropdown
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value.name"
                      :src="slotProps.value.img"
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                      width="18px"
                      height="18px"
                    />
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <a :href="slotProps.option.link" class="w-100">
                    <img
                      :alt="slotProps.option.name"
                      :src="slotProps.option.img"
                      :class="`flag flag-${slotProps.option.code.toLowerCase()}`"
                      width="22px"
                      height="22px"
                    />
                  </a>
                </template>
              </Select> -->
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div
    class="container row m-auto text-center"
    v-if="selectedLang.status == 'ar'"
  >
    <div class="col-sm-3 fs-1 text-decoration-none fw-light">
      <NuxtLink
        class="text-decoration-none fw-light"
        :to="selectedLang.link"
        style="color: #1357bc"
      >
        <img
          class="logo_mekmar"
          src="https://cdn.mekmarimage.com/logo/Mekmar-Logo-b%C3%BCy%C3%BCk-yaz%C4%B1l%C4%B1-01.webp"
          alt="mekmar-logo"
          style="width: 300px; height: 42px"
        />
      </NuxtLink>
    </div>
    <div class="col-sm-9">
      <nav class="navbar navbar-expand-lg" style="padding-top: 0px">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <a
            class="navbar-brand"
            href="/ar/catalog"
            id="catalog_link_mobile"
            style="font-size: 30px"
            >كتالوج</a
          >
          <SharedLangDropdown />
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SharedSearchBox
              :key="String(usa_link_status)"
              :usa="usa_link_status"
            />

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item custom_navbar_css_ar">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.home"
                  >{{ navbar.home }}</NuxtLink
                >
              </li>

              <li
                class="nav-item dropdown custom_navbar_css_ar"
                style="margin-right: 5px"
              >
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.product }}
                </a>

                <div class="dropdown-menu site_mega">
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.categories }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.categories" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.colors }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.colors" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                  <section class="site_mega_col">
                    <h3 class="site_mega_title">{{ navbar.areas }}</h3>
                    <ul>
                      <li v-for="item in navbar_link.areas" :key="item.id">
                        <NuxtLink class="site_mega_link" :to="item.link">{{ item.title }}</NuxtLink>
                      </li>
                    </ul>
                  </section>
                </div>
              </li>
              <li class="nav-item dropdown custom_navbar_css_ar">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.info }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.about"
                      >{{ navbar.about }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.faq"
                      >{{ navbar.faq }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      style="font-weight: bold"
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.catalog"
                      target="_blank"
                      >{{ navbar.catalog }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item custom_navbar_css_ar">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.fabrication"
                  >{{ navbar.fabrication }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ar">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.videos"
                  >{{ navbar.videos }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ar">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.project"
                  >{{ navbar.project }}</NuxtLink
                >
              </li>
              <li class="nav-item custom_navbar_css_ar">
                <NuxtLink
                  class="nav-link custom_navbar_css_font_ar"
                  style="font-weight: bold"
                  tag="a"
                  :to="navbar_link.contact"
                  >{{ navbar.contact }}</NuxtLink
                >
              </li>
              <li class="nav-item dropdown custom_navbar_css_ar">
                <a
                  class="nav-link dropdown-toggle custom_navbar_css_font_ar"
                  href="#"
                  style="font-weight: bold"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ navbar.usa }}
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usastock"
                      >{{ navbar.usastock }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usaabout"
                      >{{ navbar.usaabout }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usacontact"
                      >{{ navbar.usacontact }}</NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      class="dropdown-item"
                      tag="a"
                      :to="navbar_link.usafaq"
                      >{{ navbar.usafaq }}</NuxtLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <!-- <SharedLangDropdown /> -->

              <!-- <Select
                v-model="selectedLang"
                :options="langs"
                optionLabel="name"
                class="w-full md:w-50"
                @change="changeLang($event)"
                dropdown
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <img
                      :alt="slotProps.value.name"
                      :src="slotProps.value.img"
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                      width="18px"
                      height="18px"
                    />
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <a :href="slotProps.option.link" class="w-100">
                    <img
                      :alt="slotProps.option.name"
                      :src="slotProps.option.img"
                      :class="`flag flag-${slotProps.option.code.toLowerCase()}`"
                      width="22px"
                      height="22px"
                    />
                  </a>
                </template>
              </Select> -->
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "~/store/index";
const props = defineProps({
  navbar: {
    type: Object,
    required: true,
  },
  navbar_link: {
    type: Object,
    required: true,
  },
});
const { navbar, navbar_link } = props;
const langs = ref([
  {
    name: "English",
    link: "/",
    status: "en",
    img: "https://cdn.mekmarimage.com/logo/en-flag.png",
    code: "EN",
  },
  {
    name: "France",
    link: "/fr",
    status: "fr",
    img: "https://cdn.mekmarimage.com/logo/fr-flag.png",
    code: "FR",
  },
  {
    name: "Spanish",
    link: "/es",
    status: "es",
    img: "https://cdn.mekmarimage.com/logo/es-flag.png",
    code: "ES",
  },
  {
    name: "Russian",
    link: "/ru",
    status: "ru",
    img: "https://cdn.mekmarimage.com/logo/ru-flag.png",
    code: "RU",
  },
  {
    name: "Arabic",
    link: "/ar",
    status: "ar",
    img: "https://cdn.mekmarimage.com/logo/ar-logo.png",
    code: "AR",
  },
]);
const store = useStore();
let selectedLang = ref();
langs.value.forEach((x) => {
  if (x.status == store.getLang) {
    selectedLang = ref(x);
  }
});

/* Arama girdisi ve onerileri SharedSearchBox icinde; burada sadece
   /usa altinda olup olmadigimizi gecmemiz yeterli. */
const router = useRouter();
const usa_link_status = computed(
  () => router.currentRoute.value.fullPath.split("/")[1] === "usa"
);
</script>
<style scoped>
@font-face {
  font-family: "Myriad Pro Bold Condensed";
  src: url("../../assets/font/Myriad_Pro_Bold_Condensed.ttf") format("truetype");
}
#catalog_link_mobile {
  font-weight: bold;
  font-family: "Myriad Pro Bold Condensed", sans-serif;
  font-size: 34px;
  margin: 0px auto;
  text-align: center;
  color: #101075;
  animation: card_title_color_change 0.8s infinite alternate-reverse;
}
@keyframes card_title_color_change {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.8;
  }
}
* {
  font-size: 1vw;
}
.search_custom {
  margin-right: 5px;
  width: 10%;
}

@media screen and (max-width: 576px) {
  * {
    font-size: 16px;
  }
  .search_custom {
    width: 60%;
  }
}
.custom_navbar_css_en {
  margin-left: 10px;
}
.custom_navbar_css_font_en {
  font-size: 14px;
}

.custom_navbar_css_fr {
  margin-left: 4px;
}
.custom_navbar_css_font_fr {
  font-size: 13px;
}

.custom_navbar_css_es {
  margin-left: 2px;
}
.custom_navbar_css_font_es {
  font-size: 13px;
}
.custom_navbar_css_ru {
  margin-left: 0px;
}
.custom_navbar_css_font_ru {
  font-size: 13px;
}

.custom_navbar_css_ar {
  margin-left: 26px;
}
.custom_navbar_css_font_ar {
  font-size: 16px;
}
</style>
