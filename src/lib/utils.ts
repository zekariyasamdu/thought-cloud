import { clsx, type ClassValue } from "clsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import { auth, db } from "../../firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentUserId() {
  const currentUserId = getAuth().currentUser?.uid;
  if(!currentUserId) return '0';
  return currentUserId;
}

export async function getCurrentUserIdAsync(): Promise<string> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user ? user.uid : "0");
    });
  });
}

export function getCurrentUserEmail() {
  const currentUserEmail = getAuth().currentUser?.email;
  return currentUserEmail;
}

export function getPrivateNoteReferance(id: string) {
  const curr = getCurrentUserId()
  return doc(db, "users", curr, "private notes", `${id}`); 
}

export function getSharedNoteReferance(id: string) {
  const curr = getCurrentUserId()
  return doc(db, "users", curr, "shared notes", `${id}`); 
}

export function getCurrentPrivateCollection (id?:string) {
  const userId = id?  id : getCurrentUserId();
  return collection(db, "users", userId, "private notes");
}

export function getCurrentSharedCollection (id?:string) {
  const userId = id?  id : getCurrentUserId();
  return collection(db, "users", userId, "shared notes");
}
