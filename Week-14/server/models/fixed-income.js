import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fixedIncomeSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  amount:{
    type:Number,
    required: true,
  },
  frequency:{
    type:String,
    required: true
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

const FixedIncome = mongoose.model('FixedIncome', fixedIncomeSchema);
export default FixedIncome;