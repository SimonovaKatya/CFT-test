import React, {FC} from "react"
import s from './CountryItem.module.css'

type propsType = {
    code: string
    name: string
    prefix: string
    inputRef: React.RefObject<HTMLInputElement>
    setCurrentCountry: () => void
    closeList: () => void
}

export const CountryItem: FC<propsType> = ({code, name, prefix, setCurrentCountry, closeList, inputRef}) => {

    const onClick = () => {
        setCurrentCountry()
        closeList()
        inputRef.current && inputRef.current.focus()
    }

    return (
        <li onClick={onClick}>
            <div className={s.code}>{code}</div>
            <div className={s.info}>{`${name} (${prefix})`}</div>
        </li>
    )
}
