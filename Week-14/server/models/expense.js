import mongoose from "mongoose";
import {transporter} from "../helper/mail-transporter.js";

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

expenseSchema.methods.sendMail = async function(email){
  try{
    var mailOptions = {
      from: "barash.tanmoy@hotmail.com",
      to: email,
      subject: "New Expense Added",
      text: `${this.amount} is debited.`
    }
    transporter.sendMail(mailOptions, function(error, info){
      if (error) console.log(error);
      else console.log('Email sent: ' + info.response);
    });
    return;
  }
  catch(error){
    next(error)
  }
} 

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;