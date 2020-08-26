import App from "./app";
import bootstrap from './config/app';

class Server {
    constructor(app) {
        this.app = app
    }
    start() {
        const { PORT } = bootstrap;
        console.log(`Phone application app listening on port ${PORT} go to http://localhost:${PORT}`)
        return this.app.listen(PORT);
    }
}

const app = new App();
const server = new Server(app.getInstance());
server.start();