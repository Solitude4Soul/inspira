"use client";

import { useAuth, useUser } from "@/firebase";
import { ADMIN_CREDENTIALS } from "@/lib/constants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect } from "react";

/**
 * An invisible component that ensures the admin user is signed into Firebase.
 * It runs on all admin pages and uses the hardcoded credentials to authenticate.
 * If the Firebase user doesn't exist, it creates it.
 */
export default function FirebaseSignIn() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    // Don't do anything if Firebase isn't ready, is loading, or user is already signed in.
    if (!auth || isUserLoading || user) {
      return;
    }

    // Using a unique email domain to ensure a clean user record and avoid credential conflicts.
    const email = `${ADMIN_CREDENTIALS.username}@inspira-v2-auth.com`;
    const password = ADMIN_CREDENTIALS.password;

    // Attempt to sign in with the admin credentials.
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      // If the user does not exist in Firebase Auth, create them.
      if (error.code === "auth/user-not-found") {
        createUserWithEmailAndPassword(auth, email, password).catch(
          (createError) => {
            console.error("Failed to create admin Firebase user:", createError);
          }
        );
      } else if (error.code === 'auth/invalid-credential') {
        // This case is serious. It means the user exists but the password is out of sync.
        // This can happen if the password was changed manually in the Firebase console.
        console.error(
            'CRITICAL ADMIN LOGIN ERROR: The password for the admin user is out of sync. ' +
            `Please go to the Firebase Authentication console, delete the user with the email '${email}', ` +
            'and then refresh this page. The application will automatically recreate the user with the correct credentials.'
        );
      }
       else {
        // Log other sign-in errors.
        console.error("Failed to sign in admin Firebase user:", error);
      }
    });
  }, [auth, user, isUserLoading]);

  return null; // This component does not render anything.
}
