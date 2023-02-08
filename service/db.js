//server mongoDB integration

//1.import mongoose

const mongoose=require('mongoose')

//2 state connection string via mongoose

mongoose.connect('mongodb://localhost:27017/tourServer',{useNewUrlParser:true},()=>{
    console.log('connected to mongodb');
})




//model creation for package

const Package=mongoose.model('Package',{
  
    id:Number,
    categoryId:Number,
    packageName:String,
    days:Number,
    person:Number,
    description:String,
    rating:{
        rate:Number,
        count:Number
    },
    price:Number,
    isAvailable:String,
    productImage:String

})

//3.define a bank database model

const User=mongoose.model('User',{
   
    uname:String,
    pwd:Number,
    email:String
})




// const Booking = mongoose.model('booking',{

//     id:Number,
//     packageName:String,
//     days:Number,
//     person:Number,
//     description:String,
//     price:Number,
//     productImage:String

// })





//4.export the schema to use in another files
module.exports={
    User,
    Package,
    // Booking
}