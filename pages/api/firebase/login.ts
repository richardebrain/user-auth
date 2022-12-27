// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {

  email: string,
  password: string
}
export default async function handler(
  req: NextApiRequest & { body: Data },
  res: NextApiResponse
) {
  try {

    const { email, password } = req.body
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        res.status(200).json({ data: user })
      })
      .catch((error) => {
        
        res.status(400).json({ data: error })
      }
      )
  }
  catch (error) {
    console.log(error);
  }

}
