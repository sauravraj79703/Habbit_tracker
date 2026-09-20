const userdata = require("../models/usermodel");
const jwt = require("jsonwebtoken");


exports.authMiddleware = async (req, res, next) => {
        
    try {  
        const token = req.cookies.token;

         //token validation 
        if (!token) {                                     
            return res.status(401).json({ msg: "No token provided" });
        }

        // verifying secret key of jwt
        const matchtoken = jwt.verify(token, process.env.SECRET_KEY);
        if (!matchtoken) {
            return res.status(400).json({ msg: "User is not valid" });
        }
        // console.log(matchtoken)
        // finding user
        const validuser = await userdata.findOne({_id:matchtoken._id});
        if (!validuser) {
            return res.status(404).json({ msg: "User not found" });
        }

        //attaching user to req body
        req.user = validuser;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Authentication failed", error: err.message });
    }
};



