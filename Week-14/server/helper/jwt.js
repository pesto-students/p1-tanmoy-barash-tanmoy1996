import jwt from 'jsonwebtoken'
import createError from 'http-errors';

const signAccessToken = (userId) =>{
  return new Promise((res,rej)=>{
    jwt.sign({}, process.env.JWT_SECRET, { audience: userId }, (err,token)=>{
      if(err){
        console.log(err.message)
        reject(createError.InternalServerError())
      }
      res(token)
    })
  })
}

const verifyAccessToken = (req, res, next)=>{
  // if accessToken not present
  if(!req.headers['authorization']) return next(createError.Unauthorized())
  const token = req.headers['authorization'].split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err,payload)=>{
    if(err){
      if(err.name === 'JsonWebTokenError') return next(createError.Unauthorized());
      return next(createError.Unauthorized(err.message));
    }
    req.payload = payload;
    next();
  });
}

export {signAccessToken, verifyAccessToken}