import 'dotenv/config'

export default {
    NODE_ENV: process.env.NODE_ENV,
    PERSISTENCIA: process.env.PERSISTENCIA,
    MONGO_ATLAS: process.env.MONGO_ATLAS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
}
