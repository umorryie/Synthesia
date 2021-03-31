import User from '../database/userSchema/UserSchema';
import { Task } from '../database/taskSchema/TaskSchema';
import { validatePassword } from '../hash/validatePassword';
import { hashPassword } from '../hash/passwordHash';
import { generateToken } from '../auth/generateToken';

const userInformation = (req: any, res: any) => {
    const { user } = req.body;
    const { todoTasks } = user;

    return res.json({ todoTasks });

};

const addTodo = async (req: any, res: any) => {
    const { name, dueDate, user, done } = req.body;
    const newTask = new Task({ dueDate: new Date(dueDate), name, done: done || false });
    const oldTasks = user.todoTasks;

    try {
        user.todoTasks = [...oldTasks, newTask];
        const updatedUser = await user.save();

        res.json(updatedUser);

    } catch (error) {
        res.json({ error });
    }
};

const updateTodo = async (req: any, res: any) => {
    const { name, dueDate, user, done, _id } = req.body;
    const newTask = new Task({ dueDate: new Date(dueDate), name, done });
    let taskExists: boolean = false;

    const newTasks = user.todoTasks.map((task: any) => {
        if (task._id == _id) {
            taskExists = true;
            return newTask;
        } else {
            return task;
        }
    });

    if (!taskExists) {
        return res.json({ error: { message: `There is no task with id: ${_id}` } });
    }

    try {
        user.todoTasks = newTasks;
        const updatedUser = await user.save();

        res.json(updatedUser);

    } catch (error) {
        res.json({ error });
    }
};

const deleteTodo = async (req: any, res: any) => {
    const { _id, user } = req.body;
    let taskExists: boolean = false;
    const newTasks = user.todoTasks.filter((task: any) => {
        if (task._id != _id) {
            return task;
        } else {
            taskExists = true;
        }
    });

    if (!taskExists) {
        return res.json({ error: { message: `There is no task with id: ${_id}` } });
    }

    try {
        user.todoTasks = newTasks;
        const updatedUser = await user.save();

        res.json(updatedUser);

    } catch (error) {
        res.json({ error });
    }
};

const registerUser = async (req: any, res: any) => {
    const { name, surname, email, password, repassword } = req.body;

    if (password !== repassword) {
        return res.json({ error: { message: "Passwords do not match." } })
    }

    const hashedPassword = hashPassword(password);

    try {
        const user = new User({ name, surname, email, password: hashedPassword });
        const savedUser = await user.save();
        const token = generateToken({ email });

        res.json({ savedUser, token });
    } catch (error) {
        res.json({ error });
    }
};

const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const validPassword = validatePassword(password, user.password);

        if (validPassword) {
            const token = generateToken({ email: user.email });

            res.json({ token, todo: user.todoTasks });
        } else {
            res.json({ error: { message: 'Email and password credentials does not match.' } });
        }
    } catch (error) {
        res.json({ error });
    }
};

export = {
    userInformation,
    addTodo,
    updateTodo,
    deleteTodo,
    registerUser,
    loginUser
};