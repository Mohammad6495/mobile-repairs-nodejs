import mongoose from "mongoose";

const connectetionString = "mongodb://127.0.0.1:27017/mobile-repair-db";


const connectionDbApp = async () => {
    try {
        await mongoose.connect(connectetionString);
        console.log('Db Connected');
        
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
}

export default connectionDbApp