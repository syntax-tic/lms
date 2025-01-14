const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const Home = (req, res) =>{
    try {
        res.status(200).send("Welcome to registration page");
    } catch (error) {
        console.log(error);
    }
}

const Register = async (req, res) => {
    try {
       const {username, email, password, role} = req.body;

        const userExists = await User.findOne({ email: email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCreated = await User.create({username, email, password:hashedPassword, role});
        res.status(200).json({ message: 'Registration successful', token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    } catch (err) {
        console.error(err);  // Log any errors for debugging
        res.status(500).json({ message: "Error" });
    }
};


const Login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const userExists = await User.findOne({email: email});

        if(!userExists){
            return res.status(400).json({message: "User does not exist"});
        }
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if(!passwordMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        return res.status(200).json({message: "Login successful", token: await userExists.generateToken(), userId: userExists._id.toString()});
    }catch(err){
        console.log(err);
    }
}

module.exports = {Home, Register, Login}