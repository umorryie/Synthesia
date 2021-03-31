import { createSlice } from '@reduxjs/toolkit';

export const errorHandlerSlice = createSlice({
    name: 'errorHandler',
    initialState: {
        errorExist: false,
        message: ''
    },
    reducers: {
        setErrorExist: (state, action) => {
            state.errorExist = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
});

export const { setErrorExist, setMessage } = errorHandlerSlice.actions;
export const selectError = (state: any) => state.errorHandler;

export default errorHandlerSlice.reducer;