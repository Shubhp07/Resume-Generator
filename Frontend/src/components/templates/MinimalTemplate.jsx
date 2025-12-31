import React from "react";
import { Phone, Mail, MapPin, Linkedin, Trash2, Plus } from "lucide-react";
import EditableInput, {
  EditableTextarea,
  ContactItem,
  SectionTitle,
} from "../ResumeBuilder";
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

export default MinimalTemplate;
