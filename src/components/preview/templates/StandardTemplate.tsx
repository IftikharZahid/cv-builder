import { useState, useEffect } from "react";
import { useCVStore } from "../../../store/cvStore";
import SectionWrapper from "../SectionWrapper";

export default function StandardTemplate() {
  const { data, updateField } = useCVStore();
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const cvPreview = document.getElementById('cv-preview');
      const scale = cvPreview ? cvPreview.getBoundingClientRect().width / cvPreview.offsetWidth : 1;
      
      // Calculate new width: moving mouse left increases width (since panel is on right)
      // e.movementX is positive when moving right, which should decrease the right panel width
      const newWidth = (data.sidebarWidth || 250) - (e.movementX / scale);
      
      // Constrain width between 180px and 350px
      updateField('sidebarWidth', Math.max(180, Math.min(350, newWidth)));
    };
    
    const handleMouseUp = () => setIsResizing(false);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, data.sidebarWidth, updateField]);

  return (
    <div
      id="cv-preview"
      className="bg-white shadow-lg min-h-[1122px] w-full max-w-[794px] mx-auto text-slate-800 text-sm font-sans"
    >
      {/* Top Banner */}
      {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="bg-slate-800 text-white p-5 flex items-center gap-5 -m-2 p-2">
        <div className="flex items-center gap-5 w-full">
          {data.profileImage && (
            <img
              src={data.profileImage}
              className="w-28 h-28 rounded-full border-4 border-white/20 object-cover"
              alt="Profile"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 tracking-wide">{data.fullName || "Your Name"}</h1>
            <p className="text-xl text-blue-300 font-medium">{data.designation || "Your Designation"}</p>
          </div>
        </div>
      </SectionWrapper>
)}

      <div className="p-5">
        <div className="flex gap-4 relative">
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-3 min-w-0">
            {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="-m-2 p-2">
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">Profile</h2>
              <p className="text-slate-600 leading-relaxed text-justify">{data.summary}</p>
            </SectionWrapper>
)}

            {(data.activeTabs?.includes('experience') && (data.activeTabs?.includes('experience') && data.experiences?.length > 0)) && (
              <SectionWrapper id="experience" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-2">Experience</h2>
                <div className="space-y-5">
                  {data.experiences.map((exp: any, index: number) => (
                  <div key={index} className="break-inside-avoid mb-4 last:mb-0">
                      <h3 className="font-bold text-base text-slate-900">{exp.position}</h3>
                      <p className="text-slate-600 font-bold text-sm mb-1">{exp.company} • {exp.location}</p>
                      <p className="text-blue-600 text-xs font-bold mb-2">{exp.startDate} - {exp.endDate}</p>
                      {exp.description && (
                        <div 
                          className="prose prose-sm text-slate-600 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 custom-bullets"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            )}

            {(data.activeTabs?.includes('projects') && (data.activeTabs?.includes('projects') && data.projects?.length > 0)) && (
              <SectionWrapper id="projects" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-2">Projects</h2>
                <div className="space-y-5">
                  {data.projects.map((proj: any, index: number) => (
                    <div key={index}>
                      <h3 className="font-bold text-base text-slate-900">{proj.title}</h3>
                      <p className="text-slate-600 font-bold text-sm mb-1">{proj.company}</p>
                      <p className="text-blue-600 text-xs font-bold mb-1">{proj.duration}</p>
                      {proj.website && (
                        <a href={proj.website} className="text-blue-600 text-xs font-bold mb-2 underline block">
                          {proj.website}
                        </a>
                      )}
                      {proj.description && (
                        <div 
                          className="prose prose-sm text-slate-600 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 custom-bullets"
                          dangerouslySetInnerHTML={{ __html: proj.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            )}

            {(data.activeTabs?.includes('references') && data.references?.length > 0) && (
              <SectionWrapper id="references" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-2">References</h2>
                <div className="grid grid-cols-2 gap-4">
                  {data.references.map((ref: any, index: number) => (
                    <div key={index}>
                      <p className="font-bold text-slate-900">{ref.name}</p>
                      <p className="text-slate-600">{ref.organization}</p>
                      <p className="text-slate-500 text-xs mt-1">{ref.email} | {ref.phone}</p>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            )}
          </div>

          {/* Resizer Handle */}
          <div 
            className="w-1.5 hover:bg-slate-300 active:bg-slate-400 cursor-col-resize transition-colors rounded-full shrink-0 print:hidden flex items-center justify-center group"
            onMouseDown={(e) => { e.preventDefault(); setIsResizing(true); }}
          >
            <div className="w-0.5 h-8 bg-slate-200 group-hover:bg-white rounded-full transition-colors" />
          </div>

          {/* Side Content (Right) */}
          <div className="space-y-3 shrink-0" style={{ width: `${data.sidebarWidth || 250}px` }}>
            {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="-m-2 p-2">
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">Contact</h2>
              <div className="space-y-2 text-slate-600 text-sm">
                <p className="break-all">{data.email}</p>
                <p>{data.phone}</p>
                <p className="whitespace-pre-wrap">{data.address}</p>
                {data.website && <p className="break-all">{data.website}</p>}
                {data.linkedin && <p className="break-all">{data.linkedin}</p>}
                {data.github && <p className="break-all">{data.github}</p>}
              </div>
            </SectionWrapper>
)}

            {(data.activeTabs?.includes('skills') && (data.activeTabs?.includes('skills') && data.skills?.length > 0)) && (
              <SectionWrapper id="skills" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: any, i: number) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </SectionWrapper>
            )}

            {(data.activeTabs?.includes('education') && (data.activeTabs?.includes('education') && data.education?.length > 0)) && (
              <SectionWrapper id="education" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-2">Education</h2>
                <div className="space-y-2">
                  {data.education.map((edu: any, index: number) => (
                    <div key={index}>
                      <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                      <p className="text-slate-600 text-sm">{edu.institute}</p>
                      <p className="text-blue-600 text-xs font-semibold">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            )}

            {((data.activeTabs?.includes('certifications') && data.certifications?.length > 0) || (data.activeTabs?.includes('awards') && data.awards?.length > 0)) && (
              <SectionWrapper id="certifications" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">Achievements</h2>
                <ul className="space-y-2 text-sm text-slate-600">
                  {data.certifications?.map((c: any, i: number) => <li key={`c-${i}`}>• {c.title} ({c.year})</li>)}
                  {data.awards?.map((a: any, i: number) => (
                    <li key={`a-${i}`} className="flex flex-col mb-1 last:mb-0">
                      <span>• {a.title} {a.year && `(${a.year})`}</span>
                      {(a.organization || a.description) && (
                        <div className="ml-3 flex flex-col mt-0.5">
                          {a.organization && <span className="text-xs italic">{a.organization}</span>}
                          {a.description && <span className="text-xs">{a.description}</span>}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </SectionWrapper>
            )}

            {((data.activeTabs?.includes('languages') && data.languages?.length > 0)) && (
              <SectionWrapper id="languages" className="-m-2 p-2">
                <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-3">Languages</h2>
                <ul className="space-y-1 text-sm text-slate-600">
                  {data.languages.map((l: any, i: number) => (
                    <li key={i} className="flex justify-between">
                      <span>{l.name}</span>
                      <span className="font-medium">{l.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </SectionWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
