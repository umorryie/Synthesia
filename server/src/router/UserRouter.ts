import express from 'express';

const userRouter = express.Router();
const { userInformation, addTodo, updateTodo, deleteTodo, registerUser, loginUser } = require('../controller/UserController');
const { verifyToken } = require('../auth/verifyToken');
const { validateUserExistence } = require('../validation/UserExistence');

// Credentials
userRouter.post('/register', registerUser);
userRouter.post('/login', validateUserExistence, loginUser);

// Get information about user
userRouter.get('/todo/list', [verifyToken, validateUserExistence], userInformation);

// Update, delete, add todo
userRouter.post('/todo/add', [verifyToken, validateUserExistence], addTodo);
userRouter.put('/todo/update', [verifyToken, validateUserExistence], updateTodo);
userRouter.delete('/todo/delete', [verifyToken, validateUserExistence], deleteTodo);

export = {
    userRouter
}
