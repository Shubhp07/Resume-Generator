import React from "react";
import { Phone, Mail, MapPin, Linkedin, Trash2, Plus } from "lucide-react";
import EditableInput, {
  EditableTextarea,
  ContactItem,
  SectionTitle,
} from "../ResumeBuilder";
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

export default ModernTemplate;
