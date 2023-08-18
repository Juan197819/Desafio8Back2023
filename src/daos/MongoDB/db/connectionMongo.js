import mongoose from "mongoose";
import config from "../../../config/config.js";
try {
    let url
    if (config.NODE_ENV=='development') {
        url = 'mongodb://localhost:27017/ecommerceLocal'
        console.log('Local MongoDB database -- Development environment')
    } else {
        url=config.MONGO_ATLAS
        console.log('MongoDB ATLAS database in the cloud -- Production environment')
    }
    await mongoose.connect(url)
    console.log('MongoDB Database connected!!')
} catch (error) {
    throw error
}