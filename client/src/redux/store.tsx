import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './features/login';
import signUpReducer from './features/signup';
import errorReducer from './features/errorHandler';
import userReducer from './features/user';

export default configureStore({
    reducer: {
        signup: signUpReducer,
        login: loginReducer,
        errorHandler: errorReducer,
        user: userReducer,
    }
})