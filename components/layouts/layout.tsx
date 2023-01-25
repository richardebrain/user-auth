import { AddressProps, UserProps } from '@helpers/types';
import { auth, createUserProfileDocument, db } from '@utils/firebase';
import { loginUser } from '@utils/Redux/user/user.slice';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks';

import Header from '../header';
import { setCookie } from 'cookies-next';
import { cookiesKey } from '@helpers/methods';
import { setAddress } from '@utils/Redux/address/address.slice';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch()
    const { user: { user }, address:{address} } = useAppSelector((state) => state)
    console.log(address)
    useEffect(() => {
        // listen to user changes
        if (user) return
        const unSubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                const token = await userAuth.getIdToken()
                setCookie(cookiesKey.user, token)
                if (!userRef) return
                const snapShot = await getDoc(userRef)
                if (!snapShot.exists()) return
                dispatch(
                    loginUser({
                        ...snapShot.data() as UserProps,
                        id: snapShot.id,
                    })
                )

            }
        })
        return () => {
            unSubscribeFromAuth()
        }

    }, [dispatch, user])

    useEffect(() => {
        // listen to address changes
        if (address.length > 0 ) return;
        const unSubscribe = async () => {
            if (!auth?.currentUser) return
            const addressSnapshot = await getDocs(collection(db, 'address', `${auth.currentUser.uid}/address`))
            addressSnapshot.forEach((doc) => {
                dispatch(setAddress({
                    ...doc.data() as AddressProps,
                    id: doc.id,
                }))
            })
        }
        return () => {
            unSubscribe()
        }
    }, [address.length, dispatch])


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