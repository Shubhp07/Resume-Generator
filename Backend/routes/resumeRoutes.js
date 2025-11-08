import express from 'express';
import { createResume, getResume, listResumes } from '../controllers/resumeController.js';

const router = express.Router();

// POST /api/resume  -> generate and save a resume
router.post('/', createResume);

// GET /api/resume   -> list resumes
router.get('/', listResumes);

// GET /api/resume/:id -> get a specific resume
router.get('/:id', getResume);

export default router;
