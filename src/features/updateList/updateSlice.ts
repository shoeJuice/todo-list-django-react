import axios from 'axios'
import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {AppDispatch, RootState} from '../../app/store'

type updateState = {
    condition: boolean
}


const initialState: updateState = {
    condition: false
}



export const updateSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        setTrue: (state: updateState) => {
            state.condition = true
        },
        setFalse: (state: updateState) => {
            state.condition = false
        }
    }
});



export const { setTrue, setFalse } = updateSlice.actions;

export default updateSlice.reducer;