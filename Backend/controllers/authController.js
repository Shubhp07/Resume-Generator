const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credentail } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credentail,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        profilePicture: picture,
        password: null,
        userType: "user",
      });
    }

    const acessToken = jwtDecode.sign(
      {
        id: user._id,
        userType: user.userType,
      },
      { expiresIn: "1d" }
    );

    return res.json({
      acessToken,
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
