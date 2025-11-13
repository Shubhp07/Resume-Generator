import React, { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function ResumeGeneratorUI({ onResumeGenerated }) {
  // ensure callback is a function – provide a safe default so component won't crash
  const resumeCallback = typeof onResumeGenerated === "function" ? onResumeGenerated : (data) => {
    // fallback behaviour: log to console and show a small notification
    console.log("onResumeGenerated not provided — resume data:", data);
    try {
      // friendly alert for development — remove in production
      // eslint-disable-next-line no-alert
      alert("Resume data prepared. Check console for details.");
    } catch (e) {
      // ignore
    }
  };

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    summary: "",
    experience: [{ title: "", company: "", startDate: "", endDate: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e, idx, type) => {
    const { name, value } = e.target;
    if (!type) {
      setProfile((p) => ({ ...p, [name]: value }));
      return;
    }
    setProfile((p) => {
      const updated = [...p[type]];
      updated[idx] = { ...updated[idx], [name]: value };
      return { ...p, [type]: updated };
    });
  };

  const addSection = (type) => {
    const newItem = type === "experience"
      ? { title: "", company: "", startDate: "", endDate: "", description: "" }
      : { degree: "", institution: "", year: "" };
    setProfile((p) => ({ ...p, [type]: [...p[type], newItem] }));
  };

  const deleteSection = (type, idx) => {
    setProfile((p) => ({ ...p, [type]: p[type].filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const skillsArray = profile.skills
      ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const formatted = { ...profile, skills: skillsArray };

    // call safe callback
    try {
      resumeCallback(formatted);
    } catch (err) {
      console.error("Error in onResumeGenerated callback:", err);
    }

    setLoading(false);
  };

  const card = "p-6 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition";
  const input = "w-full p-3 bg-gray-100 rounded-xl border border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-400 transition";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-10 space-y-10 bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl shadow-xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">AI Resume Generator</h1>
        <p className="text-gray-600 mt-2">Fill your details and generate a beautiful professional resume.</p>
      </div>

      {/* PERSONAL INFO */}
      <section className={card}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className={input} name="name" placeholder="Full Name" value={profile.name} onChange={handleChange} />
          <input className={input} name="email" placeholder="Email" value={profile.email} onChange={handleChange} />
        </div>
        <textarea className={`${input} mt-4`} name="summary" rows={4} placeholder="Professional Summary" value={profile.summary} onChange={handleChange} />
      </section>

      {/* EXPERIENCE */}
      <section className={card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
          <button type="button" onClick={() => addSection("experience")} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700">
            <PlusIcon className="w-5 h-5" /> Add
          </button>
        </div>

        {profile.experience.map((exp, idx) => (
          <div key={idx} className="relative bg-gray-100 p-5 rounded-xl mb-4 border border-gray-300 shadow-inner">
            <button type="button" onClick={() => deleteSection("experience", idx)} className="absolute top-3 right-3 text-red-600 hover:text-red-800">
              <TrashIcon className="w-6 h-6" />
            </button>
            <input className={input} placeholder="Job Title" name="title" value={exp.title} onChange={(e) => handleChange(e, idx, "experience")} />
            <input className={`${input} mt-2`} placeholder="Company" name="company" value={exp.company} onChange={(e) => handleChange(e, idx, "experience")} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input className={input} placeholder="Start Date" name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, idx, "experience")} />
              <input className={input} placeholder="End Date" name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, idx, "experience")} />
            </div>
            <textarea className={`${input} mt-3`} rows={3} placeholder="Description & Achievements" name="description" value={exp.description} onChange={(e) => handleChange(e, idx, "experience")} />
          </div>
        ))}
      </section>

      {/* EDUCATION */}
      <section className={card}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          <button type="button" onClick={() => addSection("education")} className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700">
            <PlusIcon className="w-5 h-5" /> Add
          </button>
        </div>

        {profile.education.map((edu, idx) => (
          <div key={idx} className="relative bg-gray-100 p-5 rounded-xl mb-4 border border-gray-300 shadow-inner">
            <button type="button" onClick={() => deleteSection("education", idx)} className="absolute top-3 right-3 text-red-600 hover:text-red-800">
              <TrashIcon className="w-6 h-6" />
            </button>
            <input className={input} placeholder="Degree" name="degree" value={edu.degree} onChange={(e) => handleChange(e, idx, "education")} />
            <input className={`${input} mt-2`} placeholder="Institution" name="institution" value={edu.institution} onChange={(e) => handleChange(e, idx, "education")} />
            <input className={`${input} mt-2`} placeholder="Year of Completion" name="year" value={edu.year} onChange={(e) => handleChange(e, idx, "education")} />
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section className={card}>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>
        <input className={input} name="skills" placeholder="React, Java, SQL, Node.js" value={profile.skills} onChange={handleChange} />
      </section>

      {/* SUBMIT */}
      <button type="submit" disabled={loading} className="w-full py-4 bg-purple-600 text-white rounded-2xl text-lg font-semibold shadow-xl hover:bg-purple-700 disabled:bg-gray-400">
        {loading ? "Generating..." : "Generate Resume"}
      </button>
    </form>
  );
}
