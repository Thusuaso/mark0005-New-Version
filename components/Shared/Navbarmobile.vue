<template>
  <div
    class="nvm"
    :class="{ 'nvm--over': overlay, 'nvm--solid': !overlay }"
    v-if="selectedLang.status == 'en'"
  >
    <nav class="navbar nvm__nav">
      <div class="container-fluid nvm__shell">
        <div class="nvm__bar">
        <NuxtLink class="nvm__logo" :to="selectedLang.link" aria-label="Mekmar">
          <img
            class="logo_mekmar nvm__logo-img"
            :src="logoSrc"
            alt="mekmar-logo"
            width="600"
            height="110"
            fetchpriority="high"
            decoding="sync"
          />
        </NuxtLink>

        <div class="nvm__tools">
          <SharedAccountMenu />
          <SharedLangDropdown />
          <button
            class="navbar-toggler nvm__burger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
          </button>
        </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nvm__catalog" href="https://cdn.mekmarimage.com/category/catalog-2025.pdf" id="catalog_link_mobile" >CATALOG</a>
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
  <div
    class="nvm"
    :class="{ 'nvm--over': overlay, 'nvm--solid': !overlay }"
    v-if="selectedLang.status == 'fr'"
  >
    <nav class="navbar nvm__nav">
      <div class="container-fluid nvm__shell">
        <div class="nvm__bar">
        <NuxtLink class="nvm__logo" :to="selectedLang.link" aria-label="Mekmar">
          <img
            class="logo_mekmar nvm__logo-img"
            :src="logoSrc"
            alt="mekmar-logo"
            width="600"
            height="110"
            fetchpriority="high"
            decoding="sync"
          />
        </NuxtLink>

        <div class="nvm__tools">
          <SharedAccountMenu />
          <SharedLangDropdown />
          <button
            class="navbar-toggler nvm__burger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
          </button>
        </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nvm__catalog" href="/fr/catalog" id="catalog_link_mobile" >CATALOGUE</a>
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
  <div
    class="nvm"
    :class="{ 'nvm--over': overlay, 'nvm--solid': !overlay }"
    v-if="selectedLang.status == 'es'"
  >
    <nav class="navbar nvm__nav">
      <div class="container-fluid nvm__shell">
        <div class="nvm__bar">
        <NuxtLink class="nvm__logo" :to="selectedLang.link" aria-label="Mekmar">
          <img
            class="logo_mekmar nvm__logo-img"
            :src="logoSrc"
            alt="mekmar-logo"
            width="600"
            height="110"
            fetchpriority="high"
            decoding="sync"
          />
        </NuxtLink>

        <div class="nvm__tools">
          <SharedAccountMenu />
          <SharedLangDropdown />
          <button
            class="navbar-toggler nvm__burger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
          </button>
        </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nvm__catalog" href="/es/catalog" id="catalog_link_mobile" >CATALOGAR</a>
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
  <div
    class="nvm"
    :class="{ 'nvm--over': overlay, 'nvm--solid': !overlay }"
    v-if="selectedLang.status == 'ru'"
  >
    <nav class="navbar nvm__nav">
      <div class="container-fluid nvm__shell">
        <div class="nvm__bar">
        <NuxtLink class="nvm__logo" :to="selectedLang.link" aria-label="Mekmar">
          <img
            class="logo_mekmar nvm__logo-img"
            :src="logoSrc"
            alt="mekmar-logo"
            width="600"
            height="110"
            fetchpriority="high"
            decoding="sync"
          />
        </NuxtLink>

        <div class="nvm__tools">
          <SharedAccountMenu />
          <SharedLangDropdown />
          <button
            class="navbar-toggler nvm__burger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
          </button>
        </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nvm__catalog" href="/ru/catalog" id="catalog_link_mobile" >КАТАЛОГ</a>
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
  <div
    class="nvm"
    :class="{ 'nvm--over': overlay, 'nvm--solid': !overlay }"
    v-if="selectedLang.status == 'ar'"
  >
    <nav class="navbar nvm__nav">
      <div class="container-fluid nvm__shell">
        <div class="nvm__bar">
        <NuxtLink class="nvm__logo" :to="selectedLang.link" aria-label="Mekmar">
          <img
            class="logo_mekmar nvm__logo-img"
            :src="logoSrc"
            alt="mekmar-logo"
            width="600"
            height="110"
            fetchpriority="high"
            decoding="sync"
          />
        </NuxtLink>

        <div class="nvm__tools">
          <SharedAccountMenu />
          <SharedLangDropdown />
          <button
            class="navbar-toggler nvm__burger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
            <span class="nvm__burger-bar"></span>
          </button>
        </div>
        </div>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nvm__catalog" href="/ar/catalog" id="catalog_link_mobile" >كتالوج</a>
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
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useStore } from "~/store/index";
import { useHeroOverlay } from "~/composables/useHeroOverlay";
/* Navbar.vue ile ayni tek logo varligi. */
import logoSrc from "~/assets/image/mekmar-logo.webp";
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

