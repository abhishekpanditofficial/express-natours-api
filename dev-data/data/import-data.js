const dotenv= require('dotenv');
dotenv.config({path: './config.env'});
const mongoose= require('mongoose');
const fs= require('fs');
const Tour= require('../../models/tourModel');


const DB= process.env.DATABASE_URL.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
     //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
   //  useFindAndModify: false
}).then((connection) => console.log('DATABASE CONNECTION SUCCESFULL'));

const tours= JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const importData= async () =>{
    try {
        await Tour.create(tours,{validateBeforeSave: false});
        console.log('Data succesfully imported');
        process.exit(); 
    } catch (error) {
        console.log(error);
    }
}

const deleteData= async () =>{
    try {
        await Tour.deleteMany();
        console.log('Data Succesfully Deleted');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

//process
if(process.argv[2] === '--import'){
    importData();
}else if (process.argv[2] === '--delete'){
    deleteData();
}
