import { useState, useEffect } from "react";
import { useCVStore } from "../../../store/cvStore";
import { Cog, Clock } from "lucide-react";
import SectionWrapper from "../SectionWrapper";

export default function ModernTemplate() {
  const { data, updateField } = useCVStore();
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const cvPreview = document.getElementById('cv-preview');
      const scale = cvPreview ? cvPreview.getBoundingClientRect().width / cvPreview.offsetWidth : 1;
      
      const newWidth = (data.sidebarWidth || 250) - (e.movementX / scale);
      
      updateField('sidebarWidth', Math.max(180, Math.min(400, newWidth)));
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
      className="bg-white shadow-lg min-h-[1122px] w-full max-w-[794px] mx-auto text-gray-800 text-sm"
    >
      <div className="flex min-h-[1122px] relative">
        {/* LEFT COLUMN */}
        <div className="flex-1 p-5 bg-white pr-6 min-w-0">
          {/* Header */}
          {(!data.activeTabs || data.activeTabs.includes('profile')) && (
            <>
              <SectionWrapper id="profile" className="mb-2.5 -m-2 p-2">
                <div className="flex items-center gap-3">
                  {data.profileImage ? (
                    <img
                      src={data.profileImage}
                      className="w-32 h-32 rounded-full object-cover shadow-sm"
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 shadow-sm" />
                  )}
                  <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                      {data.fullName || "Your Name"}
                    </h1>
                    <p className="text-cv-red font-semibold mt-1">
                      {data.designation || "Your Designation"}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <p className="font-semibold text-gray-800 leading-snug mt-3 text-justify">
                  {data.summary || "To pursue a career in a progressive organization that provides opportunities for career growth and professional development in order to groom the overall personality."}
                </p>
              </SectionWrapper>

              <hr className="border-t border-cv-red mb-2.5" />
            </>
          )}

          {/* Skills & Strengths */}
          {(data.activeTabs?.includes('skills') && (data.activeTabs?.includes('skills') && data.skills?.length > 0)) && (
            <>
              <SectionWrapper id="skills" className="mb-2.5 -m-2 p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Cog className="w-6 h-6 text-gray-600" />
                  <h2 className="text-xl font-bold text-gray-700">Skills & Strengths</h2>
                </div>
                <div className="grid grid-cols-2 gap-y-2">
                  {data.skills.map((skill: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-cv-red mt-1.5 mr-3 shrink-0"></div>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
              <hr className="border-t border-cv-red mb-2.5" />
            </>
          )}

          {/* Experience */}
          {(data.activeTabs?.includes('experience') && (data.activeTabs?.includes('experience') && data.experiences?.length > 0)) && (
            <SectionWrapper id="experience" className="mb-2.5 -m-2 p-2">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-bold text-gray-700">Experience</h2>
              </div>
              
              <div className="space-y-3">
                {data.experiences.map((exp: any, index: number) => (
                  <div key={index} className="break-inside-avoid mb-4 last:mb-0">
                    <h3 className="text-cv-red font-bold text-base">{exp.position}</h3>
                    <p className="text-gray-700 font-bold text-xs mb-2 uppercase">
                      {exp.company} - {exp.location} | <span className="text-cv-red font-bold">{exp.startDate} - {exp.endDate}</span>
                    </p>
                    {exp.description && (
                      <div 
                        className="prose prose-sm text-gray-800 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 custom-bullets"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* Projects */}
          {(data.activeTabs?.includes('projects') && (data.activeTabs?.includes('projects') && data.projects?.length > 0)) && (
            <SectionWrapper id="projects" className="mb-2.5 -m-2 p-2">
              <h2 className="text-xl font-bold text-gray-700 mb-2">Projects</h2>
              <div className="space-y-3">
                {data.projects.map((proj: any, index: number) => (
                  <div key={index}>
                    <h3 className="text-cv-red font-bold text-base">{proj.title}</h3>
                    <p className="text-gray-700 text-xs mb-1 font-bold">
                      {proj.company} | <span className="text-cv-red font-bold">{proj.duration}</span>
                    </p>
                    {proj.website && (
                      <a href={proj.website} className="text-cv-red underline text-xs block mb-1 font-bold">
                        {proj.website}
                      </a>
                    )}
                    {proj.description && (
                      <div 
                        className="prose prose-sm text-gray-800 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 custom-bullets"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* References */}
          {(data.activeTabs?.includes('references') && (data.activeTabs?.includes('references') && data.references?.length > 0)) && (
            <SectionWrapper id="references" className="mb-2 -m-2 p-2">
              <h2 className="text-xl font-bold text-gray-700 mb-2">References</h2>
              <div className="space-y-2">
                {data.references.map((ref: any, index: number) => (
                  <div key={index} className="text-xs leading-relaxed">
                    <p className="font-bold">{ref.name}</p>
                    <p>{ref.organization}</p>
                    <p>{ref.email} | {ref.phone}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          <hr className="border-t border-cv-red mt-2" />
        </div>

        {/* Resizer Handle */}
        <div 
          className="w-1.5 hover:bg-slate-300 active:bg-slate-400 cursor-col-resize transition-colors shrink-0 print:hidden flex items-center justify-center group bg-[#f3f4f6]"
          onMouseDown={(e) => { e.preventDefault(); setIsResizing(true); }}
        >
          <div className="w-0.5 h-12 bg-slate-300 group-hover:bg-slate-500 rounded-full transition-colors" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-[#f3f4f6] p-5 pl-6 shrink-0" style={{ width: `${data.sidebarWidth || 250}px` }}>
          {/* Contact Info */}
          {(!data.activeTabs || data.activeTabs.includes('profile')) && (
            <>
              <SectionWrapper id="profile" className="mb-3 -m-2 p-2">
                <h2 className="font-bold text-lg text-gray-700 mb-3">Personal Details</h2>
                <div className="space-y-1 text-gray-700">
                  <p>{data.address || "123 Street, City, Country"}</p>
                  <p className="break-all">{data.email || "email@example.com"}</p>
                  <p>{data.phone || "+1234567890"}</p>
                  {data.website && <p className="break-all">{data.website}</p>}
                  {data.linkedin && <p className="break-all">{data.linkedin}</p>}
                  {data.github && <p className="break-all">{data.github}</p>}
                </div>
              </SectionWrapper>

              <hr className="border-t border-cv-red mb-3" />
            </>
          )}

          {/* Education */}
          {(data.activeTabs?.includes('education') && (data.activeTabs?.includes('education') && data.education?.length > 0)) && (
            <SectionWrapper id="education" className="mb-3 -m-2 p-2">
              <h2 className="font-bold text-lg text-gray-700 mb-3">Education</h2>
              <div className="space-y-2">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <p className="font-bold text-gray-800">{edu.institute}</p>
                    <p className="text-gray-700">{edu.location} / {edu.degree}</p>
                    <p className="text-gray-600 text-xs">({edu.year})</p>
                    {edu.result && <p className="text-gray-700 mt-1">{edu.result}</p>}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {/* Certifications */}
          {(data.activeTabs?.includes('certifications') && (data.activeTabs?.includes('certifications') && data.certifications?.length > 0)) && (
            <SectionWrapper id="certifications" className="mb-3 -m-2 p-2">
              <h2 className="font-bold text-lg text-gray-700 mb-3">Certifications</h2>
              <ul className="space-y-3">
                {data.certifications.map((cert: any, index: number) => (
                  <li key={index}>
                    <div className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-cv-red mt-1.5 mr-2 shrink-0"></div>
                      <div>
                        <p className="text-gray-800">{cert.title}</p>
                        <p className="text-gray-600 text-xs">{cert.provider} | {cert.year}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}

          {/* Awards */}
          {(data.activeTabs?.includes('awards') && (data.activeTabs?.includes('awards') && data.awards?.length > 0)) && (
            <SectionWrapper id="awards" className="mb-3 -m-2 p-2">
              <h2 className="font-bold text-lg text-gray-700 mb-3">Awards</h2>
              <ul className="space-y-3">
                {data.awards.map((award: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-cv-red mt-1.5 mr-2 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-gray-800">{award.title}</span>
                      <span className="text-gray-600 text-xs">{award.organization} {award.year && `| ${award.year}`}</span>
                      {award.description && <span className="text-gray-500 text-xs mt-0.5">{award.description}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}

          {/* Languages */}
          {(data.activeTabs?.includes('languages') && (data.activeTabs?.includes('languages') && data.languages?.length > 0)) && (
            <SectionWrapper id="languages" className="mb-3 -m-2 p-2">
              <h2 className="font-bold text-lg text-gray-700 mb-3">Languages</h2>
              <ul className="space-y-2">
                {data.languages.map((lang: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-cv-red mt-1.5 mr-2 shrink-0"></div>
                    <span>{lang.name} - {lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}

          {/* Hobbies */}
          {(data.activeTabs?.includes('hobbies') && (data.activeTabs?.includes('hobbies') && data.hobbies?.length > 0)) && (
            <SectionWrapper id="hobbies" className="-m-2 p-2">
              <h2 className="font-bold text-lg text-gray-700 mb-3">Hobbies</h2>
              <ul className="space-y-2">
                {data.hobbies.map((hobby: any, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-cv-red mt-1.5 mr-2 shrink-0"></div>
                    <span>{hobby.name}</span>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}

        </div>
      </div>
    </div>
  );
}