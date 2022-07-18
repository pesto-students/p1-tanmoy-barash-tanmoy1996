import express from 'express';
import createError from 'http-errors';

import {signAccessToken} from '../helper/jwt.js'
import User from '../models/user.js';
import { signupValidation, loginValidation } from '../helper/joi-validation.js';

const router = express.Router();

router.post('/signup', async (req,res, next)=>{
  try {
    const sanitisedUser = await signupValidation.validateAsync(req.body);
    const userExist = await User.findOne({email:sanitisedUser.email});
    if(userExist){
      throw createError.Conflict(`${sanitisedUser.email} is already registered`)
    }
    else{
      const user = new User(sanitisedUser);
      const savedUser = await user.save();
      const accessToken = await signAccessToken(savedUser.id);
      res.send({
        email:savedUser.email,
        id:savedUser.id,
        token: accessToken});    
    }
  } catch (error) {
    if(error.isJoi === true){
      error.status = 422;
    }
    next(error);
  }
})

router.post('/login', async (req,res, next)=>{
  try {
    const sanitisedUser = await loginValidation.validateAsync(req.body);
    const user = await User.findOne({email: sanitisedUser.email})
    
    if(!user) throw createError.NotFound(`User not registered`)
    const isMatch = await user.isValidPassword(sanitisedUser.password)
    if(!isMatch) throw createError.Unauthorized('User not registered');

    const accessToken = await signAccessToken(user.id);
    res.send({
      name: user.name,
      email:user.email,
      id:user.id,
      token: accessToken});
  }
  catch (error) {
    if(error.isJoi === true){
      return next(createError.BadRequest('Invalid Username/Password'))
    }
    next(error);
  }
})

export default router;
