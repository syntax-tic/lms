const mongoose = require('mongoose');
const { unique } = require('next/dist/build/utils');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});


userSchema.methods.generateToken = async function(){
    return await jwt.sign({
        id: this._id.toString(),
        email: this.email,
        role: this.role
    }, process.env.JWT_SECRET)
}
const User = mongoose.model('User', userSchema);

module.exports = User