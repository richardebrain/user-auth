import { UserProps } from '@helpers/types';
import { auth, createUserProfileDocument } from '@utils/firebase';
import { loginUser } from '@utils/Redux/user/user.slice';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks';

import Header from './header';
import { deleteCookie, setCookie } from 'cookies-next';
import { cookiesKey } from '@helpers/methods';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
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

    }, [dispatch])


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