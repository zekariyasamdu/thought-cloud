// db.ts

import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { getCurrentUserId } from "./utils/firebase";

interface UserData {
  email: string | null;
  name: string | null;
  provider: string;
  photoUrl: string | null;
}

export async function createUser(uid: string, data: UserData) {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { uid, ...data }, { merge: true });
    console.log("User data saved successfully:", uid);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
}

export function getPrivateNoteReferance(id: string) {
  const curr = getCurrentUserId();
  return doc(db, "users", curr, "private notes", `${id}`);
}

export function getSharedNoteReferance(id: string) {
  const curr = getCurrentUserId();
  return doc(db, "users", curr, "shared notes", `${id}`);
}

export function getCurrentPrivateCollection(id?: string) {
  const userId = id ? id : getCurrentUserId();
  return collection(db, "users", userId, "private notes");
}

export function getCurrentSharedCollection(id?: string) {
  const userId = id ? id : getCurrentUserId();
  return collection(db, "users", userId, "shared notes");
}
