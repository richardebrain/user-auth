// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@utils/firebase'
import { signOut } from 'firebase/auth'

import { deleteCookie } from 'cookies-next'
import { cookiesKey, Router } from '@helpers/methods'


type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        await signOut(auth).then(() => {
            deleteCookie(cookiesKey.token)

        })
    } catch (error) {
        res.status(500).json({ message: error?.message!! as string })
    }
}
