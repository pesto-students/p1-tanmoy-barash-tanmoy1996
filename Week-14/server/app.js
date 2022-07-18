import express from 'express'
import createError from 'http-errors';
import 'dotenv/config';
import './helper/connect-mongo.js';
import {verifyAccessToken} from './helper/jwt.js'
import UserRoute from './router/user.js'
import AssetRoute from './router/asset.js'
import EquityRoute from './router/equity.js'
import AlternativeRoute from './router/alternative.js'
import FixedIncomeRoute from './router/fixed-income.js'
import IncomeRoute from './router/income.js'
import ExpenseRoute from './router/expense.js'
import SummeryRoute from './router/summery.js'
import StatementRoute from './router/statement.js'
import UploadFileRoute from './router/upload.js'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT,()=>{
  console.log("Connect to PORT "+process.env.PORT)
})

app.get('/', async(req,res,next)=>{ res.send("Hello Buddy!!!");})
app.get('/api', verifyAccessToken, async(req,res,next)=>{ res.send(new Date().toDateString());})
app.use('/api/user/', UserRoute);
app.use('/api/asset/', verifyAccessToken, AssetRoute);
app.use('/api/equity/', verifyAccessToken, EquityRoute);
app.use('/api/alternative/', verifyAccessToken, AlternativeRoute);
app.use('/api/fixedincome/', verifyAccessToken, FixedIncomeRoute);
app.use('/api/income/', verifyAccessToken, IncomeRoute);
app.use('/api/expense/', verifyAccessToken, ExpenseRoute);
app.use('/api/summery/', verifyAccessToken, SummeryRoute);
app.use('/api/statement/', verifyAccessToken, StatementRoute);
app.use('/api/upload/', verifyAccessToken, UploadFileRoute);

app.use((req, res, next)=>{
  next(createError.NotFound())
})

app.use((err, req, res, next)=>{
  res.status(err.status || 500)
  res.send({
    error:{
      status: err.status || 500,
      message: err.message,
    }
  })
})

