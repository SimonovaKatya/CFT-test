import axios from "axios";
import {countryType} from "../redux/sendMessageSlice";

const instance = axios.create({
    baseURL: 'https://koronapay.com/',
});


type GetCountriesResponseType = {
    data: Array<countryType> // главное это поле типизировать
    status: number
    config: object
    statusText: string
    headers: object
    request: any
}

export const countriesAPI = {
    getCountries(): Promise<GetCountriesResponseType> {
        return instance.get(`transfers/online/api/countries`)
    },
};