/* --- Seffaf mod ---
   Masaustu Navbar.vue ile BIREBIR ayni mantik ve ayni paylasimli durum
   (useHeroOverlay): ana sayfada hero en ustteyken menu fotografin uzerine
   seffaf biniyor, hero menunun altina gectigi an krem zemine donuyor.
   Oncesinde mobilde her zaman opak krem bir serit vardi; beyaz zeminin
   uzerinde yikanmis duruyor ve hero'yu asagi itiyordu. */
const route = useRoute();
const HOME_PATHS = new Set(["", "/fr", "/es", "/ru", "/ar"]);
const isHome = computed(() => HOME_PATHS.has(route.path.replace(/\/+$/, "")));

const heroOverlay = useHeroOverlay();
/* SSR baslangici: ana sayfada hero en ustte, yani seffaf. Sunucudan gelen
   HTML de seffaf basliyor, hydration'da beyaz->seffaf sicramasi olmuyor. */
if (isHome.value) heroOverlay.value = true;
watch(isHome, (home) => {
  if (home) heroOverlay.value = true;
});

const overlay = computed(() => isHome.value && heroOverlay.value);

/* Arama girdisi ve onerileri SharedSearchBox icinde; burada sadece
   /usa altinda olup olmadigimizi gecmemiz yeterli. */
const router = useRouter();
const usa_link_status = computed(
  () => router.currentRoute.value.fullPath.split("/")[1] === "usa"
);
</script>
<style scoped>
/* --- Mobil ust menu ---
   Masaustu Navbar.vue ile ayni dil: krem cam zemin, ince alt cizgi, tek
   satir. Oncesinde logo / CATALOG / dil secici uc ayri satira dagiliyor,
   logo markanin kendi mavi-yesili ile duruyor ve CATALOG yanip sonuyordu. */
/* position: fixed — masaustundeki gibi. sticky oldugunda serit yer
   kapliyor ve hero'yu asagi itiyordu; fixed ile hero en ustten basliyor,
   menu uzerine biniyor. Ic sayfalarda app.vue ara boslugu koyuyor. */
.nvm {
  position: fixed;
  top: 0;
  inset-inline: 0;
  z-index: 99;
  transition:
    background-color 0.35s ease,
    border-color 0.35s ease,
    color 0.35s ease;
}

/* Hero uzerinde: fotograf gorunur kalsin diye zemin yok, arkasi
   bulaniklastiriliyor. Degerler Navbar.vue'daki .nv--over ile ayni. */
.nvm--over {
  background: rgba(28, 25, 23, 0.18);
  backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  border-bottom: 1px solid rgba(247, 243, 233, 0.12);
  color: var(--mk-cream);
}

/* Kaydirildiktan sonra / ic sayfalarda: krem zemin (.nv--solid ile ayni). */
.nvm--solid {
  background: rgba(247, 243, 233, 0.88);
  backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  -webkit-backdrop-filter: blur(var(--mk-blur-nav)) saturate(120%);
  border-bottom: 1px solid var(--mk-border);
  box-shadow: 0 1px 2px rgba(28, 25, 23, 0.04);
  color: var(--mk-ink);
}

/* Menu acikken zemin her halukarda krem olsun: seffaf modda panelin
   icindeki arama kutusu ve baglantilar fotografin uzerinde okunmuyordu. */
