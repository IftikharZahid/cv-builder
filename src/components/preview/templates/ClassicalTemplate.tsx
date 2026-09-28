import { useCVStore } from "../../../store/cvStore";
import SectionWrapper from "../SectionWrapper";

export default function ClassicalTemplate() {
  const { data } = useCVStore();

  return (
    <div
      id="cv-preview"
      className="bg-white shadow-lg min-h-[1122px] w-full max-w-[794px] mx-auto text-black text-sm font-serif"
    >
      <div className="p-6">
        {/* Header */}
        {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="mb-3 text-center -m-2 p-2">
          <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">
            {data.fullName || "Your Name"}
          </h1>
          <p className="text-lg italic text-gray-700 mb-2">
            {data.designation || "Your Designation"}
          </p>
          <div className="flex justify-center flex-wrap gap-x-4 text-xs">
            <span>{data.email || "email@example.com"}</span>
            <span>•</span>
            <span>{data.phone || "+1234567890"}</span>
            <span>•</span>
            <span>{data.address || "City, Country"}</span>
            {data.website && (
              <>
                <span>•</span>
                <span>{data.website}</span>
              </>
            )}
            {data.linkedin && (
              <>
                <span>•</span>
                <span>{data.linkedin}</span>
              </>
            )}
            {data.github && (
              <>
                <span>•</span>
                <span>{data.github}</span>
              </>
            )}
          </div>
        </SectionWrapper>
)}

        {/* Summary */}
        {(!data.activeTabs || data.activeTabs.includes('profile')) && (
<SectionWrapper id="profile" className="mb-2.5 -m-2 p-2">
          <p className="text-justify leading-relaxed text-sm">
            {data.summary || "Summary text here."}
          </p>
        </SectionWrapper>
)}

        {/* Experience */}
        {(data.activeTabs?.includes('experience') && (data.activeTabs?.includes('experience') && data.experiences?.length > 0)) && (
          <SectionWrapper id="experience" className="mb-2.5 -m-2 p-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Professional Experience</h2>
            <div className="space-y-2">
              {data.experiences.map((exp: any, index: number) => (
                <div key={index} className="break-inside-avoid mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.position}</h3>
                    <span className="text-xs font-bold italic">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-bold text-gray-800">{exp.company}</span>
                    <span className="text-xs font-bold">{exp.location}</span>
                  </div>
                  {exp.description && (
                    <div 
                      className="prose prose-sm text-black prose-p:my-1 prose-ul:my-1 prose-li:my-0.5"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Education */}
        {(data.activeTabs?.includes('education') && (data.activeTabs?.includes('education') && data.education?.length > 0)) && (
          <SectionWrapper id="education" className="mb-2.5 -m-2 p-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p>{edu.institute}, {edu.location}</p>
                    {edu.result && <p className="text-xs mt-1">Result: {edu.result}</p>}
                  </div>
                  <span className="text-xs italic">{edu.year}</span>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Projects */}
        {((data.activeTabs?.includes('projects') && data.projects?.length > 0)) && (
          <SectionWrapper id="projects" className="mb-2.5 -m-2 p-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">Projects</h2>
            <div className="space-y-2">
              {data.projects.map((proj: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{proj.title} <span className="font-bold">| {proj.company}</span></h3>
                    <span className="text-xs font-bold italic">{proj.duration}</span>
                  </div>
                  {proj.website && (
                    <a href={proj.website} className="text-xs underline font-bold mb-1 block">
                      {proj.website}
                    </a>
                  )}
                  {proj.description && (
                    <div 
                      className="prose prose-sm text-black prose-p:my-1 prose-ul:my-1 prose-li:my-0.5"
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

        {/* Skills */}
        {(data.activeTabs?.includes('skills') && (data.activeTabs?.includes('skills') && data.skills?.length > 0)) && (
          <SectionWrapper id="skills" className="mb-2.5 -m-2 p-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">Skills</h2>
            <p className="leading-relaxed">
              {data.skills.map((s: any) => s.name).join(" • ")}
            </p>
          </SectionWrapper>
        )}

        {/* Additional Info (Certifications, Languages) */}
        <div className="grid grid-cols-2 gap-5">
          {((data.activeTabs?.includes('certifications') && data.certifications?.length > 0) || (data.activeTabs?.includes('awards') && data.awards?.length > 0)) && (
            <SectionWrapper id="certifications" className="-m-2 p-2">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">Awards & Certifications</h2>
              <ul className="list-disc pl-4 space-y-1">
                {data.certifications?.map((cert: any, i: number) => (
                  <li key={`cert-${i}`}>{cert.title} ({cert.year})</li>
                ))}
                {data.awards?.map((award: any, i: number) => (
                  <li key={`award-${i}`} className="mb-2 last:mb-0">
                    <div>{award.title} {award.year && `(${award.year})`}</div>
                    {(award.organization || award.description) && (
                      <div className="flex flex-col mt-0.5">
                        {award.organization && <div className="text-xs italic">{award.organization}</div>}
                        {award.description && <div className="text-xs">{award.description}</div>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          )}
          {((data.activeTabs?.includes('languages') && data.languages?.length > 0) || (data.activeTabs?.includes('hobbies') && data.hobbies?.length > 0)) && (
            <SectionWrapper id="languages" className="-m-2 p-2">
              <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-3">Languages & Interests</h2>
              <ul className="list-disc pl-4 space-y-1">
                {data.languages?.map((lang: any, i: number) => (
                  <li key={`lang-${i}`}>{lang.name} - {lang.proficiency}</li>
                ))}
                {data.hobbies?.map((hobby: any, i: number) => (
                  <li key={`hobby-${i}`}>{hobby.name}</li>
                ))}
              </ul>
            </SectionWrapper>
          )}
        </div>

        {/* References */}
        {(data.activeTabs?.includes('references') && data.references?.length > 0) && (
          <SectionWrapper id="references" className="mt-4 -m-2 p-2">
            <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-1 mb-2">References</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.references.map((ref: any, index: number) => (
                <div key={index} className="text-sm">
                  <p className="font-bold">{ref.name}</p>
                  <p className="italic">{ref.organization}</p>
                  <p>{ref.email} | {ref.phone}</p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        )}

      </div>
    </div>
  );
}
