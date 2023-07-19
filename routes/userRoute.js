const express = require('express');

const {home,createuser,getusers, deleteuser, edituser} = require("../controllers/userController.js");

const router = express.Router();
router.get("/",home);
router.post('/createuser', createuser);
router.get('/getusers',getusers);
router.put('/edituser/:uid',edituser);
router.delete('/deleteuser/:uid',deleteuser);



module.exports = router