const userdata=require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const signup =  async (req, res) => {
    try {
        const { name, email, password } = req.body; // data from user

        // Field check
        // if (!name || !email || !password) {
        //     return res.status(400).json({ msg: "All fields are required" });
        // }

        const isUser = await userdata.findOne({ email });  //validation to avoid multiple registration 
        if (isUser) {
            return res.status(400).json( {msg:"user already register"} );
        }

        //hashing password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        //saving user
        const newuser = new userdata({
            name,
            email,
           password:hashedPassword
        });
        await newuser.save();

        res.status(200).json({msg:"signup suucessfully"});
    } catch (err) {
        res.status(500).json({ msg: "error from signup", message: err.message });
    }
};


const login = async(req, res) => {
    try {   
    
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        //Email validation 
        const validuser = await userdata.findOne({ email });
        if (!validuser) {
            return res.status(400).json("You are not registered, please register first");
        }
  
         //password validation 
        const isMatch = await bcrypt.compare(password, validuser.password);  
        if (!isMatch) {
            return res.status(400).json("Password does not match");
        }

        //creating token with jwt 
        const token = jwt.sign(                                             
            { _id: validuser._id },//payload                                         
            process.env.SECRET_KEY
              
        )

        //sending token using cookies
        res.cookie('token', token, {
  httpOnly: true,
  secure: false, // true in production (HTTPS)
  sameSite: 'Lax',
  maxAge: 1000 * 60 * 60 // 1 hour
});


        res.status(200).json("login successful");
    } catch (err) {
        res.status(500).json({ msg: "error from login", message: err.message });
    }
};

module.exports={
    signup,
    login
}