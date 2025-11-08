import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		content: { type: String, required: true },
		profile: { type: Object },
	},
	{ timestamps: true }
);

const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
export default Resume;
