const express = require('express')
const dotenv = require('dotenv');
const connectDb = require('./config/db')
const cors = require('cors');
const keyRoute = require('./Routes/key')
const authRoute = require('./Routes/authentication')
const patientRoute = require('./Routes/patient')
const auditRoute = require('./Routes/audit')

dotenv.config({path: './config/config.env'});

const app = express()
const PORT = process.env.PORT

connectDb()

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/key',keyRoute);
app.use('/auth',authRoute);
app.use('/patient',patientRoute)
app.use('/audit',auditRoute)

const server = app.listen(PORT, () => {
    console.log('Auth Server listening on port ',PORT);
});

process.on('unhandledRejection',(err,promise) =>{
    console.log(err);
    server.close(()=>process.exit(1));
})