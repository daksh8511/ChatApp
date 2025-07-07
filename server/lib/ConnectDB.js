import mongoose from 'mongoose'

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database are successfully connected.")
    } catch (error) {
        console.log("Datebase connect to failed")
    }
}

export default ConnectDB;