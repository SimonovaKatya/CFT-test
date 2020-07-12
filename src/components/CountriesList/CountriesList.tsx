import s from "./CountriesList.module.css"
import {CountryItem} from "../CountryItem/CountryItem"
import {
    countryType,
    setCurrentCountry,
    setIsOpenCountriesList,
    setInputValue,
    setIsFamousPrefix
} from "../../redux/sendMessageSlice"
import React, {FC} from "react"
import {useDispatch} from "react-redux"

type propsType = {
    isOpenCountriesList: boolean
    countries: Array<countryType>
    inputRef: React.RefObject<HTMLInputElement>
}

export const CountriesList: FC<propsType> = ({isOpenCountriesList, countries, inputRef}) => {
    const dispatch = useDispatch()

    const onSetCurrentCountry = (country: countryType) => {
        dispatch(setCurrentCountry(country))
        dispatch(setIsFamousPrefix(true))
        dispatch(setInputValue(+country.phoneInfo.prefix))
    }

    return (
        <ul className={isOpenCountriesList ? s.openCountriesList : s.closedCountriesList}>
            {
                countries.map(country => <CountryItem code={country.code}
                                                      name={country.name}
                                                      prefix={country.phoneInfo.prefix}
                                                      key={country.id}
                                                      inputRef={inputRef}
                                                      setCurrentCountry={() => onSetCurrentCountry(country)}
                                                      closeList={() => dispatch(setIsOpenCountriesList(false))}
                />)
            }
        </ul>
    )
}
