import { clsx, type ClassValue } from "clsx";
import { getAuth } from "firebase/auth";
import { doc, collection } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { db } from "../../firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentUserId() {
  const currentUserId = getAuth().currentUser?.uid;
  return currentUserId;
}

export function getCurrentUserEmail() {
  const currentUserEmail = getAuth().currentUser?.email;
  return currentUserEmail;
}

export function getPrivateNoteReferance(id: string) {
  const curr = getCurrentUserId()
  if (!curr) return undefined;
  return doc(db, "users", curr, "private notes", `${id}`); 
}

export function getSharedNoteReferance(id: string) {
  const curr = getCurrentUserId()
  if (!curr) return undefined;
  return doc(db, "users", curr, "shared notes", `${id}`); 
}

export function getCurrentPrivateCollection () {
  const userId = getCurrentUserId();
  if (!userId) return undefined;
  return collection(db, "users", userId, "private notes");
}

export function getCurrentSharedCollection () {
  const userId = getCurrentUserId();
  if (!userId) return undefined;
  return collection(db, "users", userId, "shared notes");
}
