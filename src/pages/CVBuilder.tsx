import { useRef, useEffect, useState } from "react";
import ProfileForm from "../components/forms/ProfileForm";
import SkillsForm from "../components/forms/SkillsForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import EducationForm from "../components/forms/EducationForm";
import ProjectForm from "../components/forms/ProjectForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import LanguagesForm from "../components/forms/LanguagesForm";
import HobbiesForm from "../components/forms/HobbiesForm";
import AwardsForm from "../components/forms/AwardsForm";
import ReferencesForm from "../components/forms/ReferencesForm";
import CVPreview from "../components/preview/CVPreview";
import { exportPDF } from "../utils/exportPdf";
import { useCVStore } from "../store/cvStore";
import {
  Download, Printer, LayoutTemplate,
  User, Wrench, Briefcase, GraduationCap,
  FolderGit2, Award, Globe, Heart,
  Trophy, Users, CheckCircle2, PlusCircle, ChevronDown
} from "lucide-react";

export default function CVBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);

  const { data, updateField } = useCVStore();

  const [activeTab, setActiveTab] = useState<string>("profile");

  const modules = [
    { id: "profile", label: "Personal Details", icon: User, form: ProfileForm },
    { id: "skills", label: "Skills", icon: Wrench, form: SkillsForm },
    { id: "experience", label: "Experience", icon: Briefcase, form: ExperienceForm },
    { id: "education", label: "Education", icon: GraduationCap, form: EducationForm },
    { id: "projects", label: "Projects", icon: FolderGit2, form: ProjectForm },
    { id: "certifications", label: "Certifications", icon: Award, form: CertificationsForm },
    { id: "languages", label: "Languages", icon: Globe, form: LanguagesForm },
    { id: "hobbies", label: "Hobbies", icon: Heart, form: HobbiesForm },
    { id: "awards", label: "Awards", icon: Trophy, form: AwardsForm },
    { id: "references", label: "References", icon: Users, form: ReferencesForm },
  ];

  // Listen to custom event from SectionWrapper
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      const sectionId = customEvent.detail;

      // Ensure it's active
      if (!useCVStore.getState().data.activeTabs.includes(sectionId)) {
        updateField("activeTabs", [...useCVStore.getState().data.activeTabs, sectionId]);
      }
      setActiveTab(sectionId);
    };
    window.addEventListener('openCVModal', handleOpenModal);
    return () => window.removeEventListener('openCVModal', handleOpenModal);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 40;
        const a4Width = 794;
        const newScale = Math.min(1, containerWidth / a4Width);
        setScale(newScale);
      }
    };
    setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(280, Math.min(800, e.clientX));
      setPanelWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const toggleModule = (id: string) => {
    const currentTabs = useCVStore.getState().data.activeTabs || [];
    if (currentTabs.includes(id)) {
      updateField("activeTabs", currentTabs.filter(tab => tab !== id));
      if (activeTab === id) setActiveTab("");
    } else {
      updateField("activeTabs", [...currentTabs, id]);
      setActiveTab(id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative">
      {/* Top Navigation Bar */}
      <div id="top-bar" className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="CV Builder Logo"
            className="w-9 h-9 object-contain drop-shadow-sm transition-transform hover:scale-105"
          />
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">CV Builder</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              Pro
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border hover:bg-gray-50 rounded-md transition-colors"
            >
              <LayoutTemplate className="w-4 h-4" /> Theme: <span className="capitalize">{data.theme || "Modern"}</span>
            </button>
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <div className="py-1">
                  {["modern", "classical", "standard", "minimalist", "elegant"].map(theme => (
                    <button
                      key={theme}
                      onClick={() => { updateField("theme", theme); setShowThemeMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-100 ${data.theme === theme ? "font-bold text-cv-red" : "text-gray-700"}`}
                    >
                      {theme} Layout
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cv-red hover:bg-red-800 rounded-md transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Forms Accordion */}
        <div
          id="left-panel"
          style={{ width: `${panelWidth}px` }}
          className={`bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-sm z-10 relative ${isResizing ? 'select-none' : ''}`}
        >
          {/* Resizer Handle */}
          <div
            className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-cv-red/50 active:bg-cv-red z-50 transition-colors"
            onMouseDown={() => setIsResizing(true)}
          />

          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <h2 className="text-base font-bold text-gray-800">CV Modules</h2>
            <p className="text-xs text-gray-500 mt-0.5">Select and fill sections</p>
          </div>

          <div className={`flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 ${isResizing ? 'pointer-events-none' : ''}`}>
            {modules.map((mod) => {
              const currentTabs = data.activeTabs || [];
              const isActive = currentTabs.includes(mod.id);
              const isExpanded = activeTab === mod.id;
              const Icon = mod.icon;
              const FormComponent = mod.form;

              return (
                <div key={mod.id} className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm transition-all duration-200">
                  {/* Header */}
                  <div
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer select-none transition-colors ${isExpanded ? 'bg-red-50/50' : 'hover:bg-gray-50'}`}
                    onClick={() => {
                      if (isActive) {
                        setActiveTab(isExpanded ? "" : mod.id);
                      } else {
                        toggleModule(mod.id);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-md ${isActive ? 'bg-red-100 text-cv-red' : 'bg-gray-100 text-gray-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {mod.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Add/Remove toggle */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModule(mod.id);
                        }}
                        className={`p-1 rounded-full transition-colors ${isActive ? 'text-cv-red hover:bg-red-100' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={isActive ? "Remove from CV" : "Add to CV"}
                      >
                        {isActive ? <CheckCircle2 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                      </button>
                      {isActive && (
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Form Content */}
                  {isActive && isExpanded && (
                    <div className="p-1 border-t border-gray-100 bg-gray-50/50 animate-in slide-in-from-top-1 duration-200 [&>div]:!p-3 [&>div]:!border-none [&>div]:!shadow-none [&>div]:!mb-0 [&>div]:!bg-transparent">
                      <FormComponent />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Full Screen Preview */}
        <div className="flex-1 flex overflow-hidden bg-transparent relative">
          <div
            className="w-full h-full overflow-auto flex justify-center items-start p-8 print:p-0 custom-scrollbar"
            ref={containerRef}
          >
            <div
              className="origin-top transition-transform duration-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5 preview-scale-wrapper"
              style={{
                transform: `scale(${scale})`,
                width: "794px",
                minHeight: "1123px",
                backgroundColor: "white"
              }}
            >
              <CVPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}