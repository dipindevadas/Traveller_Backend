//import db.js

const db=require("./db")
//import jsonwebtoken

 const jwt=require('jsonwebtoken')

userDetails={
    amal:{username:"amal",password:1000,email:"amal@apv.com"},
    anu:{username:"anu",password:1001,email:"anu@apv.com"},
    arun:{username:"arun",password:1002,email:"arun@apv.com"},
    sarah:{username:"sarah",password:1003,email:"sarah@apv.com"}
  }




 //get all packages from db
 const getPackages=()=>{
    return db.Package.find().then(
       (result)=>{
           if(result){
               return{
                   status:true,
                   statusCode:200,
                   Packages:result
               }
           }
           else{
               return{
                   status:false,
                   statusCode:404,
                   message:'No packages found'
               }
           }
       }
    )
  }
 

//  register

const register=(uname,pwd,email)=>{
   return db.User.findOne({uname})
   .then(user=>{
        if(user){
            return {
                statusCode:401,
                status:false,
                message:"user already exist"
            }
                
        } 
        else{
            const newuser=new db.User({
            
                uname,
                pwd,
                email

            })
            newuser.save();
            return {
                statusCode:200,
                status:true,
                message:"Registration successful"
            }
        }
    })

}

login=(uname,pwd)=>{
  
   return db.User.findOne({uname,pwd}).then(user=>{
    if(user){
        const token=jwt.sign({currentUser:uname},'secretkey123')
        return {
            statusCode:200,
            status:true,
            message:"login success",
           
            currentUser:user.uname,
            currentPwd:user.pwd,
            
            token
         }
          
        }
        else{
            return {
                statusCode:400,
                status:false,
                message:"Incurrect Password or Username"
              }

        }
    }
   )
}
    

   





   const getpackagedetail=(id)=>{
    return db.Package.findOne({id})
    .then(result => {
        if (result) {

            return {
                statusCode: 200,
                status: true,
                movies:result
            }
        }
        else {
            return {
                
                status: false,
                statusCode: 404,
                message: 'No items available'
            }
        }
    })
}

   

   const addtobooking=(id, packageName,days,person,description,price,productImage
   )=>{
    return db.Package.findOne(id).then(
       (result)=>{
           if(result){
               return{
                   status:true,
                   statusCode:200,
                   message:""
               }
           }
           else{
            const newProduct = new db.Booking({id, packageName,days,person,description,price,productImage })
            newProduct.save()//
            return{
                status:true,
                statusCode:200,
                message:''
                
            }
               
                  
               }
           }
    )
       }
    


       
  

module.exports={
    register,
    login,
    getPackages,
    
    
}
// 
  

