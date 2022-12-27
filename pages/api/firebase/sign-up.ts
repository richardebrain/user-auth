// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserCredential,updateProfile } from 'firebase/auth'

type Data = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
    confirmPassword: string
    username: string
}
export default async function handler(
    req: NextApiRequest & { body: Data },
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
               
                
                res.status(200).json({ data: user })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === 'auth/email-already-in-use') {
                    res.status(400).json({ data: errorCode })   
                }
            })
    }
    catch (error) {
        console.log(error);
    }
}
