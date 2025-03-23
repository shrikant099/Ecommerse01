import mongoose from "mongoose";

const connect_db = async (req , res) => {

    try {
        await mongoose.connect("mongodb+srv://studentManagnent:studentManagmentSystem@studentmangment.qz0fw.mongodb.net/?retryWrites=true&w=majority&appName=studentMangment" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully.");

    } catch (error) {
        console.log(`Mongodb connection error !! ${error}`);
        
    }
};
export {
    connect_db
}