const Pool = require('pg').Pool
const mongoose = require('mongoose');

const connectDbMG = async () => {
    
    const conn = await mongoose.connect(process.env.URI_MONGODB,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
}

// module.exports = connectDbPG;
module.exports = connectDbMG;
