import { AddressProps, IProduct, UserProps } from '@helpers/types';
import { auth, createUserProfileDocument, db } from '@utils/firebase';
import { loginUser } from '@utils/Redux/user/user.slice';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks';

import Header from '../header';
import { setCookie } from 'cookies-next';
import { cookiesKey } from '@helpers/methods';
import { setAddressFromServer } from '@utils/Redux/address/address.slice';
import React from 'react';
import {  fetchFromServer } from '@utils/Redux/cart/cart.slice';
import { useRouter } from 'next/router';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user: { user }, address: { address } } = useAppSelector((state) => state)
    useEffect(() => {
        // listen to user changes
        if (user) return
        const unSubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                const token = await userAuth.getIdToken()
                setCookie(cookiesKey.user, token)
                if (!userRef) return
                // get cart item
                const cartRef = collection(db, 'users', `${userRef.id}/cart`)
                const cartSnapshot = await getDocs(cartRef)
                const cartItems: IProduct[] = cartSnapshot.docs.map((doc) => {
                    return {
                        quantity: doc.data().quantity,
                        ...doc.data().product,
                    }

                })
                const snapShot = await getDoc(userRef)
                if (!snapShot.exists()) return
                dispatch(
                    loginUser({
                        ...snapShot.data() as UserProps,
                        id: snapShot.id,
                    }),
                ),
                    dispatch(fetchFromServer(cartItems))


            }
        })
        return () => {
            unSubscribeFromAuth()
        }

    }, [dispatch, user])

    useEffect(() => {
        // listen to address changes
        if ( address.length > 0 && user) return
        const unSubscribe = async () => {
            if (!auth?.currentUser) return
            const addressSnapshot = await getDocs(collection(db, 'address', `${auth.currentUser.uid}/address`))
            const eachAddress = addressSnapshot.docs.map((doc) => doc.data()
            )
            dispatch(setAddressFromServer(eachAddress as AddressProps[]))
        }
        return () => {
            unSubscribe()
        }
    }, [address.length, dispatch,user])
   


    return (
        <div className='xs:h-[120vh] bg-gray-50'>
            <Header />
            <main className='w-full mx-auto xs:w-[70%] mt-10 '>
                {children}
            </main>

        </div>
    );
}

export default Layout;