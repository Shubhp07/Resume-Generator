import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { ModernTemplate, ClassicTemplate, MinimalTemplate } from "./templates";

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
  experience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  customSections: [],
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

const TemplateRenderer = ({ data, onUpdate, onAddItem, onRemoveItem }) => {
  const safeData = data || INITIAL_RESUME_STATE;

  const updateNested = (section, field, value) => {
    if (field) {
      onUpdate({
        ...safeData,
        [section]: { ...safeData[section], [field]: value },
      });
    } else {
      onUpdate({ ...safeData, [section]: value });
    }
  };

  const updateArrayItem = (section, id, field, value) => {
    const updatedList = (safeData[section] || []).map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onUpdate({ ...safeData, [section]: updatedList });
  };

  const props = {
    data: safeData,
    updateNested,
    updateArrayItem,
    onAddItem,
    onRemoveItem,
  };

  return (
    <div className="w-full min-h-[297mm] bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] text-slate-800 relative group/page transition-all duration-300">
      {safeData.templateId === "classic" && <ClassicTemplate {...props} />}
      {safeData.templateId === "minimal" && <MinimalTemplate {...props} />}
      {safeData.templateId === "modern" || !safeData.templateId ? (
        <ModernTemplate {...props} />
      ) : null}
    </div>
  );
};

// --- Dashboard ---

const Dashboard = ({ resumes, onCreate, onEdit, onDelete }) => {
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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

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

        {/* User menu */}
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
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
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

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Create New */}
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

        {/* Existing resumes */}
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-200 flex flex-col h-64"
          >
            <div
              className="h-32 bg-slate-100 border-b border-slate-100 relative group cursor-pointer"
              onClick={() => onEdit(resume)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50">
                <Edit3 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-800 truncate">
                  {resume.title || "Untitled Resume"}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {resume.updatedAt
                    ? `Last updated ${new Date(
                        resume.updatedAt
                      ).toLocaleDateString()}`
                    : "Not yet saved"}
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

// --- Template selector (if you still use it somewhere) ---

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

// --- Main component ---

export default function ResumeBuilder() {
  console.log("ResumeBuilder component mounted!");

  // hooks
  const [user, setUser] = useState(null);
  const [view, setView] = useState("loading"); // FIX: use "loading" not "loading..."
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef(null);

  // initial view setup
  useEffect(() => {
    setView("resume-builder");
  }, []);

  // load resumes when user is set (placeholder if you add Firebase later)
  useEffect(() => {
    if (!user) return;
    // load resumes for this user here if needed
  }, [user]);

  // auto-save
  useEffect(() => {
    if (!currentResume || view !== "editor") return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        await saveResume(currentResume);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setSaving(false);
      }
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [currentResume, view]);

  const saveResume = useCallback(async (resume) => {
    // TODO: call your backend here
    console.log("Saving resume:", resume);
  }, []);

  const handleCreate = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first");
        return;
      }

      const newResume = {
        ...INITIAL_RESUME_STATE,
        title: "",
        templateId: "modern",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(
        "http://localhost:5000/api/resumes/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resume: newResume }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create: ${response.status} ${text}`);
      }

      const createdResume = await response.json();
      setResumes((prev) => [createdResume, ...prev]);
      setCurrentResume(createdResume);
      setView("editor");
    } catch (error) {
      console.error("Create error:", error);
      alert("Failed to create resume");
    }
  }, []);

  const addItem = useCallback((section, template) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: [
        ...(prev?.[section] || []),
        { id: Date.now().toString(), ...template },
      ],
    }));
  }, []);

  const removeItem = useCallback((section, id) => {
    setCurrentResume((prev) => ({
      ...prev,
      [section]: (prev?.[section] || []).filter((item) => item.id !== id),
    }));
  }, []);

  // --- conditional rendering ---

  if (view === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (view === "resume-builder") {
    return (
      <Dashboard
        resumes={resumes}
        onCreate={handleCreate}
        onEdit={(resume) => {
          setCurrentResume(resume);
          setView("editor");
        }}
        onDelete={(id) => {
          setResumes((prev) => prev.filter((r) => r.id !== id));
          if (currentResume?.id === id) {
            setCurrentResume(null);
          }
          // TODO: call backend delete API here if needed
        }}
      />
    );
  }

  // editor view
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("resume-builder")}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <input
            className="font-semibold text-slate-800 bg-transparent border-none focus:ring-0"
            value={currentResume?.title || ""}
            onChange={(e) =>
              setCurrentResume((prev) => ({
                ...prev,
                title: e.target.value,
                updatedAt: new Date().toISOString(),
              }))
            }
            placeholder="Untitled Resume"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          {saving ? (
            <div className="flex items-center gap-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </div>
          ) : (
            <span>Saved</span>
          )}
        </div>
      </div>

      {/* Editor content */}
      <div className="flex-1 overflow-auto p-8 print:p-0 flex justify-center">
        <div className="w-[210mm] print:w-full">
          <TemplateRenderer
            data={currentResume || INITIAL_RESUME_STATE}
            onUpdate={setCurrentResume}
            onAddItem={addItem}
            onRemoveItem={removeItem}
          />
        </div>
      </div>
    </div>
  );
}

export { EditableTextarea, ContactItem, SectionTitle };
