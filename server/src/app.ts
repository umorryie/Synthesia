import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { userRouter } = require('./router/UserRouter');
require("./database/connection");
const app = express();
const port = process.env.PORT || 3003;
const userApiEndPoint = '/api/users/';

app.use(cors());
app.use(bodyParser.json());
app.use(userApiEndPoint, userRouter);

app.listen(port, () => {
    return console.log(`Server is listening on port: ${port}`);
});