import { formatstateOrCountry } from '@helpers/methods'
import { useAppDispatch } from '@helpers/redux.hooks'
import { routes } from '@helpers/routes'
import { AddressProps } from '@helpers/types'
import { deleteUserAddressById, auth, setAsDefaultAddress } from '@utils/firebase'
import { removeAddress, setAsDefault } from '@utils/Redux/address/address.slice'
import { User } from 'firebase/auth'
import Link from 'next/link'
import React, { useEffect } from 'react'
import EditIcon from '@public/images/edit.svg'
import DeleteIcon from '@public/images/trash.svg'

const AddressCard = ({ addressCard }: { addressCard: AddressProps }) => {



    const dispatch = useAppDispatch()

    const deleteAddress = async (item: AddressProps) => {
        confirm('Are you sure you want to delete this address?')

        dispatch(removeAddress(item))
        await deleteUserAddressById(auth.currentUser as User, item)

    }
    const handleDefault = async (item: AddressProps) => {
        dispatch(setAsDefault(item))
        await setAsDefaultAddress(auth.currentUser as User, item)



    }
    return (
        <div className={`flex flex-col  bg-white rounded-md  mb-4 border border-gray-300  `}>
            <div className={`flex justify-between flex-col gap-2 tracking-wide `}>
                <div className={`flex flex-col p-4 border-b ${addressCard.isDefault ? 'bg-orange-50 text-gray-700' : ''} gap-1 h-48`}>
                    <div className=''>
                        <span className='font-bold '>{addressCard.firstName} {addressCard.lastName}</span>
                    </div>
                    <div>
                        <div className='text-sm'>{addressCard.address}</div>
                        <div className='text-sm'>{addressCard.city}, {formatstateOrCountry(addressCard.state).name}</div>
                        <div className='text-sm'></div>
                        <div className='text-sm mb-1'>{formatstateOrCountry(addressCard.country).name}</div>

                    </div>
                    <div className='text-sm'>
                        {addressCard.phone} {addressCard.additionalPhoneNumber && `/ ${addressCard.additionalPhoneNumber}`}
                    </div>

                    <div className='mt-2'>
                        {
                            addressCard.isDefault && <div className='text-sm text-orange-500'>Default Address</div>
                        }
                    </div>
                </div>
                <div className='flex justify-between p-1'>
                    <button
                        onClick={() => handleDefault(addressCard)}
                        className={`${addressCard.isDefault ? ' cursor-default text-gray-300' : 'hover:text-orange-500  text-orange-400 hover:bg-orange-200  rounded-md'} h-10 px-2`}
                        disabled={addressCard.isDefault}
                    >
                        SET AS DEFAULT
                    </button>
                    <div className='flex gap-2'>

                        <button
                            onClick={() => deleteAddress(addressCard)} className='hover:text-orange-500 h-10 w-10  hover:bg-orange-200 rounded-full text-orange-400 flex items-center justify-center'
                        >
                            <DeleteIcon className='w-6 h-6' />
                        </button>
                        <Link
                            href={`${routes.MYACCOUNT}address/${addressCard.id}`} className='hover:bg-orange-200 rounded-full text-orange-400 h-10 w-10 flex items-center justify-center'
                        >
                            <EditIcon className='w-6 h-6' />
                        </Link>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default AddressCard