import User from '../models/User.js';
import Resume from '../models/Resume.js';
import { generateResume } from '../utils/openaiHelper.js';

// Create a resume: accepts a profile object in req.body and returns the generated resume
export const createResume = async (req, res) => {
	try {
		const profile = req.body;
		if (!profile || !profile.email) {
			return res.status(400).json({ error: 'Profile with an email is required' });
		}

		// Find or create user
		let user = await User.findOne({ email: profile.email.toLowerCase() });
		if (!user) {
			user = new User({ name: profile.name || '', email: profile.email.toLowerCase() });
			await user.save();
		}

		// Call OpenAI helper to generate resume text
		const content = await generateResume(profile);

		// Persist resume
		const resume = new Resume({ user: user._id, content, profile });
		await resume.save();

		return res.status(201).json({ resume });
	} catch (err) {
		console.error('createResume error:', err);
		return res.status(500).json({ error: 'Server error', details: err.message });
	}
};

export const getResume = async (req, res) => {
	try {
		const { id } = req.params;
		const resume = await Resume.findById(id).populate('user', 'name email');
		if (!resume) return res.status(404).json({ error: 'Resume not found' });
		return res.json({ resume });
	} catch (err) {
		console.error('getResume error:', err);
		return res.status(500).json({ error: 'Server error' });
	}
};

export const listResumes = async (req, res) => {
	try {
		const resumes = await Resume.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(100);
		return res.json({ resumes });
	} catch (err) {
		console.error('listResumes error:', err);
		return res.status(500).json({ error: 'Server error' });
	}
};
