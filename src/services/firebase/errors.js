const ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again in a moment.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/popup-blocked": "Google sign-in was blocked. Allow popups and try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/network-request-failed": "Network trouble — check your connection and try again.",
  "firestore/permission-denied": "You don't have permission to do that.",
  "firestore/unavailable": "Database is unavailable — please try again shortly.",
  "firestore/failed-precondition":
    "The database needs a matching index for this query — create it from the Firebase console, then retry.",
  "storage/unauthorized": "You don't have permission to upload that file.",
  "storage/canceled": "The upload was cancelled.",
  "storage/retry-limit-exceeded": "The upload failed — please try again.",
  "app/not-authorized": "This app is not authorized to use Firebase.",
  "unknown": "Something went wrong — please try again.",
};

const DEFAULT_MESSAGE = "Something went wrong — please try again.";

export class FirebaseError extends Error {
  constructor(message, code = "unknown") {
    super(message);
    this.name = "FirebaseError";
    this.code = code;
  }
}

export function toFriendlyError(error, fallback = DEFAULT_MESSAGE) {
  const code = error?.code ?? error?.name ?? "unknown";
  if (code && ERROR_MESSAGES[code]) {
    return new FirebaseError(ERROR_MESSAGES[code], code);
  }
  return new FirebaseError(
    typeof error?.message === "string" && error.message ? error.message : fallback,
    code
  );
}

/**
 * Development-only error logging so service failures are visible in the
 * console without leaking credentials. No-op in production builds.
 */
export function logError(context, error) {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${context}]`, error?.code ?? "", error?.message ?? error);
  }
}