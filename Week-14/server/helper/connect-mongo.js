import mongoose from "mongoose";

mongoose
  .connect(process.env.dbURI,{ dbName: process.env.dbName })
  .then(()=>{ console.log('mongoose connected'); })
  .catch((err)=>{ console.log("Error is connecting DB") });

  mongoose.connection.on('connected',()=>{ console.log("Mongoose connection ON") })
  mongoose.connection.on('error',(err)=>{ console.log(err.message); })
  mongoose.connection.on('disconnected',()=>{ console.log("Mongoose connected OFF")})

  process.on('SIGINT', async()=>{
    await mongoose.connection.close(); 
    process.exit(0);
  })
