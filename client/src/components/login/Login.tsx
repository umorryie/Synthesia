import './Login.css';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectLogin, setEmail, setPassword } from '../../redux/features/login';
import { validateLogin } from '../../validation/login';
import { handleError } from '../../errorHandler/errorHandler';
import { loginCredentials, setUserInformation } from '../../controller/UserController';
import { useEffect } from 'react';

function Login() {
    const login = useSelector(selectLogin);
    const history = useHistory();
    const dispatch = useDispatch();
    const { email, password } = login;

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setUserInformation(token, history, dispatch, false);
        }
    }, [history, dispatch]);

    const setInput = (event: any, targetInputName: string) => {
        switch (targetInputName) {
            case 'email':
                dispatch(setEmail(event.target.value));
                break;
            case 'password':
                dispatch(setPassword(event.target.value));
                break;
        }
    }

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            loginWithValidation();
        }
    }

    const loginWithValidation = () => {
        const validationResponse = validateLogin(email, password);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            loginCredentials(email, password, dispatch, history);
        }
    }

    return (<div className="wrapper fadeInDown">
        <div id="inputContainer">
            <div className="centerContainer">
                <h2 className="fadeIn">Login</h2>
                <input type="text" className="fadeIn second" name="login" placeholder="Email"
                    onChange={(event) => { setInput(event, 'email'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="password" className="fadeIn third" name="login" placeholder="Password"
                    onChange={(event) => { setInput(event, 'password'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="submit" className="fadeIn fourth" value="Log In"
                    onClick={() => { loginWithValidation(); }} />
                <div id="formFooter">
                    <h6 className="underlineHover" onClick={() => history.push("/signup")}>No account yet ?</h6>
                </div>
            </div>
        </div>
    </div>);
};

export default Login;