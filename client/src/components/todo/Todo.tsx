import './Todo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { deleteTask, editTask } from '../../controller/UserController';
import { selectUser } from '../..//redux/features/user';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { validateTask } from '../../validation/newTask';
import { handleError } from '../../errorHandler/errorHandler';

function Todo(data: any) {
    const save = <FontAwesomeIcon icon={faSave} className="hoverIcon editIcon" onClick={() => { validateAndEdit(); toggleEditing(); }} />
    const edit = <FontAwesomeIcon icon={faEdit} className="hoverIcon editIcon" onClick={() => toggleEditing()} />
    const trash = <FontAwesomeIcon icon={faTrash} className="hoverIcon trashIcon" onClick={() => { deleteTask(user.jwt, data.data._id, dispatch) }} />
    const exit = <FontAwesomeIcon icon={faTimes} className="hoverIcon trashIcon" onClick={() => { toggleEditing(); }} />

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [editing, setEditing] = useState(false);
    const [editingName, setEditingName] = useState('');
    const [isTaskDone, setIsTaskDone] = useState(false);

    useEffect(() => {
        setEditingName(data.data.name);
        setIsTaskDone(data.data.done);
    }, []);
    const toggleEditing = () => {
        setEditing(!editing);
    }

    const toggleIsTaskDone = () => {
        setIsTaskDone(!isTaskDone);
    }

    const validateAndEdit = () => {
        const validationResponse = validateTask(editingName);
        if (validationResponse) {
            handleError(validationResponse, dispatch);
        } else {
            editTask(data.data._id, isTaskDone, editingName, user.jwt, dispatch);
        }
    }
    const renderRow = () => {
        if (editing) {
            return (
                <div className="todoRow">
                    <div className="todoEditingName">
                        <input type="text" onChange={(e) => { setEditingName(e.target.value) }} value={editingName} />
                        <span className={isTaskDone ? "editingDoneTask selectedDone" : "editingDoneTask notSelectedDone"} onClick={() => { toggleIsTaskDone(); }}>DONE</span>
                        <span className={!isTaskDone ? "editingDoneTask selectedNotDone" : "editingDoneTask notSelectedNotDone"} onClick={() => { toggleIsTaskDone(); }}>NOT DONE</span>
                    </div>
                    <div className="todoIcons">
                        <div className="todoEdit">
                            {save}
                        </div>
                        <div className="todoDelete">
                            {exit}
                        </div>
                    </div>
                </div>);
        } else {
            return (
                <div className="todoRow">
                    <div className="todoName">
                        {data.data.done
                            ? <span className="editingDoneTask selectedDone" >DONE</span>
                            : <span className="editingDoneTask selectedNotDone" >NOT DONE</span>}
                        <span className="taskNameText">{data.data.name}</span>
                    </div>
                    <div className="todoIcons">
                        <div className="todoEdit">
                            {edit}
                        </div>
                        <div className="todoDelete">
                            {trash}
                        </div>
                    </div>
                </div>
            );
        }
    }
    return renderRow();
};

export default Todo;