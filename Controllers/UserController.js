const User = require("../Models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.secret_key

// User Registration
const userRegister = async(req,res)=>{
    const {details} = req.body
    const {username,email,password} = details ;
    try{
         const useremail = await User.findOne({email});
         if (useremail){
            return res.status(400).json({message:"User already exists"})
         }
         const hashedpassword = await bcrypt.hash(password,10)

         const newuser = new User(
            {username:username,
                email:email,
                password:hashedpassword
            }
         )

         await newuser.save();
         return res.status(201).json({message:"User Registered Successfully"})
    }
    catch(e){
           return res.status(500).json({message:`Internal Server Error : ${e}`})
    }

}

// User Login
const userLogin = async(req,res)=>{
    const {details} = req.body;
    const {email,password} = details;
    
    if (!details || !email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }
    

    try{
        const userExists = await User.findOne({email})
        if(!userExists){
            return res.status(400).json({message:"User doesnot exists!"})
        }
    
        const passwordComparison = await bcrypt.compare(password,userExists.password);
        if(!passwordComparison){
            return res.status(401).json({message:"Incorrect user details!"})
        }
    
        const token = jwt.sign({ userId: userExists._id },secretKey)
        
        return res.status(200).json({message:"User logged in succesfully",
            jwtToken:token,id:userExists._id
        })
    }
    catch(e){
        return res.status(400).json({message:`Internal server error : ${e}`})
    }
}

// Get User Details
const getUserdetails = async(req,res)=>{
    const {id} = req.params
    try{
        const response = await User.findOne({_id:id})
        if(!response){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(response)
    }catch(e){
          res.status(404).json({message:`Internal server error ${e}`})
    }
}

// Update User's Number
const updateNumber = async(req,res)=>{
        const {newNumber,id} = req.body
        try{
            const userUpdationNeeded = await User.findById(id)
            userUpdationNeeded.number = newNumber;
            await userUpdationNeeded.save();
            return res.status(200).json({message:"Number updated succesfully"})
        }catch(e){
            res.status(404).json({message:`Internal server error ${e}`})
        }
}

// Update User's Address
const updateAddress = async(req,res)=>{
    const {presentAddress,id} = req.body
    try{
        const userUpdationNeeded = await User.findById(id)
        userUpdationNeeded.address = presentAddress;
        await userUpdationNeeded.save();
        res.status(200).json({message:"Address updated succesfully"})
    }catch(e){
        res.status(404).json({message:`Internal server error $(e)`})
    }
}

// Update User's Cart List
const updateCartList = async(req,res)=>{
    const {updatedCartList,id} = req.body;
    try{
        const userUpdationNeeded = await User.findById(id)
        userUpdationNeeded.cartlist = updatedCartList;
        await userUpdationNeeded.save();
        res.status(200).json({message:"cartlist updated succesfully"})
    }catch(e){
        res.status(404).json({message:`Internal server error ${e}`})
    }

}

// Get User's Cart List
const getCartList = async(req,res)=>{

    const {id} = req.params;
    
try{
       const user = await User.findById(id);
       if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
       const cartlist = user.cartlist;
       res.status(200).json(cartlist);
}catch(e){
    res.status(404).json({message:`Internal server error ${e}`})
}
}

module.exports = {userRegister,userLogin,getUserdetails,updateNumber,updateAddress,updateCartList,getCartList}