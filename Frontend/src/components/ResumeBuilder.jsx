import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Save,
  Printer,
  ChevronLeft,
  User,
  FileText,
  Loader2,
  LogOut,
  Edit3,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Layout,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// const auth = getAuth(app);
// const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "resume-builder-app";

const INITIAL_RESUME_STATE = {
  title: "",
  templateId: "modern", // Default template
  personal: {
    fullName: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [], // empty array for user to add jobs
  education: [], // empty array for user to add education
  projects: [], // empty array for user to add projects
  skills: [], // empty array or pre-fill if desired with common skills
  certifications: [], // empty array
  customSections: [], // empty array
};

// --- Helper Components ---

const EditableTextarea = ({ value, onChange, className, placeholder }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);
  return (
    <textarea
      ref={textareaRef}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-transparent border-b border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:bg-blue-50/50 resize-none overflow-hidden transition-colors w-full ${className}`}
      rows={1}
    />
  );
};

const EditableInput = ({
  value,
  onChange,
  className,
  placeholder,
  type = "text",
}) => (
  <input
    type={type}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`bg-transparent border-b border-transparent hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:bg-blue-50/50 transition-colors w-full text-ellipsis ${className}`}
  />
);

// --- Common Sub-Components for Templates ---
const ContactItem = ({ icon: Icon, value, onChange, placeholder }) => (
  <div className="flex items-center gap-1 min-w-[150px]">
    <Icon className="w-3 h-3 flex-shrink-0" />
    <EditableInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const SectionTitle = ({ children, className }) => (
  <h3
    className={`text-sm font-bold uppercase tracking-wider border-b pb-1 mb-3 ${className}`}
  >
    {children}
  </h3>
);

// --- TEMPLATES ---

const ModernTemplate = ({
  data,
  updateNested,
  updateArrayItem,
  onAddItem,
  onRemoveItem,
}) => (
  <div className="h-full">
    {/* Header */}
    <div className="border-b-2 border-slate-800 pb-6 mb-6">
      <EditableInput
        value={data.personal.fullName}
        onChange={(v) => updateNested("personal", "fullName", v)}
        className="text-4xl font-bold text-slate-900 uppercase tracking-wide mb-2"
        placeholder="YOUR NAME"
      />
      <EditableInput
        value={data.personal.role}
        onChange={(v) => updateNested("personal", "role", v)}
        className="text-xl font-semibold text-blue-600 mb-4"
        placeholder="Role"
      />
      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-600 items-center">
        <ContactItem
          icon={Phone}
          value={data.personal.phone}
          onChange={(v) => updateNested("personal", "phone", v)}
          placeholder="Phone"
        />
        <ContactItem
          icon={Mail}
          value={data.personal.email}
          onChange={(v) => updateNested("personal", "email", v)}
          placeholder="Email"
        />
        <ContactItem
          icon={MapPin}
          value={data.personal.location}
          onChange={(v) => updateNested("personal", "location", v)}
          placeholder="Location"
        />
        <ContactItem
          icon={Linkedin}
          value={data.personal.linkedin}
          onChange={(v) => updateNested("personal", "linkedin", v)}
          placeholder="LinkedIn"
        />
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      {/* Left Column */}
      <div className="col-span-7 space-y-8">
        <section className="group/section">
          <SectionTitle className="text-slate-900 border-slate-200">
            Summary
          </SectionTitle>
          <EditableTextarea
            value={data.summary}
            onChange={(v) => updateNested("summary", null, v)}
            className="text-sm text-slate-700 text-justify leading-relaxed"
          />
        </section>

        <section className="group/section">
          <div className="flex justify-between items-end border-b border-slate-200 pb-1 mb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Experience
            </h3>
          </div>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative group/item">
                <div className="flex justify-between items-baseline mb-1">
                  <EditableInput
                    value={exp.role}
                    onChange={(v) =>
                      updateArrayItem("experience", exp.id, "role", v)
                    }
                    className="font-bold text-slate-800 w-2/3"
                    placeholder="Job Title"
                  />
                  <div className="flex items-center text-xs font-semibold text-slate-500 gap-1 w-1/3 justify-end">
                    <EditableInput
                      value={exp.startDate}
                      onChange={(v) =>
                        updateArrayItem("experience", exp.id, "startDate", v)
                      }
                      className="text-right w-20"
                      placeholder="Start"
                    />
                    <span>-</span>
                    <EditableInput
                      value={exp.endDate}
                      onChange={(v) =>
                        updateArrayItem("experience", exp.id, "endDate", v)
                      }
                      className="w-20"
                      placeholder="End"
                    />
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <EditableInput
                    value={exp.company}
                    onChange={(v) =>
                      updateArrayItem("experience", exp.id, "company", v)
                    }
                    className="text-sm font-medium text-blue-600 w-1/2"
                    placeholder="Company"
                  />
                  <EditableInput
                    value={exp.location}
                    onChange={(v) =>
                      updateArrayItem("experience", exp.id, "location", v)
                    }
                    className="text-xs text-slate-400 w-1/2"
                    placeholder="Location"
                  />
                </div>
                <EditableTextarea
                  value={exp.description}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "description", v)
                  }
                  className="text-xs text-slate-600 whitespace-pre-line leading-relaxed"
                  placeholder="Description"
                />
                <button
                  onClick={() => onRemoveItem("experience", exp.id)}
                  className="absolute -right-6 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              onAddItem("experience", { role: "Job Title", company: "Company" })
            }
            className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover/section:opacity-100 print:hidden flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </section>

        <section className="group/section">
          <SectionTitle className="text-slate-900 border-slate-200">
            Education
          </SectionTitle>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative group/item">
                <div className="flex justify-between items-baseline mb-1">
                  <EditableInput
                    value={edu.degree}
                    onChange={(v) =>
                      updateArrayItem("education", edu.id, "degree", v)
                    }
                    className="font-bold text-slate-800 w-2/3"
                    placeholder="Degree"
                  />
                  <div className="flex items-center text-xs font-semibold text-slate-500 gap-1 w-1/3 justify-end">
                    <EditableInput
                      value={edu.startDate}
                      onChange={(v) =>
                        updateArrayItem("education", edu.id, "startDate", v)
                      }
                      className="text-right w-16"
                      placeholder="Start"
                    />
                    <span>-</span>
                    <EditableInput
                      value={edu.endDate}
                      onChange={(v) =>
                        updateArrayItem("education", edu.id, "endDate", v)
                      }
                      className="w-16"
                      placeholder="End"
                    />
                  </div>
                </div>
                <EditableInput
                  value={edu.school}
                  onChange={(v) =>
                    updateArrayItem("education", edu.id, "school", v)
                  }
                  className="text-sm text-blue-600"
                  placeholder="School"
                />
                <button
                  onClick={() => onRemoveItem("education", edu.id)}
                  className="absolute -right-6 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              onAddItem("education", { school: "School", degree: "Degree" })
            }
            className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover/section:opacity-100 print:hidden flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </section>
      </div>

      {/* Right Column */}
      <div className="col-span-5 space-y-8">
        <section className="group/section">
          <SectionTitle className="text-slate-900 border-slate-200">
            Projects
          </SectionTitle>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="relative group/item">
                <EditableInput
                  value={proj.name}
                  onChange={(v) =>
                    updateArrayItem("projects", proj.id, "name", v)
                  }
                  className="font-bold text-slate-800 text-sm w-full"
                  placeholder="Project Name"
                />
                <div className="flex text-xs text-slate-500 mb-1 gap-1">
                  <EditableInput
                    value={proj.startDate}
                    onChange={(v) =>
                      updateArrayItem("projects", proj.id, "startDate", v)
                    }
                    className="w-16"
                    placeholder="Start"
                  />
                  <span>-</span>
                  <EditableInput
                    value={proj.endDate}
                    onChange={(v) =>
                      updateArrayItem("projects", proj.id, "endDate", v)
                    }
                    className="w-16"
                    placeholder="End"
                  />
                </div>
                <EditableTextarea
                  value={proj.description}
                  onChange={(v) =>
                    updateArrayItem("projects", proj.id, "description", v)
                  }
                  className="text-xs text-slate-600 leading-relaxed"
                  placeholder="Description"
                />
                <button
                  onClick={() => onRemoveItem("projects", proj.id)}
                  className="absolute -right-6 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => onAddItem("projects", { name: "Project" })}
            className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover/section:opacity-100 print:hidden flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </section>

        <section className="group/section">
          <SectionTitle className="text-slate-900 border-slate-200">
            Skills
          </SectionTitle>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="group/skill relative">
                <input
                  value={skill}
                  onChange={(e) => {
                    const n = [...data.skills];
                    n[idx] = e.target.value;
                    updateNested("skills", null, n);
                  }}
                  className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded border border-slate-200 w-auto min-w-[60px] max-w-[120px] focus:ring-2 focus:ring-blue-500 outline-none text-center"
                />
                <button
                  onClick={() => {
                    const n = data.skills.filter((_, i) => i !== idx);
                    updateNested("skills", null, n);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center opacity-0 group-hover/skill:opacity-100 print:hidden"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                updateNested("skills", null, [...data.skills, "New"])
              }
              className="px-2 py-1 border border-dashed border-slate-300 text-slate-400 text-xs rounded hover:text-blue-600 print:hidden"
            >
              + Add
            </button>
          </div>
        </section>

        <section className="group/section">
          <SectionTitle className="text-slate-900 border-slate-200">
            Certifications
          </SectionTitle>
          <ul className="space-y-2">
            {data.certifications.map((cert) => (
              <li
                key={cert.id}
                className="text-sm text-slate-700 flex items-start gap-2 group/item relative"
              >
                <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <EditableInput
                  value={cert.name}
                  onChange={(v) =>
                    updateArrayItem("certifications", cert.id, "name", v)
                  }
                  className="w-full"
                  placeholder="Cert Name"
                />
                <button
                  onClick={() => onRemoveItem("certifications", cert.id)}
                  className="opacity-0 group-hover/item:opacity-100 text-slate-300 hover:text-red-500 print:hidden"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onAddItem("certifications", { name: "Cert Name" })}
            className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 text-slate-400 rounded hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover/section:opacity-100 print:hidden flex justify-center items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Cert
          </button>
        </section>
      </div>
    </div>
  </div>
);

const ClassicTemplate = ({
  data,
  updateNested,
  updateArrayItem,
  onAddItem,
  onRemoveItem,
}) => (
  <div className="h-full font-serif text-slate-900">
    {/* Header Center */}
    <div className="text-center border-b-2 border-black pb-6 mb-8">
      <EditableInput
        value={data.personal.fullName}
        onChange={(v) => updateNested("personal", "fullName", v)}
        className="text-4xl font-bold text-black uppercase tracking-widest text-center mb-2"
        placeholder="YOUR NAME"
      />
      <div className="flex justify-center flex-wrap gap-4 text-sm text-slate-700 italic">
        <ContactItem
          icon={Phone}
          value={data.personal.phone}
          onChange={(v) => updateNested("personal", "phone", v)}
          placeholder="Phone"
        />
        <span className="text-slate-300">|</span>
        <ContactItem
          icon={Mail}
          value={data.personal.email}
          onChange={(v) => updateNested("personal", "email", v)}
          placeholder="Email"
        />
        <span className="text-slate-300">|</span>
        <ContactItem
          icon={Linkedin}
          value={data.personal.linkedin}
          onChange={(v) => updateNested("personal", "linkedin", v)}
          placeholder="LinkedIn"
        />
        <span className="text-slate-300">|</span>
        <ContactItem
          icon={MapPin}
          value={data.personal.location}
          onChange={(v) => updateNested("personal", "location", v)}
          placeholder="Location"
        />
      </div>
    </div>

    {/* Single Column Stack */}
    <div className="space-y-8">
      {/* Summary */}
      <section className="group/section">
        <h3 className="text-center font-bold uppercase border-b border-black pb-1 mb-3 tracking-widest">
          Professional Summary
        </h3>
        <EditableTextarea
          value={data.summary}
          onChange={(v) => updateNested("summary", null, v)}
          className="text-sm text-center leading-relaxed max-w-3xl mx-auto"
        />
      </section>

      {/* Experience */}
      <section className="group/section">
        <h3 className="text-center font-bold uppercase border-b border-black pb-1 mb-4 tracking-widest">
          Experience
        </h3>
        <div className="space-y-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative group/item">
              <div className="flex justify-between items-baseline mb-1 font-bold">
                <EditableInput
                  value={exp.role}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "role", v)
                  }
                  className="text-lg"
                  placeholder="Role"
                />
                <EditableInput
                  value={exp.company}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "company", v)
                  }
                  className="text-right"
                  placeholder="Company"
                />
              </div>
              <div className="flex justify-between items-center text-xs italic text-slate-600 mb-2 border-b border-dotted border-slate-300 pb-1">
                <div className="flex gap-1">
                  <EditableInput
                    value={exp.startDate}
                    onChange={(v) =>
                      updateArrayItem("experience", exp.id, "startDate", v)
                    }
                    className="w-20"
                  />{" "}
                  -{" "}
                  <EditableInput
                    value={exp.endDate}
                    onChange={(v) =>
                      updateArrayItem("experience", exp.id, "endDate", v)
                    }
                    className="w-20"
                  />
                </div>
                <EditableInput
                  value={exp.location}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "location", v)
                  }
                  className="text-right w-32"
                />
              </div>
              <EditableTextarea
                value={exp.description}
                onChange={(v) =>
                  updateArrayItem("experience", exp.id, "description", v)
                }
                className="text-sm whitespace-pre-line"
              />
              <button
                onClick={() => onRemoveItem("experience", exp.id)}
                className="absolute -right-8 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            onAddItem("experience", { role: "Role", company: "Company" })
          }
          className="mt-4 w-full py-1 text-slate-400 text-xs uppercase tracking-widest hover:text-black opacity-0 group-hover/section:opacity-100 print:hidden text-center"
        >
          + Add Experience
        </button>
      </section>

      {/* Education & Projects Grid */}
      <div className="grid grid-cols-2 gap-8">
        <section className="group/section">
          <h3 className="text-center font-bold uppercase border-b border-black pb-1 mb-4 tracking-widest">
            Education
          </h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id} className="relative group/item text-center">
                <EditableInput
                  value={edu.degree}
                  onChange={(v) =>
                    updateArrayItem("education", edu.id, "degree", v)
                  }
                  className="font-bold text-center"
                  placeholder="Degree"
                />
                <EditableInput
                  value={edu.school}
                  onChange={(v) =>
                    updateArrayItem("education", edu.id, "school", v)
                  }
                  className="text-sm italic text-center"
                  placeholder="School"
                />
                <div className="text-xs text-slate-500">
                  <EditableInput
                    value={edu.startDate}
                    onChange={(v) =>
                      updateArrayItem("education", edu.id, "startDate", v)
                    }
                    className="w-10 text-center inline-block"
                  />{" "}
                  -{" "}
                  <EditableInput
                    value={edu.endDate}
                    onChange={(v) =>
                      updateArrayItem("education", edu.id, "endDate", v)
                    }
                    className="w-10 text-center inline-block"
                  />
                </div>
                <button
                  onClick={() => onRemoveItem("education", edu.id)}
                  className="absolute -right-4 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => onAddItem("education", { school: "School" })}
            className="mt-4 w-full py-1 text-slate-400 text-xs uppercase tracking-widest hover:text-black opacity-0 group-hover/section:opacity-100 print:hidden text-center"
          >
            + Add Edu
          </button>
        </section>

        <section className="group/section">
          <h3 className="text-center font-bold uppercase border-b border-black pb-1 mb-4 tracking-widest">
            Skills
          </h3>
          <div className="text-center leading-7">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-block group/skill relative mx-1"
              >
                <input
                  value={skill}
                  onChange={(e) => {
                    const n = [...data.skills];
                    n[idx] = e.target.value;
                    updateNested("skills", null, n);
                  }}
                  className="bg-transparent border-b border-slate-300 text-center w-auto min-w-[50px] max-w-[100px] focus:border-black outline-none"
                />
                <button
                  onClick={() => {
                    const n = data.skills.filter((_, i) => i !== idx);
                    updateNested("skills", null, n);
                  }}
                  className="absolute -top-3 -right-1 text-red-500 text-xs opacity-0 group-hover/skill:opacity-100 print:hidden"
                >
                  x
                </button>
              </span>
            ))}
            <button
              onClick={() =>
                updateNested("skills", null, [...data.skills, "New"])
              }
              className="text-slate-400 text-xs px-2 hover:text-black print:hidden"
            >
              +
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
);

const MinimalTemplate = ({
  data,
  updateNested,
  updateArrayItem,
  onAddItem,
  onRemoveItem,
}) => (
  <div className="h-full grid grid-cols-12 gap-0">
    {/* Sidebar Left */}
    <div className="col-span-4 bg-slate-50 border-r border-slate-200 p-6 -my-[20mm] -ml-[20mm] py-[20mm] pl-[20mm] space-y-8 min-h-[297mm]">
      <div className="space-y-4 text-sm text-slate-600">
        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">
          Contact
        </h3>
        <ContactItem
          icon={Phone}
          value={data.personal.phone}
          onChange={(v) => updateNested("personal", "phone", v)}
          placeholder="Phone"
        />
        <ContactItem
          icon={Mail}
          value={data.personal.email}
          onChange={(v) => updateNested("personal", "email", v)}
          placeholder="Email"
        />
        <ContactItem
          icon={Linkedin}
          value={data.personal.linkedin}
          onChange={(v) => updateNested("personal", "linkedin", v)}
          placeholder="LinkedIn"
        />
        <ContactItem
          icon={Globe}
          value={data.personal.website}
          onChange={(v) => updateNested("personal", "website", v)}
          placeholder="Website"
        />
        <ContactItem
          icon={MapPin}
          value={data.personal.location}
          onChange={(v) => updateNested("personal", "location", v)}
          placeholder="Location"
        />
      </div>

      <section className="group/section">
        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 mt-8">
          Education
        </h3>
        <div className="space-y-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="relative group/item">
              <EditableInput
                value={edu.degree}
                onChange={(v) =>
                  updateArrayItem("education", edu.id, "degree", v)
                }
                className="font-bold text-slate-800 text-sm"
                placeholder="Degree"
              />
              <EditableInput
                value={edu.school}
                onChange={(v) =>
                  updateArrayItem("education", edu.id, "school", v)
                }
                className="text-xs text-slate-500"
                placeholder="School"
              />
              <div className="text-[10px] text-slate-400 mt-1">
                <EditableInput
                  value={edu.startDate}
                  onChange={(v) =>
                    updateArrayItem("education", edu.id, "startDate", v)
                  }
                  className="w-8 inline-block"
                />
                -
                <EditableInput
                  value={edu.endDate}
                  onChange={(v) =>
                    updateArrayItem("education", edu.id, "endDate", v)
                  }
                  className="w-8 inline-block"
                />
              </div>
              <button
                onClick={() => onRemoveItem("education", edu.id)}
                className="absolute -right-2 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onAddItem("education", { school: "School" })}
          className="mt-2 text-xs text-blue-500 opacity-0 group-hover/section:opacity-100 print:hidden"
        >
          + Add
        </button>
      </section>

      <section className="group/section">
        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 mt-8">
          Skills
        </h3>
        <div className="space-y-2">
          {data.skills.map((skill, idx) => (
            <div
              key={idx}
              className="group/skill relative flex items-center justify-between"
            >
              <input
                value={skill}
                onChange={(e) => {
                  const n = [...data.skills];
                  n[idx] = e.target.value;
                  updateNested("skills", null, n);
                }}
                className="bg-transparent text-sm w-full focus:outline-none"
              />
              <button
                onClick={() => {
                  const n = data.skills.filter((_, i) => i !== idx);
                  updateNested("skills", null, n);
                }}
                className="text-red-500 text-xs opacity-0 group-hover/skill:opacity-100 print:hidden"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              updateNested("skills", null, [...data.skills, "New"])
            }
            className="text-xs text-blue-500 opacity-0 group-hover/section:opacity-100 print:hidden"
          >
            + Add
          </button>
        </div>
      </section>
    </div>

    {/* Right Main Content */}
    <div className="col-span-8 p-8 pt-0">
      <div className="mb-10">
        <EditableInput
          value={data.personal.fullName}
          onChange={(v) => updateNested("personal", "fullName", v)}
          className="text-5xl font-black text-slate-900 tracking-tight mb-2"
          placeholder="NAME"
        />
        <EditableInput
          value={data.personal.role}
          onChange={(v) => updateNested("personal", "role", v)}
          className="text-xl text-slate-500 tracking-wide"
          placeholder="Role"
        />
      </div>

      <section className="mb-10">
        <EditableTextarea
          value={data.summary}
          onChange={(v) => updateNested("summary", null, v)}
          className="text-sm text-slate-600 leading-7"
        />
      </section>

      <section className="group/section mb-10">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">
          Experience
        </h3>
        <div className="space-y-8 border-l border-slate-200 pl-6 ml-1">
          {data.experience.map((exp) => (
            <div key={exp.id} className="relative group/item">
              <span className="absolute -left-[29px] top-1.5 w-2 h-2 rounded-full bg-slate-300 border-4 border-white"></span>
              <EditableInput
                value={exp.role}
                onChange={(v) =>
                  updateArrayItem("experience", exp.id, "role", v)
                }
                className="font-bold text-slate-800"
                placeholder="Role"
              />
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 uppercase tracking-wide">
                <EditableInput
                  value={exp.company}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "company", v)
                  }
                  className="w-auto text-slate-500 font-semibold"
                />
                <span>•</span>
                <EditableInput
                  value={exp.startDate}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "startDate", v)
                  }
                  className="w-10"
                />{" "}
                -{" "}
                <EditableInput
                  value={exp.endDate}
                  onChange={(v) =>
                    updateArrayItem("experience", exp.id, "endDate", v)
                  }
                  className="w-10"
                />
              </div>
              <EditableTextarea
                value={exp.description}
                onChange={(v) =>
                  updateArrayItem("experience", exp.id, "description", v)
                }
                className="text-sm text-slate-600 whitespace-pre-line leading-relaxed"
              />
              <button
                onClick={() => onRemoveItem("experience", exp.id)}
                className="absolute -right-4 top-0 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onAddItem("experience", { role: "Role" })}
          className="ml-7 mt-4 text-xs text-blue-500 opacity-0 group-hover/section:opacity-100 print:hidden"
        >
          + Add Job
        </button>
      </section>

      <section className="group/section">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">
          Projects
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {data.projects.map((proj) => (
            <div
              key={proj.id}
              className="relative group/item bg-slate-50 p-4 rounded"
            >
              <EditableInput
                value={proj.name}
                onChange={(v) =>
                  updateArrayItem("projects", proj.id, "name", v)
                }
                className="font-bold text-slate-800 text-sm mb-1"
                placeholder="Project"
              />
              <EditableTextarea
                value={proj.description}
                onChange={(v) =>
                  updateArrayItem("projects", proj.id, "description", v)
                }
                className="text-xs text-slate-500 leading-relaxed"
              />
              <button
                onClick={() => onRemoveItem("projects", proj.id)}
                className="absolute right-1 top-1 text-red-400 opacity-0 group-hover/item:opacity-100 print:hidden"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => onAddItem("projects", { name: "Project" })}
          className="mt-4 text-xs text-blue-500 opacity-0 group-hover/section:opacity-100 print:hidden"
        >
          + Add Project
        </button>
      </section>
    </div>
  </div>
);
// --- Main Template Switcher ---
const TemplateRenderer = ({ data, onUpdate, onAddItem, onRemoveItem }) => {
  // Helper Functions shared by all templates
  const updateNested = (section, field, value) => {
    if (field) {
      onUpdate({ ...data, [section]: { ...data[section], [field]: value } });
    } else {
      onUpdate({ ...data, [section]: value });
    }
  };

  const updateArrayItem = (section, id, field, value) => {
    const updatedList = data[section].map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate({ ...data, [section]: updatedList });
  };

  const props = {
    data,
    updateNested,
    updateArrayItem,
    onAddItem,
    onRemoveItem,
  };

  return (
    <div className="w-full min-h-[297mm] bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] text-slate-800 relative group/page transition-all duration-300">
      {data.templateId === "classic" && <ClassicTemplate {...props} />}
      {data.templateId === "minimal" && <MinimalTemplate {...props} />}
      {(data.templateId === "modern" || !data.templateId) && (
        <ModernTemplate {...props} />
      )}
    </div>
  );
};

// --- App & Dashboard Logic ---

// const AuthScreen = ({ onLogin }) => (
//   <div className="min-h-screen flex items-center justify-center bg-slate-50">
//     <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
//       <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
//         <FileText className="text-white w-8 h-8" />
//       </div>
//       <h1 className="text-2xl font-bold text-slate-800 mb-2">Resume Builder</h1>
//       <p className="text-slate-500 mb-8">
//         Create professional resumes in minutes.
//       </p>
//       <button
//         onClick={onLogin}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
//       >
//         <User className="w-4 h-4" /> Start Building
//       </button>
//     </div>
//   </div>
// );

const Dashboard = ({ resumes, onCreate, onEdit, onDelete, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Redirect to login (or home)
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header with User Menu */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">My Resumes</h1>
        </div>

        {/* User menu - REPLACES the old Sign Out button */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 text-slate-700 text-sm"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 text-sm z-20">
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  // TODO: Profile action
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  // TODO: Details action
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <FileText className="w-4 h-4" />
                Details
              </button>
              <div className="h-px bg-slate-100 my-1" />
              <button
                onClick={handleLogOut}
                className="w-full text-left px-3 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Your original resume grid with Create New Resume button */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CREATE NEW RESUME BUTTON - YOUR ORIGINAL */}
        <button
          onClick={onCreate}
          className="group flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Plus className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
          </div>
          <span className="font-medium text-slate-600 group-hover:text-blue-600">
            Create New Resume
          </span>
        </button>

        {/* Your existing resumes */}
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-200 flex flex-col h-64"
          >
            {/* Resume preview card - your original code */}
            <div
              className="h-32 bg-slate-100 border-b border-slate-100 relative group cursor-pointer"
              onClick={() => onEdit(resume)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50">
                <Edit3 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            {/* Rest of your resume card */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-800 truncate">
                  {resume.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Last updated {resume.updatedAt?.toDate().toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onEdit(resume)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(resume.id);
                  }}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TemplateSelector = ({ current, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "modern",
      name: "Modern",
      desc: "Clean 2-column layout",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      preview: "Two-column professional",
    },
    {
      id: "classic",
      name: "Classic",
      desc: "Traditional serif style",
      color: "bg-gradient-to-r from-slate-700 to-gray-800",
      preview: "Timeless executive",
    },
    {
      id: "minimal",
      name: "Minimal",
      desc: "Sidebar modern design",
      color: "bg-gradient-to-r from-emerald-500 to-teal-600",
      preview: "Clean & simple",
    },
    {
      id: "creative",
      name: "Creative",
      desc: "Bold color accents",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      preview: "Stand out design",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300 font-medium group"
      >
        <Layout className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
        <span className="hidden sm:inline">Template</span>
        <span className="font-bold capitalize bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {current || "Modern"}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-14 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-4 z-20 animate-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelect(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-2 ${
                    current === t.id
                      ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-blue-200 ring-2 ring-blue-200"
                      : "border-transparent hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 ${t.color} rounded-xl shadow-lg flex items-center justify-center p-2`}
                  >
                    <Layout className="w-6 h-6 text-white opacity-90" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-slate-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">{t.desc}</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {t.preview}
                    </div>
                  </div>
                  {current === t.id && (
                    <Check className="w-5 h-5 text-blue-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("loading");
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setView("dashboard");
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "artifacts", appId, "users", user.uid, "resumes"),
      orderBy("updatedAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        templateId: "modern",
        ...doc.data(),
      }));
      setResumes(docs);
    });
    return () => unsubscribe();
  }, [user]);

  const handleCreate = async () => {
    try {
      const newResume = {
        ...INITIAL_RESUME_STATE,
        title: "",
        templateId: "modern",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/resumes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ resume: newResume }),
      });

      if (!response.ok) throw new Error("Failed to create");

      const createdResume = await response.json();

      setResumes((prev) => [createdResume, ...prev]);
      setCurrentResume(createdResume);
      setView("editor");
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create resume");
    }
  };


  

  const handleSave = async () => {
    if (!currentResume || !user) return;
    setSaving(true);
    try {
      const docRef = doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "resumes",
        currentResume.id
      );
      const { id, ...dataToSave } = currentResume;
      await setDoc(
        docRef,
        { ...dataToSave, updatedAt: new Date().toISOString() },
        { merge: true }
      );
      setSaving(false);
    } catch (error) {
      console.error("Save error:", error);
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!currentResume || view !== "editor") return;
    const timer = setTimeout(() => {
      handleSave();
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentResume]);

  const addItem = (section, template) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: Date.now().toString(), ...template }],
    }));
  };

  const removeItem = (section, id) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  if (view === "loading")
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  if (view === "auth")
    return (
      <AuthScreen
        onLogin={async () => {
          if (
            typeof __initial_auth_token !== "undefined" &&
            __initial_auth_token
          ) {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth);
          }
        }}
      />
    );
  if (view === "dashboard")
    return (
      <Dashboard
        resumes={resumes}
        onCreate={handleCreate}
        onEdit={async (r) => {
          try {
            const response = await fetch(
              `/api/resumes/${resume.id || resume._id}`
            );
            const latestResume = await response.json();

            setCurrentResume(r);
            setView("editor");
          } catch (error) {
            console.error("Load Error", error);
          }
        }}
        onDelete={async (id) => {
          if (window.confirm("Delete?"))
            await deleteDoc(
              doc(db, "artifacts", appId, "users", user.uid, "resumes", id)
            );
        }}
        onLogout={() => signOut(auth)}
      />
    );

  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    if (!currentResume || view !== "editor") return;

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Auto-save after 2 seconds of inactivity
    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        await saveResume(currentResume);
        setSaving(false);
      } catch (error) {
        console.error("Auto-save failed:", error);
        setSaving(false);
      }
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [currentResume, view]);

  // Add this save function
  const saveResume = useCallback(async (resume) => {
    try {
      const response = await fetch(`/api/resumes/${resume.id || resume._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Your auth token
        },
        body: JSON.stringify({ resume }),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const savedResume = await response.json();

      // Update state with saved data (includes MongoDB _id)
      setCurrentResume(savedResume);
      setResumes((prev) =>
        prev.map((r) =>
          r.id === savedResume.id || r._id === savedResume._id ? savedResume : r
        )
      );
    } catch (error) {
      throw error;
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("dashboard")}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <input
            className="font-semibold text-slate-800 bg-transparent border-none focus:ring-0"
            value={currentResume.title}
            onChange={(e) =>
              setCurrentResume((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Untitled Resume"
          />
        </div>
        <div className="flex items-center gap-4">
          <TemplateSelector
            current={currentResume.templateId}
            onSelect={(id) =>
              setCurrentResume((prev) => ({ ...prev, templateId: id }))
            }
          />
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
            {saving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Saving
              </>
            ) : (
              <>
                <Save className="w-3 h-3" /> Saved
              </>
            )}
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Printer className="w-4 h-4" /> Print PDF
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="flex-1 overflow-auto p-8 print:p-0 flex justify-center">
        <div className="w-[210mm] print:w-full">
          <TemplateRenderer
            data={currentResume}
            onUpdate={setCurrentResume}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </div>
      </div>
    </div>
  );
}
