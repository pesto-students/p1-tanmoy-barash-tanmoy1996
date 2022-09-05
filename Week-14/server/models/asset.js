import mongoose from "mongoose";

const Schema = mongoose.Schema;

const assetSchema = new Schema({
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

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;