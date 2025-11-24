import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled Resume' },
  personal: {
    fullName: String,
    role: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    website: String,
    summary: String,
  },
  experience: Array,
  education: Array,
  projects: Array,
  skills: Array,
  certifications: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // link to user model
});

// Static method to create or update a resume
ResumeSchema.statics.createOrUpdate = async function (resumeId, resumeData) {
  if (!resumeId) {
    // Create new resume
    const resume = new this(resumeData);
    return await resume.save();
  } else {
    // Update existing resume
    resumeData.updatedAt = new Date();
    return await this.findByIdAndUpdate(resumeId, resumeData, { new: true });
  }
};

const Resume = mongoose.model('Resume', ResumeSchema);

export default Resume;
