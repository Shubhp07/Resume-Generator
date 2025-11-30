import express from 'express';
import Resume from '../models/Resume.js'; // Adjust path
import authMiddleware from '../middlewares/authMiddleware.js'; // Your auth middleware

const router = express.Router();

// CREATE new resume
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { resume } = req.body;
    
    // Ensure userId from auth middleware
    const resumeData = {
      ...resume,
      userId: req.user.id, // From auth middleware
      updatedAt: new Date(),
    };

    const newResume = await Resume.createOrUpdate(null, resumeData);
    
    res.status(201).json({
      _id: newResume._id,
      id: newResume._id, // For frontend compatibility
      ...newResume.toObject()
    });
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// GET user's resumes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .sort({ updatedAt: -1 })
      .lean();
    
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// UPDATE resume (for auto-save)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { resume } = req.body;
    
    const updatedResume = await Resume.createOrUpdate(id, resume);
    
    res.json({
      _id: updatedResume._id,
      id: updatedResume._id,
      ...updatedResume.toObject()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// DELETE resume
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Resume.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id 
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
