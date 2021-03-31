import './Todos.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/features/user';
import Todo from '../todo/Todo';
import { addNewTask } from '../../controller/UserController';
import { validateTask } from '../../validation/newTask';
import { handleError } from '../../errorHandler/errorHandler';
import { useState } from 'react';

function Todos() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [showDoneOnly, setShowDoneOnly] = useState(false);
    const [hideDoneTasks, setHideDoneTasks] = useState(false);

    const renderTodos = () => {
        let todoTasks = user.todoTasks;

        if (showDoneOnly) {
            todoTasks = todoTasks.filter((task: any) => task.done);
        } else if (hideDoneTasks) {
            todoTasks = todoTasks.filter((task: any) => !task.done);
        }

        const mappedTodoTasks = todoTasks.map((task: any) => {
            return (<Todo data={task} key={task._id} />);
        });

        return mappedTodoTasks;
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            const validationResponse = validateTask(name);
            if (validationResponse) {
                handleError(validationResponse, dispatch);
            } else {
                addNewTask(name, user.jwt, dispatch);
                setName('');
            }
        }
    }

    const toggleShowDoneOnly = () => {
        setShowDoneOnly(!showDoneOnly);
    };

    const toggleHideDoneTasks = () => {
        setHideDoneTasks(!hideDoneTasks);
    };

    return (
        <div className="todoContainer">
            <div className="filter">
                <div className="hideDone" onClick={() => { toggleHideDoneTasks(); setShowDoneOnly(false); }}>Hide done tasks</div>
                <div className="showDoneOnly" onClick={() => { toggleShowDoneOnly(); setHideDoneTasks(false); }}>Show only done tasks</div>
            </div>
            <div className="addNewTask">
                <input type="text" value={name} placeholder="New todo name" onChange={(e) => { setName(e.target.value); }} onKeyDown={(e) => onKeyDown(e)} />
            </div>
            <div className="usersTodos">
                {renderTodos()}
            </div>
        </div>
    );
};

export default Todos;