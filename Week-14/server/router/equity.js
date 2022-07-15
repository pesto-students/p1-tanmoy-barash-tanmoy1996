import express from 'express';
import createError from 'http-errors';
import Equity from '../models/equity.js';
import User from '../models/user.js';
import { newWealthValidation, updateWealthValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedEquity = await newWealthValidation.validateAsync(req.body);

    const user = await User.findOne({id: validatedEquity.userId});
    if(!user) throw createError.NotFound(`User not registered`)

    const equity = new Equity(validatedEquity);
    const savedEquity = await equity.save();
    res.send({
      name: savedEquity.name,
      price: savedEquity.price,
      purchaseDate: savedEquity.purchaseDate,
      id: savedEquity.id,
      createdAt: savedEquity.createdAt
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

    const equities = await Equity.find({userId: userId});
    res.send(equities)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedEquity = await updateWealthValidation.validateAsync(req.body);
    
    const equity = await Equity.findById(validatedEquity.id);
    if(!equity) throw createError.NotFound(`Equity not present`)

    Object.assign(equity,validatedEquity);
    const savedEquity = await equity.save();

    res.send({
      name: savedEquity.name,
      price: savedEquity.price,
      purchaseDate: savedEquity.purchaseDate,
      id: savedEquity.id,
      createdAt: savedEquity.createdAt
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

    const equity = await Equity.findById(id);
    if(!equity) throw createError.NotFound(`Equity not found`)
    const removedEquity = await equity.remove();
    res.send({
      name: removedEquity.name,
      price: removedEquity.price,
      purchaseDate: removedEquity.purchaseDate,
      id: removedEquity.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
