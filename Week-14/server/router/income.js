import express from 'express';
import createError from 'http-errors';
import Income from '../models/income.js';
import User from '../models/user.js';
import { newIncomeValidation, updateIncomeValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedIncome = await newIncomeValidation.validateAsync(req.body);
    
    const user = await User.findById(validatedIncome.userId);
    if(!user) throw createError.NotFound(`User not registered`)

    const income = new Income(validatedIncome);
    const savedIncome = await income.save();
    
    res.send({
      title: savedIncome.title,
      amount: savedIncome.amount,
      creditDate: savedIncome.creditDate,
      source: savedIncome.source,
      id: savedIncome.id,
      createdAt: savedIncome.createdAt
    });
  } catch (error) {
    if(error.isJoi === true) error.status = 422;
    next(error);
  }
})

router.get('/', async (req,res, next)=>{
  try {
    const userId = req.query.userId;
    if(!userId) throw createError.UnprocessableEntity();
    
    const user = await User.findById(userId);
    if(!user) throw createError.NotFound(`User not registered`)

    const fixedIncomes = await Income.find({userId: userId});
    res.send(fixedIncomes)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedIncome = await updateIncomeValidation.validateAsync(req.body);
    
    const income = await Income.findById(validatedIncome.id);
    if(!income) throw createError.NotFound(`Income not present`)

    Object.assign(income,validatedIncome);
    const savedIncome = await income.save();

    res.send({
      title: savedIncome.title,
      amount: savedIncome.amount,
      creditDate: savedIncome.creditDate,
      source: savedIncome.source,
      id: savedIncome.id,
      createdAt: savedIncome.createdAt
    });
  } catch (error) {
    if(error.isJoi === true) error.status = 422;
    next(error);
  }
})

router.delete('/', async (req,res, next)=>{
  try {
    const id = req.query.id;
    if(!id) throw createError.UnprocessableEntity();

    const income = await Income.findById(id);
    if(!income) throw createError.NotFound(`Income not found`)
    const removedIncome = await income.remove();
    res.send({
      title: removedIncome.title,
      amount: removedIncome.amount,
      creditDate: removedIncome.creditDate,
      source: removedIncome.source,
      id: removedIncome.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
