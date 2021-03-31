import mongoose from 'mongoose';
import passwordHash from 'password-hash';
import validator from 'validator';
import { TaskSchema } from '../taskSchema/TaskSchema';
import IUserInterface from '../../Interfaces/IUserInterface';

const User = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 1
    },
    surname: {
        type: String,
        require: true,
        minLength: 1
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(email: string) {
            if (!validator.isEmail(email)) {
                throw new Error("Require valid email");
            }
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 8,
        validate(pw: string) {
            if (pw.length < 8) {
                throw new Error("Password not long enough.");
            }
            if (pw === "password") {
                throw new Error("Password shall not be: password");
            }
            if (!/^(?=.*[0-9])(?=.*[!@#$%^&*=!"<>])/.test(pw)) {
                throw new Error("Password must contain special character and number!");
            }
        }
    },
    todoTasks: {
        type: [TaskSchema],
        default: []
    },
});

const UserSchema = mongoose.model('UserSchema', User);

export default UserSchema;
