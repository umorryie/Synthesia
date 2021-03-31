import path from 'path';
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

const config = {
    jwtSecret: process.env.JWT_SECRET || "testSecret",
    mongoDbUri: process.env.MONGODB_URI || ""
}

export default { config };