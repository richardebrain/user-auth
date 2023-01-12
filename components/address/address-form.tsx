import React, { ReactHTML, ReactHTMLElement, useEffect, useState } from 'react'
import CustomInput from '@components/forms/input'
import { useForm } from 'react-hook-form'
import { AddressForm, AddressStateProps } from '@helpers/types'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomDropdown from '@components/forms/dropdown'
import { Country, State, City } from 'country-state-city'
import Button from '@components/Button'
import { formatValue } from '@helpers/methods'
import { auth, createUserAddress } from '@utils/firebase'
import { useRouter } from 'next/router'
import Spinner from '@components/Spinner'


type CountryProps = {
    name: string,
    code?: string
}
const AddressForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const addressSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        phone: Yup.string().required('Phone is required'),

    })


    const { register, handleSubmit, reset, getValues, watch, formState: { errors } } = useForm<AddressForm>({
        resolver: yupResolver(addressSchema)
    })



    useEffect(() => {
        // cause a component re-render when country / state  gets updated
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
    const handleFormSubmit = async (data: AddressForm) => {
        await createUserAddress(auth.currentUser, data).then((res) => {
            console.log(res, 'address created')
            reset()
            setIsLoading(true)
            router.push('/account/address/address')

        })

    }
    return (
        <div className=' flex items-center flex-col mx-auto w-[90%]'>
            <form className='flex flex-col w-full gap-6' onSubmit={handleSubmit(handleFormSubmit)} >
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
                <div className='flex flex-col w-full'>
                    <CustomInput
                        label='Last Name'
                        name='lastName'
                        type='text'
                        placeholder='Last Name'
                        required
                        register={register}
                        error={errors.lastname?.message}
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
                        label='Delivery Address'
                        name='address'
                        type='text'
                        placeholder='Enter Your Address'
                        required
                        register={register}
                        error={errors.address?.message}
                    />
                </div>
                <div className='flex flex-col w-full'>
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
                        required
                        register={register}
                        error={errors.city?.message}
                        options={mappedCities}
                        placeholder='Select City'

                    />
                </div>
                <Button type='submit'>  {isLoading ? <Spinner width="20" fill="white" className="animate-spin" /> : 'Sign Up'}</Button>
            </form>

        </div>
    )
}

export default AddressForm