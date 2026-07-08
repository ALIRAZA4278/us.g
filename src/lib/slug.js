export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function paymentSlug(payment) {
  const serviceSlug = slugify(payment.service);
  const numeric = parseFloat(String(payment.charges).replace(/[^0-9.]/g, ""));
  const chargeDigits = Number.isFinite(numeric) ? String(Math.round(numeric)) : "";
  return chargeDigits ? `${serviceSlug}-${chargeDigits}` : serviceSlug;
}
