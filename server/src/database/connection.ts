import mongoose from "mongoose";
import config from '../config/config';
const uri: string = config.config.mongoDbUri;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));