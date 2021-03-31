import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: "",
        password: ""
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
    }
});

export const { setEmail, setPassword } = loginSlice.actions;
export const selectLogin = (state: any) => state.login;

export default loginSlice.reducer;