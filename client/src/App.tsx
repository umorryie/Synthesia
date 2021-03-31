import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { selectUser } from './redux/features/user';
import { selectError, setErrorExist, setMessage } from './redux/features/errorHandler';
import { useSelector, useDispatch } from 'react-redux';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const exitButton = <FontAwesomeIcon icon={faTimesCircle} onClick={() => { dispatch(setErrorExist(false)); dispatch(setMessage('')); }} />;

  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
        {error.errorExist ? <div className="errorContainer">
          <div className="errorDiv">
            <div className="errorRelativeContainer">
              <div className="errorExitIcon">
                {exitButton}
              </div>
              <div className="errorText">
                {error.message}
              </div>
            </div>
          </div>
        </div> : null}
        <Switch>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <Route path="/signup" exact={true}>
            <SignUp />
          </Route>
          <Route path="/" exact={true}>
            {(!user || !user.jwt || user.jwt === null || user.jwt === '') ? <Redirect to={{ pathname: "/login" }} />
            :<Dashboard/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
