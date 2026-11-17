import { searchProducts } from "~/server/utils/productSearch";

/* Sorgunun kendisi server/utils/productSearch.ts icinde: bes dilin ucu
   ayni sorguyu paylasiyor, aralarindaki tek fark aranan dil. */
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");
  return await searchProducts("es", name);
});
