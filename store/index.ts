import { defineStore } from "pinia";
import control from "~/lang/control";
import { ref } from "vue";
export const useStore = defineStore("store", {
  state: () => ({
    lang: "",
    navbar: {},
    navbar_links: {},
    categories: [],
    slides: {},
    footer: {},
    about: {},
    fabrication: {},
    videos: {},
    contact: {},
    projects: [],
    product: [],
    similar: [],
    application: [],
    project_detail: [],
    projects_header: "",
    projects_description: "",
    categories_detail: [],
    product_detail: [],
    login: {},
    auth_status: ref(false),
    toast: {},
    variation: {},
    loading: ref(false),
    specification: [],
    usa: {},
    search_products: [],
    search: "",
    search_link: "",
    projects_suggested_header: "",
    projects_ai_notice: "",
    usa_stock_main_menu: {},
    product_color_detail: [],
    filtered_header: {},
    usa_search: "",
    usa_search_link: "",
    breadcrumb: ref([]),
    now_breadcrumb: {},
    catalog: [],
    dialog_status: ref(true),
    disabled_send_category_button_status: ref(false),
    mobile: 0,
  }),
  getters: {
    getIfMobile(state) {
      return state.mobile;
    },
    getDisabledSendCategoryButtonStatus(state) {
      return state.disabled_send_category_button_status;
    },
    getLoginDialogStatus(state) {
      return state.dialog_status;
    },
    getNowBreadCrumb(state) {
      return state.now_breadcrumb;
    },
    getNavbar(state) {
      return state.navbar;
    },
    getNavbarLinks(state) {
      return state.navbar_links;
    },
    getCategories(state) {
      return state.categories;
    },
    getSlides(state) {
      return state.slides;
    },
    getFooter(state) {
      return state.footer;
    },
    getAbout(state) {
      return state.about;
    },
    getFabrication(state) {
      return state.fabrication;
    },
    getVideos(state) {
      return state.videos;
    },
    getContact(state) {
      return state.contact;
    },
    getProjects(state) {
      return state.projects;
    },
    getLang(state) {
      return state.lang;
    },
    getProjectDetail(state) {
      return state.project_detail;
    },
    getProjectHeader(state) {
      return state.projects_header;
    },
    getProjectDescription(state) {
      return state.projects_description;
    },
    getCategoriesDetail(state) {
      return state.categories_detail;
    },
    getProductDetail(state) {
      return state.product_detail;
    },
    getProduct(state) {
      return state.product;
    },
    getSimilar(state) {
      return state.similar;
    },
    getLogin(state) {
      return state.login;
    },
    getAuthStatus(state) {
      return state.auth_status;
    },
    getToast(state) {
      return state.toast;
    },
    getVariation(state) {
      return state.variation;
    },
    getLoading(state) {
      return state.loading;
    },
    getApplication(state) {
      return state.application;
    },
    getSpecification(state) {
      return state.specification;
    },
    getUsa(state) {
      return state.usa;
    },
    getSearchProducts(state) {
      return state.search_products;
    },
    getSearch(state) {
      return state.search;
    },
    getSearchLink(state) {
      return state.search_link;
    },
    getProjectsSuggestedHeader(state) {
      return state.projects_suggested_header;
    },
    getProjectAiNotice(state) {
      return state.projects_ai_notice;
    },
    getUsaStockMainMenu(state) {
      return state.usa_stock_main_menu;
    },
    getProductColor(state) {
      return state.product_color_detail;
    },
    getFilteredHeader(state) {
      return state.filtered_header;
    },
    getUsaSearch(state) {
      const data = {
        usa_search: state.usa_search,
        usa_search_link: state.usa_search_link,
      };
      return data;
    },
    getBreadcrumb(state) {
      return state.breadcrumb;
    },
    getCatalog(state) {
      return state.catalog;
    },
  },

  actions: {
    async nuxtServerInit({ commit }: any) {
      commit("getIfMobile", window.innerWidth);
    },

    setIfMobile(payload: any) {
      this.mobile = payload;
    },
    setDisabledSendCategoryButtonStatusFalse() {
      this.disabled_send_category_button_status = false;
    },
    setDisabledSendCategoryButtonStatus() {
      this.disabled_send_category_button_status = true;
    },
    setLoginDialogStatus(payload: any) {
      this.dialog_status = payload;
    },
    setNowBreadCrumb(payload: any) {
      this.now_breadcrumb = payload;
    },
    setBreadcrumb(payload: any) {
      this.breadcrumb.push(payload);
    },
    setResetBreadcrumb() {
      this.breadcrumb = [];
    },
    setMainStorage(payload: any) {
      this.navbar = payload.navbar;
      this.navbar_links = payload.navbar_link;
      this.categories = payload.categories;
      this.slides = payload.slides;
      this.footer = payload.footer;
      this.about = payload.about;
      this.fabrication = payload.fabrication;
      this.videos = payload.videos;
      this.contact = payload.contact;
      this.projects_header = payload.project.header;
      this.projects_description = payload.project.description;
      this.projects_suggested_header = payload.project.suggested;
      this.projects_ai_notice = payload.project.ai_notice ?? "";
      this.product = payload.product_detail;
      this.similar = payload.similar_products;
      this.login = payload.login;
      this.toast = payload.toast;
      this.variation = payload.variation;
      this.application = payload.application;
      this.specification = payload.specification;
      this.usa = payload.usa;
      this.search = payload.search;
      this.search_link = payload.search_link;
      this.usa_stock_main_menu = payload.usa_stock_main_menu;
      this.filtered_header = payload.filtered_header;
      this.usa_search = payload.usa_search;
      this.usa_search_link = payload.usa_search_link;
      this.catalog = payload.catalog;
    },
    setProjects(payload: any) {
      this.projects = control.lang_project(payload, this.lang);
    },
    setLang(payload: any) {
      this.lang = payload;
    },
    setProjectDetail(payload: any) {
      this.project_detail = payload;
    },
    setProjectDescription(payload: any) {
      this.projects_description = payload;
    },
    setCategoriesDetail(payload: any) {
      this.categories_detail = payload;
    },
    setProductDetail(payload: any) {
      this.product_detail = payload;
    },
    setAuthStatus(payload: any) {
      this.auth_status = payload;
    },
    setLoading(payload: any) {
      this.loading = payload;
    },
    setSearchProductList(payload: any) {
      this.search_products = payload;
    },
    setProductColorDetail(payload: any) {
      this.product_color_detail = payload;
    },
  },
});
