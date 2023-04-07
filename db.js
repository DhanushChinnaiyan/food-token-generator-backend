import mongoose from "mongoose";


const databaseconnection = () => {
    const params = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        mongoose.connect("mongodb+srv://dhanush:621417114021@cluster0.yv1vvqj.mongodb.net/foodCompony?retryWrites=true&w=majority",params)
        console.log("Mongodb connected")
    } catch (error) {
        console.log("Mongodb connection error",error)
    }
}

export default databaseconnection;
