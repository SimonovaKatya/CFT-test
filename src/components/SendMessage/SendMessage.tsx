import React, {ChangeEvent, FC, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    sendMessageReducerSelectors,
    setInputValue,
    setCurrentCountry,
    setIsOpenCountriesList,
    setIsFamousPrefix,
    setIsConfirm,
    showSuccessMessageAsync,
    setIsCorrectInputValue
} from "../../redux/sendMessageSlice"
import s from './SendMessage.module.css'
import {AlertDialog} from "../AlertDialog/AlertDialog"
import {CountriesList} from "../CountriesList/CountriesList"


export const SendMessage: FC = () => {
    const {
        inputValue, countries, currentCountry,
        isOpenCountriesList, isFamousPrefix, isConfirm,
        isCorrectInputValue, isShowSuccessMessage
    } = useSelector(sendMessageReducerSelectors)
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const onKeyConfirm = (e: KeyboardEvent) => (e.key === 'Enter') ? onConfirm() : null
        window.addEventListener('keydown', onKeyConfirm)
        return () => window.removeEventListener('keydown', onKeyConfirm)
    })

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [])

    const onConfirm = () => {
        if (isShowSuccessMessage) return

        dispatch(setIsConfirm(true))
        dispatch(setIsOpenCountriesList(false))

        let isCorrect = false
        if (currentCountry) {
            const valueLength = +inputValue.toString().length
            const minLength = currentCountry.phoneInfo.minLength
            const maxLength = currentCountry.phoneInfo.maxLength

            if (valueLength >= minLength && valueLength <= maxLength && isFamousPrefix) {
                isCorrect = true
                inputRef.current && inputRef.current.blur()
            }
            dispatch(setIsCorrectInputValue(isCorrect))
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!currentCountry) return

        const value: string = e.target.value
        const maxLength: number = isFamousPrefix ? currentCountry.phoneInfo.maxLength : 12

        if (!isNaN(+value) && value.length <= (maxLength + 1)) {
            dispatch(setInputValue(+value))
            dispatch(setIsConfirm(false))

            let isChanged = false // для взятия первого кода (по тз)
            let isFamousPrefix = false
            countries.forEach(country => {
                const prefix: string = country.phoneInfo.prefix
                if (value.startsWith(prefix)) {
                    isFamousPrefix = true
                }

                if (isChanged) return

                const currentPrefix: string = currentCountry.phoneInfo.prefix

                if (value.startsWith(prefix) && prefix !== currentPrefix) {
                    dispatch(setCurrentCountry(country))
                    dispatch(setInputValue(+country.phoneInfo.prefix))
                    isChanged = true
                }
            })

            dispatch(setIsFamousPrefix(isFamousPrefix))
        }
        if (value === '+') {
            dispatch(setInputValue(0))
            dispatch(setIsFamousPrefix(false))
        }
    }

    const toggleCountriesList = () => {
        dispatch(setIsOpenCountriesList(!isOpenCountriesList))
        dispatch(setIsConfirm(false))
    }

    return (
        <div style={{display: "flex"}}>
            <div className={s.container}>
                <div className={s.inputContainer}>
                    <div className={s.landName} onClick={toggleCountriesList}>
                        {isFamousPrefix ? currentCountry && currentCountry.code : '?'}
                    </div>
                    <input className={s.inputPhone}
                           type="text"
                           ref={inputRef}
                           value={`+${inputValue === 0 ? '' : inputValue.toString()}`}
                           onChange={onInputChange}
                           onClick={() => dispatch(setIsOpenCountriesList(false))}
                    />
                </div>
                <CountriesList countries={countries} inputRef={inputRef} isOpenCountriesList={isOpenCountriesList}/>
                {isConfirm && !isCorrectInputValue && <div className={s.errorMessage}>Некорректный формат</div>}
                {isConfirm && isCorrectInputValue &&
                <AlertDialog inputRef={inputRef} onSuccess={() => dispatch(showSuccessMessageAsync())}
                             onCancel={() => dispatch(setIsConfirm(false))}
                />}
            </div>
            <div>
                <button className={isShowSuccessMessage ? s.btn : s.btnHoverPointer} disabled={isShowSuccessMessage}
                        onClick={onConfirm}>
                    Далее
                </button>
            </div>
            {isShowSuccessMessage && <div className={s.successMessage}>Сообщенеи было успешно отправлено</div>}
        </div>
    )
}
