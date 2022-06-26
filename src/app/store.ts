import {configureStore} from "@reduxjs/toolkit"
import updateReducer from '../features/updateList/updateSlice'
import getListReducer  from "../features/updateList/trackSlice"
import viewCompleteReducer from '../features/updateList/viewCompleteSlice'
import filterChangeReducer from "../features/updateList/filterChange"


export const store = configureStore({
    reducer: {
        needUpdate: updateReducer,
        trackList: getListReducer,
        viewComplete: viewCompleteReducer,
        filterUpdate: filterChangeReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch