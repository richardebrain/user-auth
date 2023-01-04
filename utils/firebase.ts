// Import the functions you need from the SDKs you need
import { cookiesKey } from "@helpers/methods";
import { UserProps, UserSnapSot } from "@helpers/types";
import { setCookie } from "cookies-next";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential, UserInfo, UserMetadata } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const users = collection(db, 'users');

export const createUserProfileDocument = async (userAuth: any, additionalData?: any) => {
  if (!userAuth) return;

  // setCookie(cookiesKey.user, userAuth.accessToken)
  const userRef = doc(users, `${userAuth.uid}`);

  const snapShot = await getDoc(userRef);
  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        // firstName,
        // lastName,
        email,
        createdAt,
        ...additionalData

      })
    } catch (error) {
      if (error instanceof Error)
        console.log('error creating user', error?.message);
    }
  }

  return userRef
}

export const updateUserProfileDisplayName = async (userAuth: any) => {
  if (!userAuth) return;
  const userRef = doc(users, `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (snapShot.exists()) {
    const { displayName } = userAuth;
    const updatedAt = new Date()
    console.log(displayName, 'displayName')
    try {
      await updateDoc(userRef, {
        updatedAt: serverTimestamp(),
        displayName

      })
    } catch (error) {
      if (error instanceof Error)
        console.log('error updating user', error?.message);
    }
    return userRef;
  }
}
export const updateUserProfileEmail = async (userAuth: any) => {
  if (!userAuth) return;
  const userRef = doc(users, `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (snapShot.exists()) {
    const { email } = userAuth;
  
    console.log(email, 'email')
    try {
      await updateDoc(userRef, {
        updatedAt: serverTimestamp(),
        email

      })
    } catch (error) {
      if (error instanceof Error)
        console.log('error updating user', error?.message);
    }
    return userRef;
  }
}

const provider = new GoogleAuthProvider();
export const googleSignIn = () => {
  signInWithPopup(auth, provider).then(
    (result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      console.log(credentials)
      const { user } = result;

      return user;
    }
  ).catch((error) => {
    const { code, message, email, credential } = error;
    console.log(code, message, email, credential)
  })
}
