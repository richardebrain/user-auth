import React from 'react'

interface IButton {
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    isGoogleSignIn?: boolean

}

const Button = ({ children, isGoogleSignIn,...otherProps }: IButton) => {

    return (
        <button {...otherProps} className={`px-8 bg-Black text-white py-3 rounded-md hover:bg-slate-900 flex items-center justify-center ${isGoogleSignIn ? 'text-white bg-blue-700 hover:bg-blue-800 w-full' : ''}`}>
            {children}
        </button>
    )
}

export default Button