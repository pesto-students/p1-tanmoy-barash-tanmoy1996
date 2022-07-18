import express from 'express';
import createError from 'http-errors';
import Expense from '../models/expense.js';
import User from '../models/user.js';
import { newExpenseValidation, updateExpenseValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedExpense = await newExpenseValidation.validateAsync(req.body);
    
    const user = await User.findById(validatedExpense.userId);
    if(!user) throw createError.NotFound(`User not registered`)

    const expense = new Expense(validatedExpense);
    const savedExpense = await expense.save();
    await expense.sendMail(user.email)
    res.send({
      title: savedExpense.title,
      amount: savedExpense.amount,
      debitDate: savedExpense.debitDate,
      to: savedExpense.to,
      id: savedExpense.id,
      createdAt: savedExpense.createdAt
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

    const fixedExpenses = await Expense.find({userId: userId});
    res.send(fixedExpenses)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedExpense = await updateExpenseValidation.validateAsync(req.body);
    
    const expense = await Expense.findById(validatedExpense.id);
    if(!expense) throw createError.NotFound(`Expense not present`)

    Object.assign(expense,validatedExpense);
    const savedExpense = await expense.save();

    res.send({
      title: savedExpense.title,
      amount: savedExpense.amount,
      debitDate: savedExpense.debitDate,
      to: savedExpense.to,
      id: savedExpense.id,
      createdAt: savedExpense.createdAt
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

    const expense = await Expense.findById(id);
    if(!expense) throw createError.NotFound(`Expense not found`)
    const removedExpense = await expense.remove();
    res.send({
      title: removedExpense.title,
      amount: removedExpense.amount,
      debitDate: removedExpense.debitDate,
      to: removedExpense.to,
      id: removedExpense.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