.nvm:has(.navbar-collapse.show) {
  background: rgba(247, 243, 233, 0.96);
  border-bottom-color: var(--mk-border);
  color: var(--mk-ink);
}

/* backdrop-filter yoksa saydam zemin metni okunmaz yapar. */
@supports not (backdrop-filter: blur(1px)) {
  .nvm--over {
    background: rgba(28, 25, 23, 0.55);
  }

  .nvm--solid {
    background: var(--mk-cream);
  }
}

.nvm__nav {
  padding: 0;
}

/* Kabuk blok akisinda: ust satir ile acilan panel ust uste iner.
   Panel .nvm__bar'in ICINDE kalirsa Bootstrap'in flex-basis:100% kurali
   nowrap satirda sikisip gorunmez oluyordu. */
.nvm__shell {
  display: block;
  padding: 0;
}

.nvm__bar {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.nvm__logo {
  flex: none;
  display: block;
  padding: 0;
  margin: 0;
}

/* Masaustundeki ile ayni islem (Navbar.vue .nv--solid .nv__logo-img):
   brightness(0) logoyu duz siyaha indiriyor, invert(0.11) --mk-ink
   tonuna cikariyor. Boylece markanin mavi-yesili temaya giriyor. */
.nvm__logo-img {
  display: block;
  width: auto;
  /* 320px'te sabit 30px logo (164px genislik) + araclar (166px) satira
     sigmiyordu; viewport'a bagli olarak 22-30px arasinda kaliyor. */
  height: clamp(1.375rem, 6.5vw, 1.875rem);
  max-width: 100%;
  margin: 0;
  transition: filter 0.35s ease;
}

/* Masaustundeki ile ayni: koyu zeminde krem, acik zeminde --mk-ink. */
.nvm--over .nvm__logo-img {
  filter: brightness(0) invert(0.96);
}

.nvm--solid .nvm__logo-img,
.nvm:has(.navbar-collapse.show) .nvm__logo-img {
  filter: brightness(0) invert(0.11);
}

.nvm__tools {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-inline-start: auto;
  color: inherit;
}

/* Bootstrap'in SVG ikonu yerine kendi cizgilerimiz: rengi currentColor
   oldugu icin temadan geliyor. */
.nvm__burger {
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 2.375rem;
  height: 2.375rem;
  padding: 0;
  border: 1px solid currentColor;
  border-radius: var(--mk-radius-pill);
  background: transparent;
  color: inherit;
  opacity: 0.85;
}

.nvm__burger:focus {
  box-shadow: none;
  outline: none;
}

.nvm__burger-bar {
  display: block;
  width: 1.125rem;
  height: 1.5px;
  margin-inline: auto;
  background: currentColor;
  border-radius: 2px;
}

/* Acilan panel: kenarlara yapismasin.

   max-height + overflow: menu `position: fixed` bir basligin icinde oldugu
   icin tasan kismina SAYFA KAYDIRILARAK ulasilamiyor. Yatay telefonda
   (380px yukseklik) panel 426px'e cikip son maddeler erisilemez hale
   geliyordu; artik panel kendi icinde kayiyor.
   dvh: mobil tarayicilarda adres cubugu acilip kapandikca degisen gercek
   yukseklik; desteklenmeyen yerde ustteki vh satiri gecerli kaliyor. */
.nvm .navbar-collapse {
  padding: 0 0.75rem 0.75rem;
  max-height: calc(100vh - var(--mk-header-h-mobile, 3.5rem));
  max-height: calc(100dvh - var(--mk-header-h-mobile, 3.5rem));
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* CATALOG artik ust cubukta degil, panelin basinda tam genislikte bir
   buton. Ust cubukta 390px'e logo + hesap + dil + hamburger ile birlikte
   sigmiyordu; yanip sonen animasyonu da kaldirildi. */
.nvm__catalog {
  display: block;
  margin: 0.75rem 0 0.5rem;
  padding: 0.6875rem 1rem;
  border-radius: var(--mk-radius-pill);
  background: var(--mk-ink);
  color: var(--mk-cream);
  font-family: var(--mk-ff-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
}

.nvm__catalog:hover,
.nvm__catalog:focus {
  color: var(--mk-cream);
  opacity: 0.88;
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
