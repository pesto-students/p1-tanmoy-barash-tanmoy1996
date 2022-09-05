import express from 'express';
import createError from 'http-errors';

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

      if(month<0 || month>11) throw createError.UnprocessableEntity("Month is not correct");
      startDate = new Date(new Date().getFullYear(), month, 1);
      endDate = new Date(new Date().getFullYear(), month+1, 0);
    }

      var income = await Income.find({
        userId: userId, 
        creditDate: {  $gte: startDate, $lt: endDate }
      });
  
      var expense = await Expense.find({
        userId: userId, 
        debitDate: {  $gte: startDate, $lt: endDate }
      });
      
    const transaction = [...income, ...expense]
    res.send(transaction)
  } catch (error) {
    next(error);
  }  
})



export default router;
