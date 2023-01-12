import React, { useEffect, useState } from 'react'


type DropdowProps = {
    name: string
    options: optionProps[]
    label?: string
    required?: boolean
    register?: any
    error?: string
    placeholder?: string

}

type optionProps = {
    name: string
    code?: string
}


const CustomDropdown = ({ label, name, options, required, register, error, placeholder, ...otherProps }: DropdowProps) => {

    return (
        <div className='flex flex-col gap-1 font-kumbh w-full'>
            {
                label && <label htmlFor={name} className='text-sm font-medium text-gray-700'>{label}</label>
            }
            <select name={name} id={name} className={`w-full h-10 outline-none border focus:border-black border-gray-400 rounded-md flex gap-4 ${error ? 'focus:border-red-500 border-red-500 ' : ''}`} {...register(name)} required={required} >
                <option value="" className='' >{placeholder}</option>
                {
                    options.map((option) => <option value={`${option.code || ''} ${option.name}`} key={option.name} className=''>{option.name}</option>)
                }
            </select>


            {
                error && <p className='text-red-500 text-sm'>{error}</p>
            }
        </div>
    )
}

export default CustomDropdown