const catchAsync = require("../utils/catchAsync");
const multer=require('multer')
const sharp=require('sharp');
const User = require("../Model/userModel");

const multerStorage= multer.memoryStorage()
const filter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new AppError('Not an image! Please upload image', 400), false);
    }
  };

const upload=multer({
    storage:multerStorage,
    fileFilter:filter
})

exports.uploadUserProfile=upload.single('photo')

exports.uploadProfilePhoto=catchAsync(async (req,res,next)=>{
  if(!req.file) return next()
   let filename=`${req.user._id}-${Date.now()}.jpeg`
  req.file.filename=`${Date.now()}.jpeg`
  await sharp(req.file.buffer)
  .resize(500,500)
  .toFormat('jpeg')
  .jpeg({quality:90})
  .toFile(`Public/img/profiles/${filename}`)

  await User.findByIdAndUpdate(req.user._id,{profile:filename})

  next()
})

