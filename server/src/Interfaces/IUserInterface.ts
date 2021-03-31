import ITaskInterface from './ITaskInterface';

export default interface IUserInterface {
    name: string;
    surname: string;
    email: string;
    password: string;
    todoTasks: ITaskInterface[];
}