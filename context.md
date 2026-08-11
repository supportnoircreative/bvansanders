# B. Van Sanders — Website Context

## 1. Overview

Official website for **B. Van Sanders**, an abstract/pop-art painter based in **Denver, Colorado** (tagline: "Pop culture, reimagined in bold acrylic."). The site is an artist storefront where visitors can:

- Browse **original acrylic paintings** and **giclée prints**
- View a **gallery** of studio work
- Read the **artist's story** (15+ years as a graphic/fashion designer, battled 30+ tumors, acrylic on canvas)
- **Inquire / commission** via a contact form
- Create an account, add pieces to a **cart**, and **check out** securely via Stripe
- Track their **orders**
- An **admin panel** lets the studio manage products and order statuses

## 2. Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4, shadcn/ui, `tw-animate-css`, `class-variance-authority`, `tailwind-merge` |
| Motion | framer-motion (Hero animations) |
| 3D | three + @react-three/fiber (installed, gallery usage) |
| Backend | Firebase (Auth, Firestore, Storage) |
| Payments | Stripe Checkout (server-side, secret key never in browser) |
| Email | Resend + @react-email/render templates |
| Icons | lucide-react |
| Fonts | Geist, Inter, Archivo Black (display), IBM Plex Mono (mono) |

## 3. Site Structure (Routes)

Public pages (`src/app/`):

| Route | File | Purpose |
|---|---|---|
| `/` | `page.jsx` | Hero + "Recently added" featured catalog |
| `/about` | `about/page.jsx` | Artist bio (AboutSection) |
| `/originals` | `originals/page.jsx` | Catalog of originals + commission banner |
| `/prints` | `prints/page.jsx` | Catalog of prints |
| `/gallery` | `gallery/page.jsx` | Studio gallery view |
| `/contact` | `contact/page.jsx` | Contact/commission form + contact info |
| `/product/[id]` | `product/[id]/page.jsx` | Product detail page |
| `/login` | `login/page.jsx` | Sign up / log in form |
| `/forgot-password` | `forgot-password/page.jsx` | Password reset form |
| `/checkout` | `checkout/page.jsx` | Checkout form (requires sign-in) |
| `/checkout/success` | `checkout/success/page.jsx` | Payment verification + confirmation |
| `/orders` | `orders/page.jsx` | Customer's orders (sign-in required) |
| `/admin` | `admin/page.jsx` | Studio console (admin only, noindex) |
| 404 | `not-found.jsx` | Not-found page |

API routes (`src/app/api/`):

| Route | Purpose |
|---|---|
| `POST /api/contact` | Submit contact/commission inquiry → emails to studio + auto-reply to customer |
| `POST /api/stripe/checkout` | Create Stripe Checkout session (server-verified) |
| `POST /api/stripe/session` | Verify session after return; confirms `paid` |

## 4. Data Model (Firestore)

Three collections (see `src/services/firebase/firestore.js` `COLLECTIONS`):

### `products/{productId}`
- Publicly readable; admin-writable only.
- Fields: `title`, `description`, `price`, `size`, `dimensions`, `kind` (`original` | `print` | `gallery`), `frameLabel`, `sold`, `isActive`, `featured`, `image`, `createdAt`, `updatedAt`.
- Medium/edition defaults by kind: prints = "Giclée on cotton paper" / "Signed & numbered"; originals = "Acrylic on canvas" / "One of one" (`src/constants/products.js`).

### `orders/{orderId}`
- Created by signed-in customers (must be `pending`/`pending` initially with `items` non-empty).
- Fields: `userId`, `customer {name, email, address, city, state, zip}`, `items[]` (snapshot of product data), `subtotal`, `shipping` (0), `total`, `paymentStatus` (`pending`/`paid`), `status` (`pending`/`processing`/`shipped`/`completed`), `stripeSessionId`, `createdAt`, `updatedAt`.
- Customers may flip `paymentStatus` pending → paid after Stripe payment; only admins can change `status` or delete.

### `users/{uid}`
- Created on registration (role defaults to `customer`). `role: "admin"` grants studio access; users cannot self-escalate (Firestore rules enforce).

### Seeded catalog (`src/data/products.js`)
6 originals + 6 matching prints (Static Bloom, Neon Overload, Corner Store Icon, After the Signal, Rerun Culture, Channel Bleed) with prices, sizes, sold flags, and descriptions. Used for static param generation of `/product/[id]` and as initial catalog.

## 5. Authentication & Roles

