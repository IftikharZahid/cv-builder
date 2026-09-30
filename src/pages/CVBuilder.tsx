import { useRef, useEffect, useState, useCallback } from "react";
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
  Trophy, Users, CheckCircle2, PlusCircle, ChevronDown,
  X, PanelLeft, PanelLeftClose, SlidersHorizontal,
  ZoomIn, ZoomOut, RotateCcw, Eye, Sparkles
} from "lucide-react";

export default function CVBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Responsive state: detect mobile screens (< 768px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Auto-hide menu on left in mobile view (closed on mobile, open on desktop)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });

  const prevIsMobileRef = useRef<boolean>(isMobile);

  // Zoom and scale state
  const [fitScale, setFitScale] = useState(1);
  const [zoomMode, setZoomMode] = useState<"fit" | "custom">("fit");
  const [customZoom, setCustomZoom] = useState<number>(1);
  const [previewHeight, setPreviewHeight] = useState(1123);

  // UI state
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [panelWidth, setPanelWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data, updateField, loadSampleData, clearAllData } = useCVStore();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleLoadSampleData = () => {
    loadSampleData();
    showToast("✨ Sample resume data loaded successfully!");
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data? This will reset all fields.")) {
      clearAllData();
      showToast("Resume reset to blank.");
    }
  };

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

  // Auto-detect screen size changes and auto-hide menu on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-hide when resizing into mobile view, auto-show when resizing into desktop view
      if (mobile !== prevIsMobileRef.current) {
        if (mobile) {
          setIsSidebarOpen(false); // Auto-hide menu in mobile view
        } else {
          setIsSidebarOpen(true);
        }
        prevIsMobileRef.current = mobile;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Listen to custom event from SectionWrapper in CV preview
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      const sectionId = customEvent.detail;

      // Ensure it's active
      const currentTabs = useCVStore.getState().data.activeTabs || [];
      if (!currentTabs.includes(sectionId)) {
        updateField("activeTabs", [...currentTabs, sectionId]);
      }
      setActiveTab(sectionId);

      // Auto-open sidebar/drawer on mobile so user can edit right away
      setIsSidebarOpen(true);
    };

    window.addEventListener("openCVModal", handleOpenModal);
    return () => window.removeEventListener("openCVModal", handleOpenModal);
  }, [updateField]);

  // Handle escape key to close menus/drawers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showThemeMenu) setShowThemeMenu(false);
        if (isMobile && isSidebarOpen) setIsSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showThemeMenu, isMobile, isSidebarOpen]);

  // Calculate fit scale whenever container size changes
  const updateFitScale = useCallback(() => {
    if (!containerRef.current) return;
    const isSmall = window.innerWidth < 640;
    const padding = isSmall ? 16 : 48;
    const availableWidth = containerRef.current.clientWidth - padding;
    const a4Width = 794;
    const calculatedScale = Math.min(1.2, Math.max(0.2, availableWidth / a4Width));
    setFitScale(calculatedScale);
  }, []);

  // ResizeObserver for preview container
  useEffect(() => {
    if (!containerRef.current) return;
    updateFitScale();
    const ro = new ResizeObserver(updateFitScale);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateFitScale]);

  // ResizeObserver for preview content actual height
  useEffect(() => {
    if (!previewRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === previewRef.current) {
          setPreviewHeight(Math.max(1123, previewRef.current.offsetHeight));
        }
      }
    });
    ro.observe(previewRef.current);
    return () => ro.disconnect();
  }, []);

  // Desktop panel resizing
  useEffect(() => {
    if (!isResizing || isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(280, Math.min(650, e.clientX));
      setPanelWidth(newWidth);
    };
    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, isMobile]);

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

  const effectiveScale = zoomMode === "fit" ? fitScale : customZoom;

  const handleZoomChange = (delta: number) => {
    setZoomMode("custom");
    setCustomZoom((prev) => {
      const current = zoomMode === "custom" ? prev : fitScale;
      const next = Math.round((current + delta) * 10) / 10;
      return Math.min(1.5, Math.max(0.25, next));
    });
  };

  const handleResetZoom = () => {
    setZoomMode("fit");
    setCustomZoom(fitScale);
  };

  const renderModulesList = () => (
    <div className={`flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 ${isResizing ? 'pointer-events-none' : ''}`}>
      {modules.map((mod) => {
        const currentTabs = data.activeTabs || [];
        const isActive = currentTabs.includes(mod.id);
        const isExpanded = activeTab === mod.id;
        const Icon = mod.icon;
        const FormComponent = mod.form;

        return (
          <div key={mod.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs transition-all duration-200">
            {/* Header */}
            <div
              className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer select-none transition-colors ${isExpanded ? 'bg-red-50/50' : 'hover:bg-gray-50'}`}
              onClick={() => {
                if (isActive) {
                  setActiveTab(isExpanded ? "" : mod.id);
                } else {
                  toggleModule(mod.id);
                }
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-md shrink-0 ${isActive ? 'bg-red-100 text-cv-red' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-sm font-medium truncate ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                  {mod.label}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
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
              <div className="p-1 border-t border-gray-100 bg-gray-50/40 animate-in slide-in-from-top-1 duration-200 [&>div]:!p-3 [&>div]:!border-none [&>div]:!shadow-none [&>div]:!mb-0 [&>div]:!bg-transparent">
                <FormComponent />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-18 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white text-xs font-medium px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-gray-700/80 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white ml-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div id="top-bar" className="h-14 sm:h-16 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Menu / Sidebar Toggle Button (Professional Icon Only, No Text) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg border transition-all duration-200 active:scale-95 flex items-center justify-center ${
              isSidebarOpen && !isMobile
                ? 'bg-red-50 text-cv-red border-red-200 hover:bg-red-100 hover:border-red-300'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900 shadow-2xs'
            }`}
            title={isSidebarOpen ? "Hide Left Menu" : "Show Left Menu"}
            aria-label={isSidebarOpen ? "Hide Left Menu" : "Show Left Menu"}
          >
            <PanelLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Logo & Brand Title */}
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="CV Builder Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-2xs transition-transform hover:scale-105"
            />
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">
                CV Builder
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Pro
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Sample Data Filler Button - Visible on desktop, hidden in mobile view header */}
          <button
            onClick={handleLoadSampleData}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-300/80 rounded-lg transition-all shadow-2xs group shrink-0"
            title="Fill with professional sample data"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-12 transition-transform" />
            <span>Sample Data</span>
          </button>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border hover:bg-gray-50 rounded-lg transition-colors shadow-2xs"
              title="Change Template Theme"
            >
              <LayoutTemplate className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
              <span className="hidden md:inline">Theme: </span>
              <span className="capitalize font-semibold text-gray-800">{data.theme || "Modern"}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {showThemeMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowThemeMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    Templates
                  </div>
                  {["modern", "classical", "standard", "minimalist", "elegant"].map(theme => (
                    <button
                      key={theme}
                      onClick={() => { updateField("theme", theme); setShowThemeMenu(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm capitalize hover:bg-gray-50 flex items-center justify-between transition-colors ${
                        data.theme === theme ? "font-bold text-cv-red bg-red-50/50" : "text-gray-700"
                      }`}
                    >
                      <span>{theme} Layout</span>
                      {data.theme === theme && <span className="w-1.5 h-1.5 rounded-full bg-cv-red" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="w-px h-5 sm:h-6 bg-gray-200 mx-0.5 sm:mx-1 hidden xs:block"></div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Print CV"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Export PDF Button */}
          <button
            onClick={exportPDF}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-cv-red hover:bg-red-800 rounded-lg transition-colors shadow-2xs shrink-0"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Export<span className="hidden sm:inline"> PDF</span></span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Panel - Forms Drawer on Mobile / Sidebar on Desktop */}
        <div
          id="left-panel"
          style={!isMobile && isSidebarOpen ? { width: `${panelWidth}px` } : undefined}
          className={`bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ease-in-out ${
            isMobile
              ? `fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] shadow-2xl ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
                }`
              : `${isSidebarOpen ? 'relative shrink-0' : 'hidden'}`
          } ${isResizing ? 'select-none' : ''}`}
        >
          {/* Desktop Resizer Handle */}
          {!isMobile && (
            <div
              className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-cv-red/50 active:bg-cv-red z-50 transition-colors"
              onMouseDown={() => setIsResizing(true)}
              title="Drag to resize panel"
            />
          )}

          {/* Header of Left Panel */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-red-100 text-cv-red rounded-md">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-800">CV Modules</h2>
                  <p className="text-[11px] text-gray-500">Customize sections & data</p>
                </div>
              </div>

              {isMobile ? (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 rounded-md transition-colors"
                  title="Close menu"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 rounded-md transition-colors"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Preset Actions inside left panel */}
            <div className="flex items-center gap-2 pt-2.5 border-t border-gray-200/70">
              <button
                onClick={handleLoadSampleData}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-300/80 rounded-lg transition-all shadow-2xs group"
                title="Fill all sections with realistic sample resume data"
              >
                <Sparkles className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform shrink-0" />
                <span>Fill with Sample Data</span>
              </button>
              <button
                onClick={handleClearData}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 border border-gray-200 rounded-lg transition-colors"
                title="Clear all fields"
                aria-label="Clear all fields"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List of Modules */}
          {renderModulesList()}

          {/* Mobile Drawer Footer with Done & View Preview button */}
          {isMobile && (
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0 shadow-lg">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full py-2.5 px-4 bg-cv-red hover:bg-red-800 active:scale-[0.99] text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Done & View Preview</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Panel - Full Screen Responsive Preview */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100/70 relative">
          {/* Mobile Floating Zoom Controls on Preview */}
          <div className="md:hidden absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-md rounded-lg p-1 text-xs text-gray-700 print:hidden">
            <button
              onClick={() => handleZoomChange(-0.1)}
              className="p-1 hover:bg-gray-100 rounded text-gray-600"
              title="Zoom out"
              disabled={effectiveScale <= 0.2}
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1 text-[10px] font-semibold text-gray-700"
              title="Reset Zoom to Fit"
            >
              {Math.round(effectiveScale * 100)}%
            </button>
            <button
              onClick={() => handleZoomChange(0.1)}
              className="p-1 hover:bg-gray-100 rounded text-gray-600"
              title="Zoom in"
              disabled={effectiveScale >= 1.5}
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            {zoomMode !== "fit" && (
              <button
                onClick={handleResetZoom}
                className="p-1 text-cv-red border-l border-gray-200 pl-1 ml-0.5"
                title="Fit to Screen"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          {/* Scrollable Document Canvas Viewport */}
          <div
            className="w-full h-full overflow-auto flex justify-center items-start p-2 sm:p-4 md:p-8 print:p-0 custom-scrollbar"
            ref={containerRef}
          >
            {/* Visual Sizing Box matching exact scaled dimensions */}
            <div
              style={{
                width: `${794 * effectiveScale}px`,
                height: `${previewHeight * effectiveScale}px`,
              }}
              className="preview-sizing-wrapper relative shrink-0 transition-all duration-150 print:!w-full print:!min-h-0 print:!h-auto print:!m-0 print:!p-0 print:!block"
            >
              <div
                ref={previewRef}
                className="origin-top-left transition-transform duration-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5 preview-scale-wrapper print:!shadow-none print:!ring-0 print:!w-full"
                style={{
                  transform: `scale(${effectiveScale})`,
                  width: "794px",
                  minHeight: "1123px",
                  backgroundColor: "white",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <CVPreview />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Status & Tools Footer */}
      <div id="footer" className="hidden md:flex h-9 bg-white border-t border-gray-200 px-4 items-center justify-between text-xs text-gray-500 shrink-0 select-none z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Auto-saved locally
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">Format: Standard A4 (210 × 297 mm)</span>
        </div>

        <div className="text-gray-400">
          💡 Click any section on the CV to edit directly • Drag edge to resize editor
        </div>

        <div className="flex items-center gap-3">
          {/* Docked Desktop Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-md px-1 py-0.5">
            <button
              onClick={() => handleZoomChange(-0.1)}
              className="p-0.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"
              title="Zoom out"
              disabled={effectiveScale <= 0.2}
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-1.5 text-[11px] font-semibold text-gray-700 hover:text-cv-red transition-colors"
              title="Reset to Fit Screen"
            >
              {Math.round(effectiveScale * 100)}%
            </button>
            <button
              onClick={() => handleZoomChange(0.1)}
              className="p-0.5 hover:bg-gray-200 rounded text-gray-600 transition-colors"
              title="Zoom in"
              disabled={effectiveScale >= 1.5}
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            {zoomMode !== "fit" && (
              <button
                onClick={handleResetZoom}
                className="p-0.5 hover:bg-gray-200 rounded text-cv-red transition-colors border-l border-gray-200 pl-1 ml-0.5"
                title="Reset to Fit Screen"
              >
                <RotateCcw className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
          <span className="text-gray-300">|</span>
          <span className="font-medium text-gray-600">ATS Friendly</span>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar / Footer */}
      <div id="bottom-bar" className="md:hidden h-14 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 flex items-center justify-around z-30 shadow-lg shrink-0">
        {/* Modules / Edit Drawer Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 text-gray-700 hover:text-cv-red transition-colors relative"
          title="Edit CV Sections"
        >
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-cv-red text-white text-[9px] font-bold px-1 py-0.2 rounded-full leading-tight">
              {data.activeTabs?.length || 0}
            </span>
          </div>
          <span className="text-[10px] font-medium">Sections</span>
        </button>

        {/* Fill Sample Data */}
        <button
          onClick={handleLoadSampleData}
          className="flex flex-col items-center gap-0.5 py-1 px-2 text-amber-800 hover:text-amber-900 transition-colors"
          title="Load Sample Resume Data"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] font-medium">Sample Data</span>
        </button>

        {/* Templates */}
        <button
          onClick={() => setShowThemeMenu(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-2 text-gray-700 hover:text-cv-red transition-colors"
          title="Switch Template Theme"
        >
          <LayoutTemplate className="w-4 h-4 text-gray-700" />
          <span className="text-[10px] font-medium capitalize">{data.theme || "Modern"}</span>
        </button>

        {/* Quick Export PDF */}
        <button
          onClick={exportPDF}
          className="flex items-center gap-1 py-1.5 px-3 bg-cv-red hover:bg-red-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-95"
          title="Download PDF"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
}