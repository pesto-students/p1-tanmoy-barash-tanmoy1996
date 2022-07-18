import Joi from '@hapi/joi';

const signupValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(8)
})

const loginValidation = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(8)
})

const newWealthValidation = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  purchaseDate: Joi.date(),
  userId: Joi.string().required(),
})

const updateWealthValidation = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  purchaseDate: Joi.date(),
  userId: Joi.string(),
  id: Joi.string().required(),
})

const newfixedIncomeValidation = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  frequency: Joi.string().valid('monthly','quaterly','yearly').required(),
  source: Joi.string(),
  userId: Joi.string().required(),
})

const updatefixedIncomeValidation = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  frequency: Joi.string().valid('monthly','quaterly','yearly'),
  source: Joi.string(),
  userId: Joi.string(),
  id: Joi.string().required(),
})

const newIncomeValidation = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  creditDate: Joi.date(),
  source: Joi.string(),
  userId: Joi.string().required(),
})

const updateIncomeValidation = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  creditDate: Joi.date(),
  source: Joi.string(),
  userId: Joi.string(),
  id: Joi.string().required(),
})

const newExpenseValidation = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  debitDate: Joi.date(),
  to: Joi.string(),
  userId: Joi.string().required(),
})

const updateExpenseValidation = Joi.object({
  title: Joi.string(),
  amount: Joi.number(),
  debitDate: Joi.date(),
  to: Joi.string(),
  userId: Joi.string(),
  id: Joi.string().required(),
})

export {
  signupValidation, 
  loginValidation, 
  newWealthValidation, 
  updateWealthValidation,
  newfixedIncomeValidation,
  updatefixedIncomeValidation,
  newIncomeValidation,
  updateIncomeValidation,
  newExpenseValidation,
  updateExpenseValidation
};