/* Cikis: imzali oturum cerezini ve arayuz cerezini siler. */
export default defineEventHandler((event) => {
  endSession(event);
  return { ok: true };
});
