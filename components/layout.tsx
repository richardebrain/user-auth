import { useAppDispatch } from '@helpers/redux.hooks';
import { UserProps } from '@helpers/types';
import { auth, createUserProfileDocument } from '@utils/firebase';
import { LoginUserAction } from '@utils/Redux/actions';
import { loginUser } from '@utils/Redux/user/user.slice';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import react, { useEffect } from 'react';

import Header from './header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const unSubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
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
        <div className='h-[100vh]'>
            <Header />
            <main className='mx-auto w-[80%] mt-10'>
                {children}
            </main>

        </div>
    );
}

export default Layout;