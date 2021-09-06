const mongoose= require('mongoose');

const tourSchema= new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A Tour Must Have A Name!'],
        maxlength: [40, 'Tour name is so large'],
        minlength: [10, 'message']
    },
    rating:{
         type: Number,
         default: 4.5
    },
    slug: {
         type: String
    },
    duration:{
        type: Number,
        required: [true,'message']
    },
    maxGroupSize:{
        type: Number,
        required: [true, 'message']
    },
    difficulty:{
        type: String,
        required: [true,'message'],
        enum:{
            values: ['easy','medium','difficult'],
            message: ['You must select between easy,medium and difficult']
        },
    },
    ratingsAverage:{
        type: Number,
        min: [1,'message'],
        max: [5,'message'],
        default: 4.5,
        set: val => Math.round(val*10)/10
    },
    ratingsQuantity:{
        type:Number,
        default: 0
    },
    priceDiscount:{
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price;
            },
            message: 'DISCOUNT PRICE MUST BE LOWER THAN ACTUAL PRICE'
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true,'A Tour Must Have A Summary']
    },
    description:{
       type: String,
       trim: true,
    },
    imageCover:{
        type: String,
        required: [true,'message'],
    },
    images: [String],
    createdAt:{
        type:Date,
        default: Date.now(),
        select:false
    },
    startDates: [String],

    price:{
        type: Number,
        required: [true,'A Tour Must Have A Price']
    }
});

const Tour= mongoose.model('Tour',tourSchema);

module.exports = Tour;