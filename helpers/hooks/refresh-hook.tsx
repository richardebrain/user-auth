import { useAppDispatch } from '@helpers/redux.hooks'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { RefObject, useEffect, useRef } from 'react'

type Props = {
    view: boolean,
    toggleView: ActionCreatorWithoutPayload

}

const RefreshHook = ({ view, toggleView }: Props) => {
    const ref = useRef() as RefObject<HTMLDivElement>


    const dispatch = useAppDispatch()
    useEffect(() => {
        const checkIfClickOutside = (e: any) => {

            if (!view && ref.current && !ref?.current?.contains(e.target)) {
                dispatch(toggleView())
            }
          
        }

        document.addEventListener('mousedown', checkIfClickOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside)
        }
    }, [toggleView, view])
    return {
        ref
    }
}

export default RefreshHook
