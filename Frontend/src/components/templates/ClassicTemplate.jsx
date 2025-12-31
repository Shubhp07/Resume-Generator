import React from "react";
import { Phone, Mail, MapPin, Linkedin, Trash2, Plus } from "lucide-react";
import EditableInput, {
  EditableTextarea,
  ContactItem,
  SectionTitle,
} from "../ResumeBuilder";  
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

export default ClassicTemplate;
