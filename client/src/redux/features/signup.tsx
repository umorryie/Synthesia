import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'signup',
    initialState: {
        email: "",
        name: "",
        surname: "",
        password: "",
        repassword: ""
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setSurname: (state, action) => {
            state.surname = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setReassword: (state, action) => {
            state.repassword = action.payload
        }
    }
});

export const { setEmail, setName, setSurname, setPassword, setReassword } = registerSlice.actions;
export const selectSignUp = (state: any) => state.signup;

export default registerSlice.reducer;