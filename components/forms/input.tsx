import React from 'react';

type InputProps = {
    type: string,
    name?: string,
    placeholder: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    touched?: boolean,
    label?: string,
    required: boolean,
    register?: any

}

const CustomInput: React.FC<InputProps> = ({ type, name, label,register,error, ...otherProps }) => {
    

    return (
        <div className='flex flex-col gap-1 font-kumbh'>
            {
                label && <label htmlFor={name} className='text-black'>{label}</label>
            }
            <input type={type} {...otherProps} {...register(name)}
                className={`border-b border-Black outline-none bg-Black pt-2 text-White rounded-md px-2 placeholder:text-White h-12 focus:bg-Black `}
            />
            {
                error && <p className='text-red-500 text-sm'>{error}</p>
            }
        </div>
    )
}

export default CustomInput