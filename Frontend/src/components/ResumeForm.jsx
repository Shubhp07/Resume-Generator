import React, { useState } from "react";

const ResumeForm = ({ onResumeGenerated }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    summary: "",
    experience: [
      { title: "", company: "", startDate: "", endDate: "", description: "" },
    ],
    education: [{ degree: "", institution: "", year: "" }],
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "experience") {
      const newExperience = [...profile.experience];
      newExperience[index][name] = value;
      setProfile({ ...profile, experience: newExperience });
    } else if (type === "education") {
      const newEducation = [...profile.education];
      newEducation[index][name] = value;
      setProfile({ ...profile, education: newEducation });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const addSection = (type) => {
    if (type === "experience") {
      setProfile({
        ...profile,
        experience: [
          ...profile.experience,
          {
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
      });
    } else if (type === "education") {
      setProfile({
        ...profile,
        education: [
          ...profile.education,
          { degree: "", institution: "", year: "" },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // The API expects skills as an array, so we split the string
      const profileToSend = {
        ...profile,
        skills: profile.skills.split(",").map((skill) => skill.trim()),
      };
      onResumeGenerated(profileToSend);
    } catch (err) {
      setError("Failed to generate resume. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="text-red-500">{error}</div>}

      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => handleChange(e)}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => handleChange(e)}
            className="p-2 border rounded"
            required
          />
        </div>
        <textarea
          name="summary"
          placeholder="Professional Summary"
          value={profile.summary}
          onChange={(e) => handleChange(e)}
          className="w-full mt-4 p-2 border rounded"
          rows="4"
        />
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border-b">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => handleChange(e, index, "experience")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(e, index, "experience")}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => handleChange(e, index, "experience")}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => handleChange(e, index, "experience")}
                className="p-2 border rounded"
              />
            </div>
            <textarea
              name="description"
              placeholder="Description & Achievements"
              value={exp.description}
              onChange={(e) => handleChange(e, index, "experience")}
              className="w-full mt-2 p-2 border rounded"
              rows="3"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSection("experience")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Experience
        </button>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        {profile.education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 border-b">
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="year"
              placeholder="Year of Completion"
              value={edu.year}
              onChange={(e) => handleChange(e, index, "education")}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addSection("education")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>

      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <input
          type="text"
          name="skills"
          placeholder="Comma-separated skills (e.g., React, Node.js, MongoDB)"
          value={profile.skills}
          onChange={(e) => handleChange(e)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Resume"}
      </button>
    </form>
  );
};

export default ResumeForm;
