import mongoose from "mongoose";

const Schema = mongoose.Schema;

const alternativeSchema = new Schema({
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

const alternative = mongoose.model('Alternative', alternativeSchema);
export default alternative;