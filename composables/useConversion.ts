// composables/useConversion.ts
const CONVERSIONS = {
  form: "AW-18344097723/MaotCIGF3p0dELvvkqtE",
} as const;

export function trackConversion(key: keyof typeof CONVERSIONS) {
  if (!import.meta.client || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: CONVERSIONS[key] });
  window.gtag("event", "generate_lead");
}
