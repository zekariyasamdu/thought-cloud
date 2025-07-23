"use client"
import { useFirebaseAuth } from "@/hooks/use-firebase-auth";
import { createContext } from "react";

export interface AppUser {
    uid: string;
    email: string | null;
    name: string | null;
    provider: string;
    photoUrl: string | null;
}

export interface AuthContextType {
    user: AppUser | null | false;
    loading: boolean;
    signinWithGoogle: (redirect?: string) => Promise<void>;
    signInWithEmailPassword: (email: string,password: string, redirect?: string) => Promise<void>;
    createUserWithEmailPassword: (email: string,password: string, redirect?: string) => Promise<void>;
    signout: () => Promise<void>;
}


export const authContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const authInfo = useFirebaseAuth();
    return <authContext.Provider value={authInfo}>{children}</authContext.Provider>;
}
