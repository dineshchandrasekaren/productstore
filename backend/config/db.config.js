import mongoose from "mongoose";

function dbConfig() {
    
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("db is connected");
        
    }).catch(()=>{console.log("error in db");
    })
}
export default dbConfig;

