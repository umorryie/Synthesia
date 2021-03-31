import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    dueDate: {
        type: Date,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    done: {
        type: Boolean,
        require: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

export {
    Task,
    TaskSchema
}
