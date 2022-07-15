import mongoose from "mongoose";

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  amount:{
    type:Number,
    required: true,
  },
  debitDate:{
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

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;