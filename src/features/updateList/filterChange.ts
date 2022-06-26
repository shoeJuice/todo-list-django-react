import axios from 'axios'
import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {AppDispatch, RootState} from '../../app/store'

type filterState = {
    condition: boolean
}


const initialState: filterState = {
    condition: false
}



export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterTrue: (state: filterState) => {
            state.condition = true
        },
        filterFalse: (state: filterState) => {
            state.condition = false
        }
    }
});



export const { filterTrue, filterFalse } = filterSlice.actions;

export default filterSlice.reducer;