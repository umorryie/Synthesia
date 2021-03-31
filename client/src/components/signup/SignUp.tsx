import { useHistory } from "react-router-dom";
import { setEmail, setName, setSurname, setPassword, setReassword, selectSignUp } from '../../redux/features/signup';
import { useSelector, useDispatch } from 'react-redux';
import { validateSignUp } from '../../validation/signup';
import { handleError } from '../../errorHandler/errorHandler';
import { registerUser } from '../../controller/UserController';

function SignUp() {
    const history = useHistory();
    const signup = useSelector(selectSignUp);
    const dispatch = useDispatch();

    const { email, password, repassword, name, surname } = signup;

    const setInput = (event: any, targetInputName: string) => {
        switch (targetInputName) {
            case 'email':
                dispatch(setEmail(event.target.value));
                break;
            case 'password':
                dispatch(setPassword(event.target.value));
                break;
            case 'surname':
                dispatch(setSurname(event.target.value));
                break;
            case 'name':
                dispatch(setName(event.target.value));
                break;
            case 'repassword':
                dispatch(setReassword(event.target.value));
                break;
        }
    }

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            signUpWithValidation();
        }
    }

    const signUpWithValidation = () => {
        const validationResponse = validateSignUp(name, surname, email, password, repassword);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            registerUser(name, surname, email, password, repassword, dispatch, history);
        }
    }

    return (<div className="wrapper fadeInDown">
        <div id="inputContainer">
            <div className="centerContainer">
                <h2 className="fadeIn">Sign Up</h2>
                <input type="text" className="fadeIn second" name="name" placeholder="Name"
                    onChange={(event) => { setInput(event, 'name'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="text" className="fadeIn third" name="surname" placeholder="Surname"
                    onChange={(event) => { setInput(event, 'surname'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="text" className="fadeIn second" name="email" placeholder="Email"
                    onChange={(event) => { setInput(event, 'email'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="password" className="fadeIn third" name="password" placeholder="Password"
                    onChange={(event) => { setInput(event, 'password'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="password" className="fadeIn third" name="repassword" placeholder="Re-password"
                    onChange={(event) => { setInput(event, 'repassword'); }}
                    onKeyDown={event => onKeyDown(event)} />
                <input type="submit" className="fadeIn fourth" value="Sign Up"
                    onClick={() => { signUpWithValidation(); }} />
                <div id="formFooter">
                    <h6 className="underlineHover" onClick={() => history.push("/login")}>Already have an account ?</h6>
                </div>
            </div>
        </div>
    </div>);
};

export default SignUp;