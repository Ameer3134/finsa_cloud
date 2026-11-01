// Firebase in the BROWSER. Used only to check an email and password on the login and signup pages.
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

export const hasFirebaseClient = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);

export function getFirebaseAuth() {
  return getAuth(getApps().length ? getApp() : initializeApp(config));
}
