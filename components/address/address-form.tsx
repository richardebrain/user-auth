import React, { ReactHTML, ReactHTMLElement, useEffect, useState } from 'react'
import CustomInput from '@components/forms/input'
import { useForm } from 'react-hook-form'
import { AddressProps, AddressStateProps } from '@helpers/types'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomDropdown from '@components/forms/dropdown'
import { Country, State, City } from 'country-state-city'
import Button from '@components/shared/Button'
import { formatValue } from '@helpers/methods'
import { auth, createUserAddress, updateUserAddress } from '@utils/firebase'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { toast } from 'react-toastify'
import { editAddress, setAddress } from '@utils/Redux/address/address.slice'
import { v4 as uuidv4 } from 'uuid'

type CountryProps = {
    name: string,
    code?: string
}
const AddressForm = () => {

    const id = uuidv4()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { address } = useAppSelector(state => state.address)
    const slug = router.query.slug
    const getAddressToEdit = address.find(item => item.id === slug)

    const addressSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string(),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        phone: Yup.string().required('Phone is required'),
        additionalPhoneNumber: Yup.string(),

    })
    const { register, handleSubmit, reset, getValues, watch, formState: { errors, isSubmitting } } = useForm<AddressProps>({
        resolver: yupResolver(addressSchema)
    })
    useEffect(() => {
        if (getAddressToEdit) {
            reset(getAddressToEdit)
        }
    }, [getAddressToEdit, reset])


    useEffect(() => {
        // cause component to re-render when country / state  gets updated
        watch(['country', 'state'])

    }, [watch])

    const mappedCountries = Country.getAllCountries().map(
        (country) => {
            return {
                name: country.name,
                code: country.isoCode
            }
        }
    )

    const countryValue = formatValue(getValues('country'))
    const stateValue = formatValue(getValues('state'))
    const cityValue = getValues('city')
    const mappedStates = State.getStatesOfCountry(countryValue.code).map(
        (state) => {
            return {
                name: state.name,
                code: state.isoCode
            }
        }
    )
    const mappedCities = City.getCitiesOfState(countryValue.code, stateValue.code).map(
        (city) => {
            return {
                name: city.name,
            }
        }
    )
    const handleFormSubmit = async (data: AddressProps) => {
        if (getAddressToEdit) {
            updateUserAddress(auth?.currentUser!, data, getAddressToEdit.id)
            dispatch(editAddress(data))
            toast.success('Address Updated Successfully', {
                toastId: 'addressUpdated'
            })
            router.back()
        } else {

            await createUserAddress(auth?.currentUser, { ...data, id: id }).then((res) => {
                dispatch(setAddress({ ...data, id: id }))
                toast.success('Address Added Successfully', {
                    toastId: 'addressAdded'
                })

                reset()
                router.back()

            })
        }

    }
    return (
        <div className=' flex items-center flex-col mx-auto w-[90%] xs:w-full xs:px-4'>
            <form className='flex flex-col w-full gap-5 xs:grid grid-cols-2 xs:flex-wrap ' onSubmit={handleSubmit(handleFormSubmit)} >
                <div className='flex flex-col w-full'>
                    <CustomInput
                        label='First Name'
                        name='firstName'
                        type='text'
                        placeholder='First Name'
                        required
                        register={register}
                        error={errors.firstName?.message}

                    />
                </div>
                <div className='flex flex-col w-full '>
                    <CustomInput
                        label='Last Name'
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        required
                        register={register}
                        error={errors.lastName?.message}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <CustomInput
                        label='Phone Number'
                        name='phone'
                        type='tel'
                        placeholder='Phone Number'
                        required
                        register={register}
                        error={errors.phone?.message}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <CustomInput
                        label='Additional Phone Number'
                        name='additionalPhoneNumber'
                        type='tel'
                        placeholder='Enter your Additional Phone Number'
                        required={false}
                        register={register}
                        error={errors.phone?.message}
                    />
                </div>
                <div className='flex flex-col w-full xs:col-span-2'>
                    <CustomInput
                        label='Delivery Address'
                        name='address'
                        type='text'
                        placeholder='Enter Your Address'
                        required
                        register={register}
                        error={errors.address?.message}
                    />
                </div>
                <div className='flex flex-col w-full xs:col-span-2'>
                    <CustomInput
                        label='Additional Information'
                        name='AdditionalInformation'
                        type='text'
                        placeholder='Enter Additional Information'
                        required={false}
                        register={register}
                        error={errors.additionalInfo?.message}
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <CustomDropdown
                        label='Country'
                        name='country'
                        required
                        register={register}
                        error={errors.country?.message}
                        options={mappedCountries}
                        placeholder='Select Country'


                    />
                </div>
                <div className='flex flex-col w-full'>
                    <CustomDropdown
                        label='State'
                        name='state'
                        required
                        register={register}
                        error={errors.state?.message}
                        options={mappedStates}
                        placeholder='Select State'
                    />
                </div>
                <div className='flex flex-col w-full'>
                    <CustomDropdown
                        label='City'
                        name='city'
                        required={false}
                        register={register}
                        error={errors.city?.message}
                        options={mappedCities}
                        placeholder='Select City'

                    />
                </div>
                <br />
                <Button type='submit'>  {isSubmitting ? <Spinner width="20" fill="white" className="animate-spin " /> : 'Save'}</Button>
            </form>

        </div>
    )
}

export default AddressForm