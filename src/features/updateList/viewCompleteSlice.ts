import {createSlice} from '@reduxjs/toolkit'

type viewState = {
    condition: boolean
}


const initialState: viewState = {
    condition: false
}



export const viewCompleteSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        viewAllComplete: (state: viewState) => {
            state.condition = true
        },
        viewAllIncomplete: (state: viewState) => {
            state.condition = false
        }
    }
});

export const {viewAllComplete, viewAllIncomplete} = viewCompleteSlice.actions;
export default viewCompleteSlice.reducer;
