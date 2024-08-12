
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET,JWT_EXPIRES_TIME } = require('../config/config');

const userSchema = new mongoose.Schema({
    name : {
        type: String
      
    },
    email:{
        type: String,
       
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        maxlength: [6, 'Password cannot exceed 6 characters'],
        select: false
    },
    
    role :{
        type: String,
        default: 'user'
    },
    // resetPasswordToken: String,
    // resetPasswordTokenExpire: Date,
    createdAt :{
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password  = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id},JWT_SECRET, {
         expiresIn: JWT_EXPIRES_TIME
     })
 }

 
userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}

let model =  mongoose.model('User', userSchema);


module.exports = model;