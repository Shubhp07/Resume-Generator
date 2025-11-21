import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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


