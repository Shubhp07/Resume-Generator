import express from 'express';
import Resume from '../models/Resume.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// CREATE new resume
router.post('/create', async (req, res) => {  // ← No authMiddleware for now
  try {
    const { resume } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const userId = payload.id || payload.userId || payload.sub;
    
    if (!userId) return res.status(401).json({ error: 'Invalid token' });

    const newResume = await Resume.createOrUpdate(null, {
      ...resume,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      _id: newResume._id,
      id: newResume._id.toString(),
      ...newResume.toObject()
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// GET, PUT, DELETE routes (keep as-is)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ updatedAt: -1 }).lean();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedResume = await Resume.createOrUpdate(req.params.id, {
      ...req.body.resume,
      userId: req.user.id,
      updatedAt: new Date()
    });
    res.json({
      _id: updatedResume._id,
      id: updatedResume._id.toString(),
      ...updatedResume.toObject()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
