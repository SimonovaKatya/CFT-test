import React, {FC, useEffect} from "react"
import s from './AlertDialog.module.css'

type propsType = {
    onCancel: () => void
    onSuccess: () => void
    inputRef: React.RefObject<HTMLInputElement>
}

export const AlertDialog: FC<propsType> = ({onCancel, onSuccess, inputRef}) => {

    useEffect(() => {
        const onDecide = (e: KeyboardEvent) => {
            e.preventDefault()

            if (e.key === 'Enter')
                Success()
            if (e.key === 'Escape' || e.key === 'Backspace')
                Cancel()
        }
        window.addEventListener('keydown', onDecide)
        return () => window.removeEventListener('keydown', onDecide)
    })

    const Success = () => {
        onSuccess()
        inputRef.current && inputRef.current.focus()
    }

    const Cancel = () => {
        onCancel()
        inputRef.current && inputRef.current.focus()
    }

    return (
        <div className={s.background} onClick={Cancel}>
            <div className={s.alert} onClick={(e:React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
                <div>Вы уверены, что хотите отправить сообщение?</div>
                <div className={s.buttonsBlock}>
                    <button className={s.success} onClick={Success}>Да</button>
                    <button className={s.cancel} onClick={Cancel}>Нет</button>
                </div>
            </div>
        </div>
    )
}
