import express from 'express';
import createError from 'http-errors';
import FixedIncome from '../models/fixed-income.js';
import User from '../models/user.js';
import { newfixedIncomeValidation, updatefixedIncomeValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedFixedIncome = await newfixedIncomeValidation.validateAsync(req.body);

    const user = await User.findOne({id: validatedFixedIncome.userId});
    if(!user) throw createError.NotFound(`User not registered`)

    const fixedIncome = new FixedIncome(validatedFixedIncome);
    const savedFixedIncome = await fixedIncome.save();
    res.send({
      title: savedFixedIncome.title,
      amount: savedFixedIncome.amount,
      frequency: savedFixedIncome.frequency,
      source: savedFixedIncome.source,
      id: savedFixedIncome.id,
      createdAt: savedFixedIncome.createdAt
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

    const fixedIncomes = await FixedIncome.find({userId: userId});
    res.send(fixedIncomes)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedFixedIncome = await updatefixedIncomeValidation.validateAsync(req.body);
    
    const fixedIncome = await FixedIncome.findById(validatedFixedIncome.id);
    if(!fixedIncome) throw createError.NotFound(`FixedIncome not present`)

    Object.assign(fixedIncome,validatedFixedIncome);
    const savedFixedIncome = await fixedIncome.save();

    res.send({
      title: savedFixedIncome.title,
      amount: savedFixedIncome.amount,
      frequency: savedFixedIncome.frequency,
      source: savedFixedIncome.source,
      id: savedFixedIncome.id,
      createdAt: savedFixedIncome.createdAt
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

    const fixedIncome = await FixedIncome.findById(id);
    if(!fixedIncome) throw createError.NotFound(`FixedIncome not found`)
    const removedFixedIncome = await fixedIncome.remove();
    res.send({
      title: removedFixedIncome.title,
      amount: removedFixedIncome.amount,
      frequency: removedFixedIncome.frequency,
      source: removedFixedIncome.source,
      id: removedFixedIncome.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
