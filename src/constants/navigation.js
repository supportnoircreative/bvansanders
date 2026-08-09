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
    success: "Welcome back",
  },
  signup: {
    heading: "Sign Up",
    submit: "Create Account",
    success: "Account created — welcome",
  },
};

export const FORGOT_PASSWORD = {
  heading: "Reset your password",
  submit: "Send reset link",
  success:
    "If an account exists for that email, a reset link is on its way.",
  back: "Back to log in",
};

export const ACCOUNT_MESSAGES = {
  signedIn: "You are signed in",
  logout: "Log out",
  loginPrompt: "Log in to place your order",
  loginPromptNote:
    "Orders are attached to your account so you and the studio can track them.",
};

export const CONTACT_SUCCESS_MESSAGE =
  "Message sent. B. Van Sanders' team will reply soon (prototype)";

export const CART = {
  empty: "Your cart is empty",
  added: " added to cart",
  summary: " in your cart",
  maxCount: 99,
};

export const CHECKOUT = {
  empty: "Your cart is empty",
  emptyNote: "Add prints and originals from the catalog before checking out.",
  shipping: "Free insured shipping",
  note: "No payment is processed at checkout — our team will contact you to arrange payment and shipping.",
  success: "Order placed",
  successNote:
    "Thank you — your order has been received. Our team will contact you shortly to arrange shipping and payment.",
};

export { siteConfig };
export default NAV_LINKS;