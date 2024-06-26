const express = require('express')
const dotenv = require('dotenv')
const connectDbPG = require('./config/db');
const connectDbMG = require('./config/db');
const handshakeRoute = require('./Routes/handshake')
const secureRoute = require('./Routes/secureServer')
const cors = require('cors')
dotenv.config({path: './config/config.env'});
const app = express()
app.use(express.json())
const PORT = process.env.PORT
// connectDbPG();
// connectDbMG();
app.use(cors())

app.use('/handshake',handshakeRoute)
app.use('/api',secureRoute)

const server = app.listen(PORT, () => {
    console.log('Backend Server listening on port ',PORT);
});

process.on('unhandledRejection',(err,promise) =>{
    console.log(err);
    server.close(()=>process.exit(1));
})