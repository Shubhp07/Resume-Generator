import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    // Verify token from Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        profilePicture: picture,
        password: null,
        userType: "user",
        isOAuth: true,
      });
    }

    // Create JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      accessToken,
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Google login failed" });
  }
};

export const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body;

    if(!email || !password){
      return res.status(400).json({message:"Email and password are required"});
    }

    const user = await User.findOne({email:email.toLowerCase()});
    if(!user||!user.password){
      return res.status(401).json({message:"Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({message:"Invalid credentials"});
    }

    const accessToken = jwt.sign(
      {
        id:user._id,
        userType:user.userType,
      },
      process.env.JWT_SECRET,
      {expiresIn:"1d"}
    );

    const refereshToken = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      {expiresIn:"7d"}

    );
    return res.status(200).json({
      accessToken,
      refereshToken,
      userId:user._id,
      email:user.email,
      fullName:user.fullName||user.name,
      userType:user.userType,
      profilePicture:user.profilePicture||null,
    });
  }catch(err){
    console.error("Login Error",err);
    return res.status(500).json({message:"Server error"});
    
  }
  
}


