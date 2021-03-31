import config from '../config/config';

const jwt = require('jsonwebtoken');
const secret = config.config.jwtSecret;

const verifyToken = (req: any, res: any, next: any) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            const { email } = jwt.verify(token, secret);

            if (email) {
                req.body.email = email;
                next();
            } else {
                return res.status(200).json({
                    error: {
                        message: "No email specified in token."
                    }
                })
            }
        } else {
            return res.status(200).json({
                error: {
                    message: "No token specified."
                }
            });
        }
    } catch (error) {
        console.log(`Error with decoding of token with an error: ${error}!`);
        return res.status(200).json({ error });
    }

}

export {
    verifyToken
}