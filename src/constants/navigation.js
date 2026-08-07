import siteConfig from "@/config/site";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About the Artist" },
  { href: "/originals", label: "Original Paintings" },
  { href: "/prints", label: "Prints" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export const CONTACT_OPTIONS = [
  "Buying an original painting",
  "Buying a print",
  "Commissioning a custom piece",
  "Press / collaboration",
  "Something else",
];

export const AUTH_MESSAGES = {
  login: {
    heading: "Log In",
    submit: "Log In",
    success: "Logged in (prototype)",
  },
  signup: {
    heading: "Sign Up",
    submit: "Create Account",
    success: "Account created (prototype)",
  },
};

export const CONTACT_SUCCESS_MESSAGE =
  "Message sent. B. Van Sanders' team will reply soon (prototype)";

export const CART = {
  empty: "Your cart is empty (prototype)",
  added: " added to inquiry (prototype)",
  summary: " in your cart (prototype)",
  maxCount: 99,
};

export const CHECKOUT = {
  empty: "Your cart is empty",
  emptyNote: "Add prints and originals from the catalog before checking out.",
  shipping: "Free insured shipping",
  note: "Prototype checkout — no payment is processed.",
  success: "Order placed — we'll be in touch (prototype)",
  successNote:
    "Thank you — your order has been received. Our team will contact you shortly to arrange shipping and payment.",
};

export { siteConfig };
export default NAV_LINKS;