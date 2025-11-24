import express from 'express';
import Resume from '../models/Resume.js';

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
router.put('/:id', async (req, res) => {
  try {
    const resumeId = req.params.id;
    const { resumeData } = req.body;

    const updatedResume = await Resume.createOrUpdate(resumeId, resumeData);

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume updated', resume: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
