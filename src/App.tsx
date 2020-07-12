import React, {useEffect} from 'react'
import './App.css'
import {SendMessage} from "./components/SendMessage/SendMessage"
import {useDispatch, useSelector} from "react-redux"
import {sendMessageReducerSelectors, setCountriesAsync} from "./redux/sendMessageSlice"
import {Preloader} from "./commons/Preloader/Preloader"

function App() {
    const {currentCountry} = useSelector(sendMessageReducerSelectors)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCountriesAsync())
    }, [dispatch])

    return (
        <div className="App">
            {currentCountry ? <SendMessage/> : <Preloader/>}
        </div>
    );
}

export default App;
