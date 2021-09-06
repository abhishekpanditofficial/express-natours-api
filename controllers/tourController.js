const fs= require('fs');
const Tour = require('../models/tourModel');

const tours= JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID= (req,res,next,val) =>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
              status: 'fail',
              message: 'ID not exist'
          });
      }
}

exports.checkBody= (req,res,next) =>{
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'fail',
            message: 'Name or Price missing'
        });
    }
    next();
}


exports.getAllTours= async (req,res) =>{
  
    try {
        let query;
        //FILTERING
        const queryObj= {...req.query};
        const excludedFields= ['page','sort','limit','field'];

        excludedFields.forEach(el => delete queryObj[el]);
      

         //ADVANCED FILTERING
        let queryStr= JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);

        query= Tour.find(JSON.parse(queryStr));

        //SORTING
      if(req.query.sort){
          const sortBy= req.query.sort.split(',').join(' ');
          query= query.sort(sortBy);
      } else{
          query= query.sort('-createdAt');
      }      

        //FIELD-LIMITING
      if(req.query.fields){
          const fields= req.query.fields.spli(',').join(' ');
          query= query.select(fields);
      }else{
          query= query.select('-__v');
      }

        //PAGINATION
      const page= req.query.page * 1 || 1;
      const limit= req.query.limit * 1 || 100;
      const skip= (page - 1) * limit;

      query= query.skip(skip).limit(limit);

      if(req.query.page){
          const numTours= await Tour.countDocuments();
          if(skip >= numTours){
              throw new Error('Page doesnt exist');
          }
      }



        const tours= await query;
       
        res.status(200).json({
            status: 'success',
            results: tours.length,
            tours
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Cant Process Your Request Now',
            err: error
        });
    }
    
};

exports.createTour =async (req,res) =>{
  
  try {
    const newTour= await Tour.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    });  
  } catch (error) {
      res.status(404).json({
          status: 'fail',
          message: 'Cant Process Your Request Now',
          error: error
      });
  }
 };

exports.getTour= async (req,res) =>{
    
   try {
    const tour= await Tour.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        tour
    });
   } catch (error) {
       res.status(404).json({
          status: 'fail',
          message: 'Cant Process Your Request Now',
          error: error
      }); 
   }
   
  
 };

exports.updateTour= async (req,res) =>{
    try {
      const updatedTour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
          new: true,
          runValidators:true
      });
      res.status(200).json({
          status: 'success',
          data: {
              tour: updatedTour
          }
      })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Cant Process Your Request Now',
            error: error
        }); 
    }
};

exports.deleteTour= async (req,res)=>{
  try {
      const deletedTour= await Tour.findByIdAndDelete(req.params.id);
      res.status(200).json({
          status: 'success',
          data: null
      });
  } catch (error) {
    res.status(404).json({
        status: 'fail',
        message: 'Cant Process Your Request Now',
        error: error
    }); 
  }
};
