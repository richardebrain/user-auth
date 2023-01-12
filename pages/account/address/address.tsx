import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import Button from '@components/Button'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import { auth, createUserAddress, db } from '@utils/firebase'
import { getDoc, collection, DocumentSnapshot, getDocs, } from 'firebase/firestore'
import { setAddress } from '@utils/Redux/address/address.slice'
import { AddressProps } from '@helpers/types'
import { GetServerSideProps } from 'next'

const Address = () => {
  const { address } = useAppSelector(state => state.address)
  const dispatch = useAppDispatch()
  useEffect(() => {
    // listen to address changes
    const unSubscribe = async () => {
      if (!auth?.currentUser?.uid) return
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
  }, [dispatch])
  console.log(address)
  // const getAdressCount = address.reduce((acc, curr) => {
  //   if (curr) {
  //     acc++
  //   }
  //   return acc
  // }, 0)

  return (
    <div className='flex flex-col items-center w-[90%] mx-auto font-kumbh'>
      <div className='flex '>
        {/* Address {getAdressCount} */}
      </div>
      <div className='flex flex-col w-full'>
        {address.map((item) => (
          <div key={item.id} className='flex flex-col w-full bg-white rounded-md p-4 mb-4'>
            <div className='flex justify-between flex-col gap-4'>
              <div className='flex flex-col'>
                <div className=''>
                  <span className='font-bold '>{item.firstName} {item.lastName}</span>
                </div>
                <div className='text-sm'>{item.address}</div>
                <div className='text-sm'>{item.city}, {item.state}</div>
                <div className='text-sm'></div>
                <div className='text-sm mb-1'>{item.country}</div>
                <div className='text-sm'>{item.phone}</div>
              </div>
              <div className='flex justify-between'>
                <button>
                  DEFAULT
                </button>
                <button>
                  DELETE
                </button>
                <Link href={routes.CREATE_ADDRESS} >
                  EDIT
                </Link>
              </div>
            </div>
          </div>

        ))}


      </div>
      <div className='w-full flex justify-center bg-white'>
        <Link href={routes.CREATE_ADDRESS} className='bg-Orange w-full rounded-md h-12 text-white flex items-center justify-center hover:bg-orange-500'>
          ADD NEW ADDRESS
        </Link>
      </div>
    </div>
  )
}

export default Address

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context
  const { cookies } = req
  const { user } = cookies
  if (!user) {
    return {
      redirect: {
        destination: routes.SignIn,
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
