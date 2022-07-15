import mongoose from "mongoose";

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  amount:{
    type:Number,
    required: true,
  },
  creditDate:{
    type:Date,
  },
  source:{
    type:String,
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

const Income = mongoose.model('Income', incomeSchema);
export default Income;