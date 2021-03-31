import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        todoTasks: [],
        jwt: null
    },
    reducers: {
        setJWT: (state, action) => {
            state.jwt = action.payload
        },
        setTodoTasks: (state, action) => {
            state.todoTasks = action.payload
        },
    }
});

export const { setTodoTasks, setJWT } = userSlice.actions;
export const selectUser = (state: any) => state.user;

export default userSlice.reducer;