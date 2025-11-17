import express from 'express';
import User from '../models/User.js';
import { googleLogin } from '../controllers/authController.js';

const router = express.Router();
router.post("/google",googleLogin);

// Simple register endpoint (no passwords here — intended as a lightweight stub)
router.post('/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(200).json({ user });

    user = new User({ name: name || '', email: email.toLowerCase() });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.error('auth/register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
