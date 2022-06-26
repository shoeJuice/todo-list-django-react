import axios from 'axios'
import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {AppDispatch, RootState} from '../../app/store'
import type {APIResponse} from '../../components/TodoItem'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


type trackCurrentList = {
    currentList: APIResponse[]
}


const initialState: trackCurrentList = {
    currentList: []
}


export const getListSlice = createSlice({
    name: 'getList',
    initialState,
    reducers: {
        setCurrent: (state: trackCurrentList, action: PayloadAction<APIResponse[]>) => {
            state.currentList = action.payload
        },
    }
});

export const { setCurrent } = getListSlice.actions;
export default getListSlice.reducer;