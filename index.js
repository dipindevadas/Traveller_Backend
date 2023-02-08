//import cors
const cors=require('cors')

//import dataservice fill from service folder
const dataservice=require('./service/dataService')
// import express
const express = require('express')

const jwt=require('jsonwebtoken')



// import mongoose
// const mongoose = require('mongoose')

// create app

const app = express()


//connect frontend
app.use(cors({origin:'http://localhost:4200'}))





// to convert json datas
app.use(express.json())



//middleware for verify the token
const jwtmiddleware=(req,res,next)=>{
    console.log("router specific middleware");
    try{
    const token=req.body.token
    const data=jwt.verify(token,"secretkey123")
    console.log(data);
    next()
}
catch{
    res.status(422).json({
        statusCode:422,
        status:false,
        message:"please login"
    })
}

}




//give command  to share dat via cors
// app.use(cors({
//     origin:'http//localhost:4200'
// }))


// request

// GET

// app.get('/',(req,res)=>{
//     res.send('GET Method checking')
// })


// register

app.post('/register',(req,res)=>{
   console.log(req.body);
    dataservice.register(req.body.uname,req.body.pwd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    

    // console.log(req.body);
})

app.post('/login',(req,res)=>{

    dataservice.login(req.body.uname,req.body.pwd).then(result=>{
        res.status(result.statusCode).json(result)

    })
     
    // console.log(req.body);
})
//api to get all packages

app.get('/packages',(req,res)=>{
    dataservice.getPackages().then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )

})




app.post('/addtobooking',(req,res)=>{
    dataservice.addtobooking(req.body.id,req.body.packageName,req.body.days,req.body.person,req.body.description,req.body.price,req.body.productImage).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )

})



app.post('/package-details', (req, res) => {
    dataservice.getpackagedetail(req.body.id)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})




// set port

app.listen(3003,()=>{
    console.log("listening on port 3003");
})