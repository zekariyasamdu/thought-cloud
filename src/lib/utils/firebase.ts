import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

export function getCurrentUserId() {
  const currentUserId = getAuth().currentUser?.uid;
  if (!currentUserId) return "0";
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
