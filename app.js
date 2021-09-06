const express= require('express');
const morgan= require('morgan');
const tourRouter= require('./routes/tourRoutes');
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use((req,res,next) =>{
    console.log('Hello from the middleware');
    req.requestTime = new Date().toISOString();
    next();
});


 
app.use('/api/v1/tours',tourRouter);

module.exports =app;
