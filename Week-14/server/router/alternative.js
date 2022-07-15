import express from 'express';
import createError from 'http-errors';
import Alternative from '../models/alternative.js';
import User from '../models/user.js';
import { newWealthValidation, updateWealthValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedAlternative = await newWealthValidation.validateAsync(req.body);

    const user = await User.findOne({id: validatedAlternative.userId});
    if(!user) throw createError.NotFound(`User not registered`)

    const alternative = new Alternative(validatedAlternative);
    const savedAlternative = await alternative.save();
    res.send({
      name: savedAlternative.name,
      price: savedAlternative.price,
      purchaseDate: savedAlternative.purchaseDate,
      id: savedAlternative.id,
      createdAt: savedAlternative.createdAt
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

    const alternatives = await Alternative.find({userId: userId});
    res.send(alternatives)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedAlternative = await updateWealthValidation.validateAsync(req.body);
    
    const alternative = await Alternative.findById(validatedAlternative.id);
    if(!alternative) throw createError.NotFound(`Alternative not present`)

    Object.assign(alternative,validatedAlternative);
    const savedAlternative = await alternative.save();

    res.send({
      name: savedAlternative.name,
      price: savedAlternative.price,
      purchaseDate: savedAlternative.purchaseDate,
      id: savedAlternative.id,
      createdAt: savedAlternative.createdAt
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

    const alternative = await Alternative.findById(id);
    if(!alternative) throw createError.NotFound(`Alternative not found`)
    const removedAlternative = await alternative.remove();
    res.send({
      name: removedAlternative.name,
      price: removedAlternative.price,
      purchaseDate: removedAlternative.purchaseDate,
      id: removedAlternative.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
