import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import app, { googleProvider } from "./firebase";

const auth = getAuth(app);

export async function firebaseGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
}

export function firebaseLogout() {
  return signOut(auth);
}
