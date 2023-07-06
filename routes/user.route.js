var express = require('express');
var router = express.Router();
const db = require('../db/db.js')

var {login}=require("../models/user.models.js")

/***
* @route Get api/auth/login
* @desc Login user
*/
router.post("/login",db.login);
