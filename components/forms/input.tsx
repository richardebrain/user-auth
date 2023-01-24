import React, { ReactComponentElement } from 'react';

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
    disabled?: boolean

}

const CustomInput: React.FC<InputProps> = ({ type, name, label, disabled, register, error, touched, icon, className, ...otherProps }) => {

    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className='flex flex-col gap-1 font-kumbh w-full'>
            {
                label && <label htmlFor={name} className='text-black'>{label}</label>
            }
            <div className='relative flex flex-col'>
                <span className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${showPassword ? 'text-black ' : 'text-gray-500'} `} onClick={() => setShowPassword(state => !state)}>
                    {icon}

                </span>

                <input
                    type={showPassword ? 'text' : type}
                    {...otherProps}
                    {...register(name)}
                    className={`outline-none bg-white pt-3 focus:border-black text-black rounded-md px-2 placeholder:text-black h-12 border border-gray-400 ${className}} ${error ? ' focus:border-red-500 border-red-500' : ''}`}
                    {...touched && error && { className: 'border-red-500' }}
                    disabled={disabled}
                />

            </div>

            {
                error && <p className='text-red-500 text-sm'>{error}</p>
            }
        </div>
    )
}

export default CustomInput