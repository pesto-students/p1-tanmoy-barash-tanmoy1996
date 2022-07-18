import mongoose from "mongoose";

const Schema = mongoose.Schema;

const equitySchema = new Schema({
  name:{
    type:String,
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  purchaseDate:{
    type:Date,
  },
  userId:{
    type:String,
    required: true
  },
}, 
{
  timestamps:true,
  versionKey: false,
})

const equity = mongoose.model('Equity', equitySchema);
export default equity;