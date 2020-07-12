import {configureStore} from '@reduxjs/toolkit'
import {sendMessageReducer} from "./sendMessageSlice";

export const store = configureStore({
    reducer: {
        sendMessageReducer,
    }
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
