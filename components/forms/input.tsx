import React, { ReactComponentElement } from 'react';
import Image2 from 'next/image';

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
    className?: string
    icon?: ReactComponentElement<any>

}

const CustomInput: React.FC<InputProps> = ({ type, name, label, register, error, icon, className, ...otherProps }) => {

    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className='flex flex-col gap-1 font-kumbh'>
            {
                label && <label htmlFor={name} className='text-black'>{label}</label>
            }
            <div className='relative flex flex-col'>
                <span className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${showPassword ? 'text-grey-500 ': 'text-white'}`} onClick={() => setShowPassword(state => !state)}>
                    {icon}
                    
                </span>

                <input type={showPassword ? 'text' : type} {...otherProps} {...register(name)}
                    className={`border-b border-Black outline-none bg-Black pt-2 text-White rounded-md px-2 placeholder:text-White h-12 focus:bg-Black ${className}}`}

                />

            </div>

            {
                error && <p className='text-red-500 text-sm'>{error}</p>
            }
        </div>
    )
}

export default CustomInput