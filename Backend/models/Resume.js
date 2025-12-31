import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, default: "Untitled Resume" },
    templateId: { type: String, default: "modern" },
    personal: {
      fullName: String,
      role: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      website: String,
    },
    summary: String,
    experience: [
      {
        id: String,
        role: String,
        company: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    education: [
      {
        id: String,
        degree: String,
        school: String,
        startDate: String,
        endDate: String,
      },
    ],
    projects: [
      {
        id: String,
        name: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [String],
    certifications: [{ id: String, name: String }],
    customSections: [mongoose.Schema.Types.Mixed],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

resumeSchema.statics.createOrUpdate = async function (id, data) {
  if (!id) {
    const newResume = new this({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newResume.save();
  } else {
    return await this.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
  }
};

export default mongoose.model("Resume", resumeSchema);
