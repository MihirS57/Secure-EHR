const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const connectDb = () => {
    try{
        const connKey = mongoose.createConnection(process.env.URI_MONGODB_KEY,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log(`Key Server connected: ${connKey.readyState}`);        
        
        const connDB = mongoose.createConnection(process.env.URI_MONGODB_DB,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log(`DB connected: ${connDB.readyState}`);
        return {connKey,connDB}
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
    
}

module.exports = connectDb;