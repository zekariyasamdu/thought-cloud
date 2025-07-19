import "server-only";
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function formatPrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n");
}

function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApp(); 
  }

  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  const privateKeyFormatted = formatPrivateKey(params.privateKey);

  const certCredential = cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: privateKeyFormatted,
  });

  return initializeApp({
    credential: certCredential,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export const adminAuth = getAuth(initializeFirebaseAdmin());