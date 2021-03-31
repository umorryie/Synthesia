import config from '../config/config';
import jwt from 'jsonwebtoken';
import { IUserEmailInterface } from '../Interfaces/IUserEmailInterface';
const secret = config.config.jwtSecret;

const generateToken = (data: IUserEmailInterface) => {
    const token = jwt.sign(data, secret, { expiresIn: '100d' });

    return token;
}

export {
    generateToken
}
