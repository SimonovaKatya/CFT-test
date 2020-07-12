import {createSlice} from '@reduxjs/toolkit'
import {AppDispatchType, RootStateType} from "./store"
import {countriesAPI} from "../api/api"
import {sleep} from "../helpers/sleep"

const initialState = {
    inputValue: 0,
    countries: [] as Array<countryType>,
    currentCountry: null as countryType | null,
    isOpenCountriesList: false,
    isFamousPrefix: true,
    isConfirm: false,
    isCorrectInputValue: true,
    isShowSuccessMessage: false
}
type sendMessageStateType = typeof initialState

export const sendMessageSlice = createSlice({
    name: 'sendMessageSlice',
    initialState,
    reducers: {
        setInputValue: (state: sendMessageStateType, action: { payload: number }) => {
            state.inputValue = action.payload
        },
        setCountries: (state: sendMessageStateType, action: { payload: Array<countryType> }) => {
            state.countries = action.payload
        },
        setCurrentCountry: (state: sendMessageStateType, action: { payload: countryType | null }) => {
            state.currentCountry = action.payload
        },
        setIsOpenCountriesList: (state: sendMessageStateType, action: { payload: boolean }) => {
            state.isOpenCountriesList = action.payload
        },
        setIsFamousPrefix: (state: sendMessageStateType, action: { payload: boolean }) => {
            state.isFamousPrefix = action.payload
        },
        setIsConfirm: (state: sendMessageStateType, action: { payload: boolean }) => {
            state.isConfirm = action.payload
        },
        setIsShowSuccessMessage: (state: sendMessageStateType, action: { payload: boolean }) => {
            state.isShowSuccessMessage = action.payload
        },
        setIsCorrectInputValue: (state: sendMessageStateType, action: { payload: boolean }) => {
            state.isCorrectInputValue = action.payload
        },
    },
})

export type countryType = {
    code: string
    id: string
    name: string
    phoneInfo: {
        format: string
        maxLength: number
        minLength: number
        prefix: string
    }
}

export const setCountriesAsync = () => async (dispatch: AppDispatchType) => {
    const response = await countriesAPI.getCountries();
    if (response.status !== 200) return
    const countries: Array<countryType> = response.data

    dispatch(setCountries(countries))
    dispatch(setCurrentCountry(countries[0]))
    dispatch(setInputValue(+countries[0].phoneInfo.prefix))
};

export const showSuccessMessageAsync = () => async (dispatch: AppDispatchType) => {
    dispatch(setIsConfirm(false))
    dispatch(setIsShowSuccessMessage(true))
    await sleep(5000)
    dispatch(setIsShowSuccessMessage(false))
}


export const {
    setInputValue, setCountries, setCurrentCountry,
    setIsOpenCountriesList, setIsFamousPrefix, setIsConfirm,
    setIsShowSuccessMessage, setIsCorrectInputValue
} = sendMessageSlice.actions
export const sendMessageReducerSelectors = (state: RootStateType) => state.sendMessageReducer
export const sendMessageReducer = sendMessageSlice.reducer;
