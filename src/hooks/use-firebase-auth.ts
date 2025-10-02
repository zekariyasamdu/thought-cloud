"use client";
import {
  AuthContextType,
  AppUser,
} from "@/components/context-providers/auth-provider";
import { createUser } from "@/lib/db";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onIdTokenChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth, noteCollections } from "../../firebase";
import { useRouter } from "next/navigation";
import { getCurrentUserId } from "@/lib/utils/firebase";
import { addDoc } from "firebase/firestore";

export function useFirebaseAuth(): AuthContextType {
  const [user, setUser] = useState<AppUser | null | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleUser = async (
    rawUser: FirebaseUser | null | false
  ): Promise<AppUser | false> => {
    if (rawUser) {
      const formattedUser = await formatUser(rawUser);
      const { ...userWithoutToken } = formattedUser;
      await createUser(formattedUser.uid, userWithoutToken);

      setUser(formattedUser);
      setLoading(false);
      return formattedUser;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithGoogle = async (redirect?: string) => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      await handleUser(response.user);

      if (redirect) {
        router.push(redirect);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  async function signInWithEmailPassword(
    email: string,
    password: string,
    redirect?: string
  ) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await handleUser(response.user);
      if (redirect) {
        router.push(redirect);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const signout = async () => {
    try {
      await signOut(auth);
      await handleUser(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const createUserWithEmailPassword = async (
    email: string,
    password: string,
    redirect?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        await addDoc(noteCollections, {
          id: getCurrentUserId(),
        });

        if (redirect) {
          router.push(redirect);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    createUserWithEmailPassword,
    signInWithEmailPassword,
    signout,
  };
}

const formatUser = async (user: FirebaseUser): Promise<AppUser> => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0]?.providerId || "unknown",
    photoUrl: user.photoURL,
  };
};
