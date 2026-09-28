import { useCVStore } from "../../../store/cvStore";
import SectionWrapper from "../SectionWrapper";

export default function ElegantTemplate() {
  const { data } = useCVStore();

  return (
    <div
      id="cv-preview"
      className="bg-white shadow-lg min-h-[1122px] w-full max-w-[794px] mx-auto text-gray-800 text-[12px] leading-snug font-sans flex"
    >
      {/* Left Sidebar */}
      <div className="w-[220px] bg-[#1e293b] text-white p-5 flex flex-col min-h-full shrink-0">
        {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="mb-2.5 text-center -m-2 p-2">
          {data.profileImage ? (
            <img src={data.profileImage} className="w-28 h-28 rounded-full mx-auto mb-3 border-[3px] border-gray-500/30 object-cover" alt="Profile" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-600 mx-auto mb-3 border-[3px] border-gray-500/30" />
          )}
          <h1 className="text-xl font-bold tracking-wider uppercase leading-tight">{data.fullName}</h1>
          <p className="text-[#38bdf8] font-medium mt-1 text-xs">{data.designation}</p>
        </SectionWrapper>
)}

        <div className="space-y-2">
          {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="-m-2 p-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-600 pb-1">Contact</h2>
            <div className="space-y-2 text-xs text-gray-300">
              <p>{data.phone}</p>
              <p className="break-all">{data.email}</p>
              <p className="whitespace-pre-wrap">{data.address}</p>
              {data.website && <p className="break-all">{data.website}</p>}
              {data.linkedin && <p className="break-all">{data.linkedin}</p>}
              {data.github && <p className="break-all">{data.github}</p>}
            </div>
          </SectionWrapper>
)}

          {(data.activeTabs?.includes('skills') && data.skills?.length > 0) && (
            <SectionWrapper id="skills" className="-m-2 p-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-600 pb-1">Skills</h2>
              <div className="space-y-1.5 text-xs text-gray-300">
                {data.skills.map((s: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#38bdf8]" />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {(data.activeTabs?.includes('languages') && data.languages?.length > 0) && (
            <SectionWrapper id="languages" className="-m-2 p-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-600 pb-1">Languages</h2>
              <div className="space-y-1.5 text-xs text-gray-300">
                {data.languages.map((l: any, i: number) => (
                  <div key={i} className="flex justify-between items-center">
                    <span>{l.name}</span>
                    <span className="text-gray-500 text-[9px] uppercase">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-5 py-4 bg-white">
        <div className="space-y-1.5">
          {data.summary && (!data.activeTabs || data.activeTabs.includes('profile')) && (
            <SectionWrapper id="profile" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">Profile</h2>
              <p className="text-gray-600 leading-snug text-justify">{data.summary}</p>
            </SectionWrapper>
          )}

          {(data.activeTabs?.includes('experience') && data.experiences?.length > 0) && (
            <SectionWrapper id="experience" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">Experience</h2>
              <div className="space-y-1.5">
                {data.experiences.map((exp: any, index: number) => (
                  <div key={index} className="break-inside-avoid mb-2.5 last:mb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-base text-gray-900">{exp.position}</h3>
                      <span className="text-xs font-bold text-[#38bdf8] whitespace-nowrap ml-2">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-500 font-bold text-[11px] mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                    {exp.description && (
                      <div 
                        className="prose prose-sm text-gray-600 prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0 custom-bullets"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {(data.activeTabs?.includes('projects') && data.projects?.length > 0) && (
            <SectionWrapper id="projects" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">Projects</h2>
              <div className="space-y-1.5">
                {data.projects.map((proj: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-base text-gray-900">{proj.title}</h3>
                      <span className="text-xs font-bold text-[#38bdf8] whitespace-nowrap ml-2">{proj.duration}</span>
                    </div>
                    <p className="text-gray-500 font-bold text-[11px] mb-1">
                      {proj.company} {proj.website && <a href={proj.website} className="text-[#38bdf8] font-bold ml-1 underline">({proj.website})</a>}
                    </p>
                    {proj.description && (
                      <div 
                        className="prose prose-sm text-gray-600 prose-p:my-0.5 prose-ul:my-0.5 prose-li:my-0 custom-bullets"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {(data.activeTabs?.includes('education') && data.education?.length > 0) && (
            <SectionWrapper id="education" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">Education</h2>
              <div className="space-y-1.5">
                {data.education.map((edu: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-xs font-bold text-[#38bdf8] whitespace-nowrap ml-2">{edu.year}</span>
                    </div>
                    <p className="text-gray-600 text-xs">{edu.institute}{edu.location ? `, ${edu.location}` : ""}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

          {((data.activeTabs?.includes('certifications') && data.certifications?.length > 0)) && (
            <SectionWrapper id="certifications" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">Certifications</h2>
              <ul className="space-y-1 text-gray-600">
                {data.certifications.map((cert: any, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-[#38bdf8] text-xs">✦</span>
                    <span className="text-xs">{cert.title} {cert.year ? `(${cert.year})` : ""} {cert.provider ? `- ${cert.provider}` : ""}</span>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}

          {(data.activeTabs?.includes('references') && data.references?.length > 0) && (
            <SectionWrapper id="references" className="-m-2 p-2">
              <h2 className="text-base font-bold text-gray-800 border-b-2 border-[#1e293b] inline-block mb-1.5">References</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.references.map((ref: any, index: number) => (
                  <div key={index} className="text-xs">
                    <p className="font-bold text-gray-900">{ref.name}</p>
                    <p className="text-gray-500 font-medium">{ref.organization}</p>
                    <p className="text-gray-600">{ref.email} | {ref.phone}</p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          )}

        </div>
      </div>
    </div>
  );
}
