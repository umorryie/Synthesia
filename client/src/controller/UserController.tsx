import { setJWT, setTodoTasks } from '../redux/features/user';
import { handleError } from '../errorHandler/errorHandler';

const loginCredentials = (email: string, password: string, dispatch: any, history: any) => {
    fetch('api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email, password })
    }).then(res => res.json()).then((results: any) => {
        if (handleError(results, dispatch)) {
            return;
        }
        if (results) {
            const { token, todoTasks } = results;
            if (token && todoTasks) {
                localStorage.setItem('jwt', token);
                dispatch(setJWT(token));
                dispatch(setTodoTasks(todoTasks));
                history.push('/');
            }
        }
    }).catch(console.log);
}

const registerUser = (name: string, surname: string, email: string, password: string, repassword: string, dispatch: any, history: any) => {
    fetch('api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ email, password, repassword, name, surname })
    }).then(res => res.json()).then(result => {
        if (handleError(result, dispatch)) {
            return;
        }
        const { token } = result;
        if (token) {
            localStorage.setItem('jwt', token);
            dispatch(setJWT(token));
            history.push('/');
        }
    }).catch(console.log)
}

const setUserInformation = (token: string, history: any, dispatch: any, validateError: boolean) => {
    fetch('api/users/todo/list', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        mode: 'cors',
    }).then(el => el.json()).then(res => {
        if (validateError) {
            if (handleError(res, dispatch)) {
                return;
            }
        }

        const { todoTasks } = res;
        if (todoTasks) {
            dispatch(setJWT(token));
            dispatch(setTodoTasks(todoTasks));
            history.push('/');
        }
    }).catch(er => console.log(er));
}

const deleteTask = (token: string, _id: string, dispatch: any) => {
    fetch('api/users/todo/delete', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ _id })
    }).then(el => el.json()).then(res => {
        if (handleError(res, dispatch)) {
            return;
        }

        const { todoTasks } = res;
        if (todoTasks) {
            dispatch(setTodoTasks(todoTasks));
        }
    }).catch(er => console.log(er));
}

const addNewTask = (name: string, token: string, dispatch: any) => {
    fetch('api/users/todo/add', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ name })
    }).then(el => el.json()).then(res => {
        if (handleError(res, dispatch)) {
            return;
        }

        const { todoTasks } = res;
        if (todoTasks) {
            dispatch(setTodoTasks(todoTasks));
        }
    }).catch(er => console.log(er));
}

const editTask = (_id: string, done: boolean, name: string, token: string, dispatch: any) => {
    fetch('api/users/todo/update', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ _id, name, done })
    }).then(el => el.json()).then(res => {
        if (handleError(res, dispatch)) {
            return;
        }

        const { todoTasks } = res;
        if (todoTasks) {
            dispatch(setTodoTasks(todoTasks));
        }
    }).catch(er => console.log(er));
}

export { loginCredentials, registerUser, setUserInformation, deleteTask, addNewTask, editTask };