- **AuthService** (`src/services/authService.js`) is the single entry point: email/password register+login, Google login, logout, password reset — wrapped with friendly errors.
- **AuthContext / useAuth** provides `user`, `profile`, `loading`, `isAuthenticated`, `isAdmin` (via `UserService.hasAdminRole`), and all auth actions. Single `onAuthStateChanged` listener for the whole app.
- **Admin check** is UX-only; real enforcement lives in `firestore.rules` (`isAdmin()` reads `users/{uid}.role == 'admin'`; users can't change their own role).
- Cart/checkout requires sign-in ("Orders are attached to your account").

## 6. Cart & Checkout Flow

1. **Cart** (`CartContext`): localStorage-backed (`bvansanders.cart`) external store via `useSyncExternalStore`, cross-tab synced. Slide-out `CartDrawer`, add/remove/clear, count capped at 99.
2. **Checkout** (`CheckoutForm`): sign-in required → shipping/contact form → `OrderService.createOrder()` (creates pending order) → `StripeService.createCheckoutSession()` → redirect to Stripe.
3. **Stripe API routes** verify the Firebase ID token server-side (`verifyIdToken` via Identity Toolkit REST), re-check catalog prices from Firestore REST (`fetchProductsById`) so clients can't tamper, create session with metadata (`orderId`, `userId`) and free insured shipping, then return `{id, url}`.
4. **Success page** (`CheckoutSuccess`): verifies session via `/api/stripe/session` (session must belong to the user), clears cart, calls `OrderService.markOrderAsPaid()`. Handles pending/error/missing-session states.

## 7. Email System (Resend)

`EmailService` (server-only, `src/services/emailService.js`) with react-email template in `src/emails/`:

- **ContactInquiryEmail** — studio notification + customer auto-reply

Missing `RESEND_API_KEY` degrades gracefully (logs warning, skips send).

## 8. Admin Panel (`/admin`)

Gated by `AdminGate` (sign-in; then checks `isAdmin`). Tabs:

- **Products**: `ProductForm` to create/edit (title, description, price, kind, size, image upload to Firebase Storage, sold/featured flags), `AdminProductList` with edit/delete/toggle-featured.
- **Orders**: `AdminOrderList` — all orders, update status (fires status-update email).

## 9. Architecture

Layering (services never touch the UI; components never touch Firebase directly):

```
Components → Hooks (useProducts, useProduct, useOrders, useCart, useAuth, useToast)
           → Services (ProductService, OrderService, AuthService, UserService,
                       StripeService, ContactService, EmailService, api)
           → Firebase layer (src/services/firebase/{config,auth,firestore,storage,rest,errors})
```

- `src/services/firebase/rest.js` — REST-based Firestore/Identity Toolkit helpers used **only server-side** (no web SDK): `fetchProductMetadata`, `verifyIdToken`, `fetchProductsById`.
- `src/services/api.js` — small JSON fetch wrapper with `ApiError`.
- Firebase config requires `hasFirebaseConfig` (apiKey + projectId + appId); Firestore docs serialized with ISO `createdAt`/`updatedAt`.
- `src/data/*` — seeded content (products, about).
- `src/constants/*` — orders statuses, navigation links, cart/checkout copy, product medium/edition maps, colors, admin.
- Components organized under `layout/`, `navigation/`, `sections/`, `cards/`, `checkout/`, `cart/`, `admin/`, `orders/`, `forms/`, `buttons/`, `ui/`, `loaders/`, `shared/`.

## 10. Firebase Security Rules

`firestore.rules`:
- `users`: self read/create, self update only if `role` unchanged, admin full access.
- `products`: public read; admin-only write.
- `orders`: create by owner with initial pending state; read by owner or admin; update by owner only for pending→paid payment confirmation; status changes/delete admin-only.

## 11. Environment Variables (see `.env.example`)

```
# Public Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY / _AUTH_DOMAIN / _PROJECT_ID / _STORAGE_BUCKET / _MESSAGING_SENDER_ID / _APP_ID

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY

# Resend (server-only)
RESEND_API_KEY, RESEND_FROM_EMAIL, NEXT_PUBLIC_APP_URL

# Studio contact inbox
CONTACT_EMAIL=bvansanders@gmail.com
```

## 12. Scripts & Tooling

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` (eslint)
- Path alias `@/*` → `src/*` (`jsconfig.json`)
- Firebase deploy config in `firebase.json` (Firestore + Storage rules)
