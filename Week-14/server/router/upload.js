import express from 'express';
import createError from 'http-errors';
import multer from "multer";

const router = express.Router();

const fileStorage = multer.diskStorage({
  destination:(req, file, cb )=>{
    cb(null,"./files");
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now()+'.'+file.originalname.split('.').pop());
  },
});

const upload = multer({storage: fileStorage});

router.post('/', upload.single("file"), (req,res,next)=>{
  try {
    console.log(req.file)
    res.send(req.file);
  } catch (error) {
    next(error);
  }
});

export default router;