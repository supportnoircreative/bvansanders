import {
  collection,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export const COLLECTIONS = {
  PRODUCTS: "products",
  ORDERS: "orders",
  USERS: "users",
};

export const productsCollection = collection(db, COLLECTIONS.PRODUCTS);
export const ordersCollection = collection(db, COLLECTIONS.ORDERS);
export const usersCollection = collection(db, COLLECTIONS.USERS);

export const productRef = (productId) => doc(db, COLLECTIONS.PRODUCTS, productId);
export const orderRef = (orderId) => doc(db, COLLECTIONS.ORDERS, orderId);
export const userRef = (userId) => doc(db, COLLECTIONS.USERS, userId);

export function serverTimestampValue() {
  return serverTimestamp();
}

export function withTimestamps(data, { create = true } = {}) {
  return create
    ? { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }
    : { ...data, updatedAt: serverTimestamp() };
}

export function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return value;
}

export function toSerializable(doc) {
  const data = doc.data();
  if (!data) return null;
  return {
    id: doc.id,
    ...data,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getDocument(ref) {
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? toSerializable(snapshot) : null;
}

export async function getDocuments(
  collectionRef,
  { orderByField = null, direction = "desc", whereField = null, whereValue = null } = {}
) {
  let q = query(collectionRef);
  if (whereField != null) q = query(q, where(whereField, "==", whereValue));
  if (orderByField != null) q = query(q, orderBy(orderByField, direction));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(toSerializable);
}

export async function createDocument(collectionRef, data) {
  const snapshot = await addDoc(collectionRef, withTimestamps(data));
  return getDocument(snapshot);
}

export async function setDocument(ref, data, { merge = false } = {}) {
  await setDoc(ref, withTimestamps(data, { create: merge }), merge ? { merge: true } : undefined);
  return getDocument(ref);
}

export async function updateDocument(ref, data) {
  await updateDoc(ref, withTimestamps(data, { create: false }));
  return getDocument(ref);
}

export async function deleteDocument(ref) {
  await deleteDoc(ref);
}

/**
 * Sort serialized documents newest-first by `createdAt` (ISO strings or
 * Date instances). Used when a query filters but does not order by
 * created time, avoiding composite-index requirements.
 */
export function sortByNewest(documents) {
  return [...documents].sort(
    (a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0)
      - (a.createdAt ? new Date(a.createdAt).getTime() : 0)
  );
}