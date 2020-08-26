import dotenv from "dotenv"
dotenv.config({ path: ".env" })
const bootstrap = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: 'mongodb://127.0.0.1:27017',
    DEFAULT_LIVE_MESSAGE: 'Server is running...'
}

export default bootstrap;