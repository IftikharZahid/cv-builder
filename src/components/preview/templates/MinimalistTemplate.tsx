import { useCVStore } from "../../../store/cvStore";
import SectionWrapper from "../SectionWrapper";

export default function MinimalistTemplate() {
  const { data } = useCVStore();

  return (
    <div
      id="cv-preview"
      className="bg-white shadow-lg min-h-[1122px] w-full max-w-[794px] mx-auto text-black text-xs font-sans p-14"
    >
      {/* Header */}
      {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="mb-10 text-center -m-2 p-2">
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase mb-2">{data.fullName || "Your Name"}</h1>
        <p className="text-gray-500 tracking-widest uppercase text-xs mb-2">{data.designation || "Your Designation"}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-gray-500 text-[10px] uppercase tracking-wider">
          <span>{data.email}</span>
          <span>|</span>
          <span>{data.phone}</span>
          <span>|</span>
          <span>{data.address}</span>
          {data.website && (
            <>
              <span>|</span>
              <span>{data.website}</span>
            </>
          )}
          {data.linkedin && (
            <>
              <span>|</span>
              <span>{data.linkedin}</span>
            </>
          )}
          {data.github && (
            <>
              <span>|</span>
              <span>{data.github}</span>
            </>
          )}
        </div>
      </SectionWrapper>
)}

      <div className="space-y-4">
        {/* Summary */}
        {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="-m-2 p-2">
          <p className="text-gray-700 leading-relaxed text-justify text-[13px]">{data.summary}</p>
        </SectionWrapper>
)}

        {/* Experience */}
        {(data.activeTabs?.includes('experience') && (data.activeTabs?.includes('experience') && data.experiences?.length > 0)) && (
          <SectionWrapper id="experience" className="-m-2 p-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-200 pb-2">Experience</h2>
            <div className="space-y-5">
              {data.experiences.map((exp: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-4 break-inside-avoid mb-4 last:mb-0">
                  <div className="col-span-3 text-gray-500 font-bold text-[11px]">
                    <p>{exp.startDate} —</p>
                    <p>{exp.endDate}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="font-bold text-[13px]">{exp.position}</h3>
                    <p className="text-gray-600 font-bold mb-1">{exp.company}, {exp.location}</p>
                    {exp.description && (
                      <div 
                        className="prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 text-gray-700 text-[13px] custom-bullets"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Education */}
        {(data.activeTabs?.includes('education') && (data.activeTabs?.includes('education') && data.education?.length > 0)) && (
          <SectionWrapper id="education" className="-m-2 p-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-200 pb-2">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-gray-500 text-[11px]">
                    <p>{edu.year}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="font-bold text-[13px]">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institute}, {edu.location}</p>
                    {edu.result && <p className="text-gray-500 mt-1">Result: {edu.result}</p>}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Projects */}
        {(data.activeTabs?.includes('projects') && (data.activeTabs?.includes('projects') && data.projects?.length > 0)) && (
          <SectionWrapper id="projects" className="-m-2 p-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-200 pb-2">Projects</h2>
            <div className="space-y-5">
              {data.projects.map((proj: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-gray-500 text-[11px] font-bold">
                    <p>{proj.duration}</p>
                  </div>
                  <div className="col-span-9">
                    <h3 className="font-bold text-[13px]">{proj.title}</h3>
                    <p className="text-gray-600 mb-1 font-bold">
                      {proj.company} {proj.website && <a href={proj.website} className="text-blue-500 font-bold ml-1 underline">{proj.website}</a>}
                    </p>
                    {proj.description && (
                      <div 
                        className="prose prose-sm prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 text-gray-700 text-[13px] custom-bullets"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Skills & Others */}
        <div className="grid grid-cols-2 gap-5">
          {((data.activeTabs?.includes('skills') && data.skills?.length > 0) || (data.activeTabs?.includes('hobbies') && data.hobbies?.length > 0)) && (
            <SectionWrapper id="skills" className="-m-2 p-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-2">Skills & Hobbies</h2>
              <ul className="text-[13px] text-gray-700 space-y-1">
                {data.skills?.map((s: any, i: number) => <li key={`s-${i}`}>{s.name}</li>)}
                {data.hobbies?.map((h: any, i: number) => <li key={`h-${i}`}>{h.name}</li>)}
              </ul>
            </SectionWrapper>
          )}
          
          {((data.activeTabs?.includes('languages') && data.languages?.length > 0) || (data.activeTabs?.includes('certifications') && data.certifications?.length > 0) || (data.activeTabs?.includes('awards') && data.awards?.length > 0)) && (
            <SectionWrapper id="certifications" className="-m-2 p-2">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-3 border-b border-gray-200 pb-2">Additional Info</h2>
              <ul className="text-[13px] text-gray-700 space-y-1">
                {data.certifications?.map((c: any, i: number) => <li key={`c-${i}`}>{c.title} ({c.year})</li>)}
                {data.awards?.map((a: any, i: number) => <li key={`a-${i}`}>{a.title} {a.year && `(${a.year})`}</li>)}
                {data.languages?.map((l: any, i: number) => <li key={`l-${i}`}>{l.name} - {l.proficiency}</li>)}
              </ul>
            </SectionWrapper>
          )}
        </div>

        {/* References */}
        {(data.activeTabs?.includes('references') && data.references?.length > 0) && (
          <SectionWrapper id="references" className="-m-2 p-2 mt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-black mb-2 border-b border-gray-200 pb-2">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref: any, index: number) => (
                <div key={index} className="text-[13px]">
                  <p className="font-bold text-gray-800">{ref.name}</p>
                  <p className="text-gray-600">{ref.organization}</p>
                  <p className="text-gray-600">{ref.email} | {ref.phone}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}
      </div>
    </div>
  );
}
