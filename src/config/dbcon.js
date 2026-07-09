const mongoose=require('mongoose');

const DBConnect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URL)
        if(connection){
            console.log("Mongodb connected successfully")
        }else{
            console.log("db not connected")
        }
       
    }catch(err){
        console.log(err)
    }
}

module.exports=DBConnect