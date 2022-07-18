import express from 'express';
import createError from 'http-errors';
import Asset from '../models/asset.js';
import Equity from '../models/equity.js';
import Alternative from '../models/alternative.js';
import FixedIncome from '../models/fixed-income.js';
import Income from '../models/income.js';
import Expense from '../models/expense.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req,res, next)=>{
  try {
    var startDate = new Date(new Date().getFullYear() , 3, 1)
    var endDate = new Date(new Date().getFullYear()+1 , 2, 31)

    const userId = req.query.userId;
    if(!userId) throw createError.UnprocessableEntity();
    
    const user = await User.findById(userId);
    if(!user) throw createError.NotFound(`User not registered`)

    if(req.query.financialyear){
      const financialyear = req.query.financialyear.split('-');
      if(financialyear[1]-financialyear[0]!=1 || financialyear[0]<2000) throw createError.UnprocessableEntity("Financial Year is not correct");
      startDate = new Date(+financialyear[0] , 3, 1)
      endDate = new Date(+financialyear[1], 2, 31)
    }
    else if(req.query.month){
      const month = req.query.month-1;

      if(month<0 || month>12) throw createError.UnprocessableEntity("Month is not correct");
      startDate = new Date(new Date().getFullYear(), month, 1);
      endDate = new Date(new Date().getFullYear(), month+1, 0);
    }

    const savings = await calcSavings(userId,startDate,endDate);    
    res.send(savings);
  } catch (error) {
    next(error);
  }  
})


const calcSavings = async(userId,startDate,endDate)=>{
  const asset = await Asset.find({
        userId: userId, 
        purchaseDate: {  $gte: startDate, $lt: endDate }
      });
  const assetAmt = asset.map(i=>i.price).reduce((a,c)=>{return a+c},0);

  const equity = await Equity.find({
        userId: userId, 
        purchaseDate: {  $gte: startDate, $lt: endDate }
      });
  const equityAmt = equity.map(i=>i.price).reduce((a,c)=>{return a+c},0);

  const alternative = await Alternative.find({
        userId: userId, 
        purchaseDate: {  $gte: startDate, $lt: endDate }
      });
  const alternativeAmt = alternative.map(i=>i.price).reduce((a,c)=>{return a+c},0);

  const fixedIncome = await FixedIncome.find({
        userId: userId,
      });
  const fixedIncomeAmt = fixedIncome.map((i)=>{
    if(i.frequency=='monthly') return i.amount*12;
    else if(i.frequency=='quaterly') return i.amount*4;
    else return i.amount
  }).reduce((a,c)=>{return a+c},0);
  const income = await Income.find({
        userId: userId, 
        creditDate: {  $gte: startDate, $lt: endDate }
      });
  const incomeAmt = income.map(i=>i.amount).reduce((a,c)=>{return a+c},0);
  const expense = await Expense.find({
        userId: userId, 
        debitDate: {  $gte: startDate, $lt: endDate }
      });
  const expenseAmt = expense.map(i=>i.amount).reduce((a,c)=>{return a+c},0);
  return {
    asset: assetAmt,
    equity: equityAmt,
    alternative: alternativeAmt,
    savings: fixedIncomeAmt + incomeAmt - expenseAmt
  }
}

export default router;
