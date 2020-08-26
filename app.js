import Application from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import config from './config/app';
import routes from './routes';

class App {
    constructor() {
        this.app = new Application();
        this._setConfig();
        this._setMongoConfig();
    }

    _setConfig() {
        this.app.use(cors());
        this.app.use(bodyParser());
        this.app.use(routes());
    }

    _setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            .then(() => console.log('MongoDB Connected'))
            .catch(err => console.log(err));
    }

    getInstance() {
        return this.app;
    }
}

export default App;