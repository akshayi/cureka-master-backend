//---------Importing NodeJS Packages Starts--------------
const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

//---------Importing NodeJS Packages Ends--------------

//---------Importing Models Schemas Starts--------------
const Attribute = require('../models/attribute');
const Cause = require('../models/cause');
const Medicine = require('../models/medicine');

//---------Importing Models Schemas Ends--------------


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/checkauth', (req, res) => {
  if(req.isAuthenticated()){
    return res.json({"status":true,"message":"Valid User","data":res.user})
  }else{
    return res.json({"status":false,"message":"Invalid User"})
  }
});

//-------------FILE UPLOADS STARTS----------------
var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage : storage,fileFilter: function (req, file, cb) {
  var filetypes = /jpeg|jpg|png/;
  var mimetype = filetypes.test(file.mimetype);
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
  }},{limits : {fileSize : 1000}}).single('file');
router.post("/uploadImage", function (req, res) {
  upload(req,res,function(err) {
      if(err) {
          return res.json({"status":false,"message":err});
      }
      return res.json({"status":true,"message":"Successfully Saved","data":req.file.filename});
  });
});

//-------------FILE UPLOADS ENDS----------------

//---------------MEDICINES MODULES STARTS-------------------------
router.post('/add-medicines',isLoggedIn, async function(req, res){
    if(req.body.name==''){
      return res.json({"status":false,"message":"Medicine Name is Blank"});
    }
    Medicine.findOne({'name':req.body.name},function(err,medicine){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else if(medicine){
        return res.json({"status":false,"message":"Name Already Exist"});
      }else{
        var newMedicine = new Medicine();
        newMedicine.name = req.body.name;
        newMedicine.imagepath = req.body.filepath;
        newMedicine.attribute = req.body.attributes;
        newMedicine.save(async function(err) {
            if (err){
              return res.json({"status":false,"message":"Server Error"});
            }else{
              const data =  await getAllMedicines();
              return res.json({"status":true,"message":"Successfully Saved", 'data': data});
            }
        });
      }
    })
});

router.post('/remove-medicines',isLoggedIn, async function(req, res){
    if(req.body.id==''){
      return res.json({"status":false,"message":"Id is Blank"});
    }
    Medicine.deleteOne({_id:req.body.id},async function(err,result){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else{
        const data =  await getAllMedicines();
        return res.json({"status":true,"message":"Deleted Successfully", 'data': data});
      }
    })
});

router.get('/get-medicines',isLoggedIn, async function(req, res){
        const data =  await getAllMedicines();
        return res.json({"status":true,"message":"Data Fetched Successfully", 'data': data});
});

//---------------MEDICINES MODULES ENDS-------------------------


//---------------CAUSES MODULES STARTS-------------------------
router.post('/add-causes',isLoggedIn, async function(req, res){
    if(req.body.name==''){
      return res.json({"status":false,"message":"Cause Name is Blank"});
    }
    Cause.findOne({'name':req.body.name},function(err,cause){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else if(cause){
        return res.json({"status":false,"message":"Name Already Exist"});
      }else{
        var newCause = new Cause();
        newCause.name = req.body.name;
        newCause.is_image = req.body.is_image;
        newCause.save(async function(err) {
            if (err){
              return res.json({"status":false,"message":"Server Error"});
            }else{
              const data =  await getAllCauses();
              return res.json({"status":true,"message":"Successfully Saved", 'data': data});
            }
        });
      }
    })
});

router.post('/remove-causes',isLoggedIn, async function(req, res){
    if(req.body.id==''){
      return res.json({"status":false,"message":"Id is Blank"});
    }
    Cause.deleteOne({_id:req.body.id},async function(err,result){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else{
        const data =  await getAllCauses();
        return res.json({"status":true,"message":"Deleted Successfully", 'data': data});
      }
    })
});

router.get('/get-causes',isLoggedIn, async function(req, res){
        const data =  await getAllCauses();
        return res.json({"status":true,"message":"Data Fetched Successfully", 'data': data});
});

//---------------CAUSES MODULES ENDS-------------------------

//---------------ATTRIBUTE MODULES STARTS-------------------------
router.post('/add-attributes',isLoggedIn, async function(req, res){
    if(req.body.reg_name=='' || req.body.shelf_name=='' || req.body.act_ingre=='' || req.body.strength=='' || req.body.dosage==''){
      return res.json({"status":false,"message":"All Fields Are Mandatory"});
    }
    Attribute.findOne({'name':req.body.name},function(err,attrubute){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else if(attrubute){
        return res.json({"status":false,"message":"Name Already Exist"});
      }else{
        var newAttribute = new Attribute();
        newAttribute.name = req.body.name;
        newAttribute.type = req.body.type;

        newAttribute.save(async function(err) {
            if (err){
              return res.json({"status":false,"message":"Server Error"});
            }else{
              const data =  await getAllAttributes();
              return res.json({"status":true,"message":"Successfully Saved", 'data': data});
            }
        });
      }
    })
});

router.post('/remove-attributes',isLoggedIn, async function(req, res){
    if(req.body.id==''){
      return res.json({"status":false,"message":"Id is Blank"});
    }
    Attribute.deleteOne({_id:req.body.id},async function(err,result){
      if(err){
        return res.json({"status":false,"message":"Server Error"});
      }else{
        const data =  await getAllAttributes();
        return res.json({"status":true,"message":"Deleted Successfully", 'data': data});
      }
    })
});

router.get('/get-attributes',isLoggedIn, async function(req, res){
        const data =  await getAllAttributes();
        return res.json({"status":true,"message":"Data Fetched Successfully", 'data': data});
});

//---------------ATTRIBUTE MODULES ENDS-------------------------


router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({"status":false,"message":"Invalid Credentials"})}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
       return res.json({'status':true,"message":"Logged In Successfully","data":user});
    });
  })(req, res, next);
});


//-------------- Helping Functions Starts---------------------
function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        return res.json({"status":false,"message":"Invalid Credentials"})
}

function getAllAttributes() {
  return new Promise((resolve, reject) => {
    Attribute.find(function(err,attrubute){
    if(err){
      reject([]);
    }else{
      resolve(attrubute);
    }
  })
})
}

function getAllCauses() {
  return new Promise((resolve, reject) => {
    Cause.find(function(err,causes){
    if(err){
      reject([]);
    }else{
      resolve(causes);
    }
  })
})
}

function getAllMedicines() {
  return new Promise((resolve, reject) => {
    Medicine.find(function(err,causes){
    if(err){
      reject([]);
    }else{
      resolve(causes);
    }
  })
})
}
//-------------- Helping Functions Ends---------------------
module.exports = router;
