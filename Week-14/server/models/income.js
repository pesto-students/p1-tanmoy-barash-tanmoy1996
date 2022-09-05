import mongoose from "mongoose";
import {transporter} from "../helper/mail-transporter.js";

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

incomeSchema.methods.sendMail = async function(email){
  try{
    var mailOptions = {
      from: "barash.tanmoy@hotmail.com",
      to: email,
      subject: "New Income Added",
      text: `${this.amount} is credited.`
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

const Income = mongoose.model('Income', incomeSchema);
export default Income;