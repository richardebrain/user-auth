import React from 'react'

interface IButton {
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'

}

const Button = ({ children, ...otherProps }: IButton) => {

    return (
        <button {...otherProps} className={`px-8 bg-Black text-white py-3 rounded-md hover:bg-slate-900 flex items-center justify-center`}>
            {children}
        </button>
    )
}

export default Button