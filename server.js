const dotenv= require('dotenv');
dotenv.config({path: './config.env'});
const mongoose= require('mongoose');
const app = require('./app');


const port= process.env.PORT || 5000;

const DB= process.env.DATABASE_URL.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
     //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
   //  useFindAndModify: false
}).then((connection) => console.log('DATABASE CONNECTION SUCCESFULL'));


app.listen(port,()=>{
    console.log(`server started at ${port}`);
});