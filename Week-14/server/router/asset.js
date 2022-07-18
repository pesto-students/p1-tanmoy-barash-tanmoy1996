import express from 'express';
import createError from 'http-errors';
import Asset from '../models/asset.js';
import User from '../models/user.js';
import { newWealthValidation, updateWealthValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/', async (req,res, next)=>{
  try {
    const validatedAsset = await newWealthValidation.validateAsync(req.body);
    const user = await User.findOne({id: validatedAsset.userId});
    if(!user) throw createError.NotFound(`User not registered`)
    const asset = new Asset(validatedAsset);
    const savedAsset = await asset.save();
    res.send({
      name: savedAsset.name,
      price: savedAsset.price,
      purchaseDate: savedAsset.purchaseDate,
      id: savedAsset.id,
      createdAt: savedAsset.createdAt
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

    const assets = await Asset.find({userId: userId});
    res.send(assets)
  } catch (error) {
    next(error);
  }  
})

router.patch('/', async (req,res, next)=>{
  try {
    const validatedAsset = await updateWealthValidation.validateAsync(req.body);
    
    const asset = await Asset.findById(validatedAsset.id);
    if(!asset) throw createError.NotFound(`Asset not present`)

    Object.assign(asset,validatedAsset);
    const savedAsset = await asset.save();

    res.send({
      name: savedAsset.name,
      price: savedAsset.price,
      purchaseDate: savedAsset.purchaseDate,
      id: savedAsset.id,
      createdAt: savedAsset.createdAt
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

    const asset = await Asset.findById(id);
    if(!asset) throw createError.NotFound(`Asset not found`)
    const removedAsset = await asset.remove();
    res.send({
      name: removedAsset.name,
      price: removedAsset.price,
      purchaseDate: removedAsset.purchaseDate,
      id: removedAsset.id,
    });
  } catch (error) {
    next(error);
  }  
})

export default router;
