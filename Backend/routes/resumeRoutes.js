import express from 'express';
import Resume from '../models/Resume.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create new resume
router.post('/', async (req, res) => {
  try {
    const { resumeData, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const newResume = await Resume.createOrUpdate(null, {
      ...resumeData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: 'Resume created', resume: newResume });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update existing resume
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { resume } = req.body;
    
    // Use your existing createOrUpdate static method
    const updatedResume = await Resume.createOrUpdate(id, {
      ...resume,
      userId: req.user.id,
      updatedAt: new Date()
    });
    
    res.json({
      _id: updatedResume._id,
      id: updatedResume._id.toString(), // For frontend
      ...updatedResume.toObject()
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

export default router;
