// Import the functions you need from the SDKs you need
import { AddressProps, IProduct } from "@helpers/types";
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider, signInWithPopup, User} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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
export const db = getFirestore(app);
const users = collection(db, 'users');

export const createUserProfileDocument = async (userAuth: User, additionalData?: any) => {
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

export const updateUserProfileDisplayName = async (userAuth: User) => {
  if (!userAuth) return;
  const userRef = doc(users, `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (snapShot.exists()) {
    const { displayName } = userAuth;
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
export const updateName = async (userAuth: any, data: { firstName?: string, lastName?: string }) => {
  if (!userAuth) return;
  const userRef = doc(users, `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);
  if (snapShot.exists()) {
    const { firstName, lastName } = data;
    console.log(firstName, lastName, 'name')
    try {
      await updateDoc(userRef, {
        updatedAt: serverTimestamp(),
        firstName,
        lastName

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
  return signInWithPopup(auth, provider).then(
    (result) => {
      const credentials = GoogleAuthProvider.credentialFromResult(result);
      const { user } = result;
      return user;
    }
  ).catch((error) => {
    const { code, message, email, credential } = error;
    console.log(code, message, email, credential)
  })

}
const address = collection(db, 'address');
export const createUserAddress = async (userAuth: any, addressData?: AddressProps) => {
  if (!userAuth) return;
  // const addressRef = doc(address, `${userAuth.uid}`);
  const userAddressFol = collection(address, `/${userAuth.uid}/address`);
  const addressRef = doc(userAddressFol, addressData?.id!);
  // check if there is address

  const addressSnapshot = await getDocs(collection(db, 'address', `${userAuth.uid}/address`))
  if (addressSnapshot.size == 0) {
    // if empty create address and set isDefault to true
    const snapShot = await getDoc(addressRef);
    if (!snapShot.exists()) {
      const createdAt = new Date()
      try {
        await setDoc(addressRef, {
          createdAt,
          userId: userAuth.uid,
          isDefault: true,
          ...addressData,

        })
      }
      catch (error) {
        if (error instanceof Error)
          console.log('error creating  address', error?.message);
      }
    }

  } else {

    console.log(addressRef, 'doc')
    const snapShot = await getDoc(addressRef);
    if (!snapShot.exists()) {
      const createdAt = new Date()
      try {
        await setDoc(addressRef, {
          createdAt,
          userId: userAuth.uid,
          isDefault: false,
          ...addressData,

        })
      }
      catch (error) {
        if (error instanceof Error)
          console.log('error creating  address', error?.message);
      }
    }
  }
  return addressRef
}


export const updateUserAddress = async (userAuth: User, addressData?: AddressProps, addressId?: string) => {
  if (!userAuth) return;
  const userAddressFol = collection(address, `/${userAuth.uid}/address`);
  const addressRef = doc(userAddressFol, addressId);

  const snapShot = await getDoc(addressRef);
  if (snapShot.exists()) {
    try {
      await updateDoc(addressRef, {
        updatedAt: serverTimestamp(),
        ...addressData,

      })
    }
    catch (error) {
      if (error instanceof Error)
        console.log('error updating  address', error?.message);

    }
  }
  return addressRef

}

export const deleteUserAddressById = async (userAuth: User, item: AddressProps) => {
  if (!userAuth) return;
  const userAddressFol = collection(address, `/${userAuth.uid}/address`);
  const allAddress = await getDocs(userAddressFol)
  if (allAddress.size == 1) {
    console.log('cant delete')
    updateDoc(doc(userAddressFol, item.id), {
      isDefault: true
    })
    return
  }
  const addressRef = doc(userAddressFol, item.id);
  const snapShot = await getDoc(addressRef);
  if (snapShot.exists()) {
    try {
      await deleteDoc(addressRef)
    }
    catch (error) {
      if (error instanceof Error)
        console.log('error deleting  address', error?.message);
    }
  }
  return addressRef
}



export const setAsDefaultAddress = async (userAuth: User, addressData?: AddressProps) => {
  if (!userAuth) return;
  const userAddressFol = collection(address, `/${userAuth.uid}/address`);
  const addressSnapshot = await getDocs(userAddressFol)
  addressSnapshot.forEach(async (document) => {
    // check if there is an address with isDefault true
    // if there is set it to false
    // set the new address to true
    const isDefaultaddress = document.data().isDefault
    if (isDefaultaddress) {
      const addressRef = doc(userAddressFol, document.id);
      const snapShot = await getDoc(addressRef);
      if (snapShot.exists()) {
        try {
          await updateDoc(addressRef, {
            updatedAt: serverTimestamp(),
            isDefault: false,

          })
        }
        catch (error) {
          if (error instanceof Error)
            console.log('error updating  address', error?.message);
        }
      }
    }
    else {
      const addressRef = doc(userAddressFol, addressData?.id);
      const snapShot = await getDoc(addressRef);
      if (snapShot.exists()) {
        try {
          await updateDoc(addressRef, {
            updatedAt: serverTimestamp(),
            isDefault: true,

          })
        }
        catch (error) {
          if (error instanceof Error)
            console.log('error updating  address', error?.message);
        }
      }
    }

  })
  return addressSnapshot



}

export const addItemToCart = async (user: User, product: IProduct) => {
  if (!user) return;
  const cartRef = collection(users, `${user.uid}/cart`);
  const cartItemRef = doc(cartRef, `${product.title} ${product.id}`);
  const cartItemSnapshot = await getDoc(cartItemRef);
  if ((cartItemSnapshot).exists()) {
    const { quantity } = cartItemSnapshot.data();
    try {
      await updateDoc(cartItemRef, {
        updatedAt: serverTimestamp(),
        quantity: quantity + 1
      })
    } catch (error) {
      if (error instanceof Error)
        console.log('error updating cart', error?.message);
    }
  }
  else {
    try {
      await setDoc(cartItemRef, {

        product,
        quantity: 1,
        createdAt: serverTimestamp()
      })
    } catch (error) {
      if (error instanceof Error)
        console.log('error adding to cart', error?.message);
    }
  }

}

export const removeProductFromServer = async (user: User, product: IProduct) => {
  if (!user) return;
  const cartRef = collection(users, `${user.uid}/cart`);
  const cartItemRef = doc(cartRef, `${product.title} ${product.id}`);
  const cartItemSnapshot = await getDoc(cartItemRef);
  if ((cartItemSnapshot).exists()) {
    const { quantity } = cartItemSnapshot.data();
    if (quantity > 1) {
      try {
        await updateDoc(cartItemRef, {
          updatedAt: serverTimestamp(),
          quantity: quantity - 1
        })
      } catch (error) {
        if (error instanceof Error)
          console.log('error updating cart', error?.message);
      }
    }
    else {
      try {
        await deleteDoc(cartItemRef)
      } catch (error) {
        if (error instanceof Error)
          console.log('error deleting cart', error?.message);
      }
    }

  }
}

export const clearCart = async (user: User, product: IProduct) => {
  if (!user) return;
  const cartRef = collection(users, `${user.uid}/cart`);
  const cartItemRef = doc(cartRef, `${product.title} ${product.id}`);
  const cartItemSnapshot = await getDoc(cartItemRef);
  if ((cartItemSnapshot).exists()) {
    try {
      await deleteDoc(cartItemRef)
    } catch (error) {
      if (error instanceof Error)
        console.log('error deleting cart', error?.message);
    }
  }
}