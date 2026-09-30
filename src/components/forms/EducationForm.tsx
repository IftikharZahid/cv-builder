import { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { GraduationCap, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function EducationForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addArrayItem("education", {
      id: newId,
      institute: "",
      degree: "",
      location: "",
      year: "",
      result: ""
    });
    setExpandedId(newId);
  };

  const handleChange = (index: number, field: string, value: string) => {
    updateArrayItem("education", index, { [field]: value });
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.education?.map((edu, index) => (
          <div key={edu.id} className="border rounded-md bg-white overflow-hidden">
            <div
              className="flex items-center justify-between px-2 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{edu.degree || "(Not specified)"}</span>
                  <span className="text-xs text-gray-500">{edu.institute || "Institute"} | {edu.year || "Year"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === edu.id ? null : edu.id); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit education"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeArrayItem("education", edu.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === edu.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>

            {expandedId === edu.id && (
              <div className="p-3 border-t space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Degree / Qualification</label>
                    <input
                      list={`degree-list-${edu.id}`}
                      className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none"
                      value={edu.degree || ""}
                      onChange={(e) => handleChange(index, "degree", e.target.value)}
                      placeholder="e.g. B.Sc Computer Science"
                    />
                    <datalist id={`degree-list-${edu.id}`}>
                      <option value="High School / Matriculation" />
                      <option value="Intermediate / A-Levels" />
                      <option value="Associate Degree" />
                      <option value="Bachelor of Arts (B.A)" />
                      <option value="Bachelor of Science (B.Sc)" />
                      <option value="Master of Arts (M.A)" />
                      <option value="Master of Science (M.Sc)" />
                      <option value="Master of Business Administration (MBA)" />
                      <option value="Doctor of Philosophy (Ph.D.)" />
                      <option value="Diploma" />
                      <option value="Certification" />
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Institute Name</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={edu.institute || ""} onChange={(e) => handleChange(index, "institute", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={edu.location || ""} onChange={(e) => handleChange(index, "location", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Graduation Year</label>
                      <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" placeholder="e.g. 2024" value={edu.year || ""} onChange={(e) => handleChange(index, "year", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Result / GPA</label>
                      <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" placeholder="e.g. 3.8 GPA" value={edu.result || ""} onChange={(e) => handleChange(index, "result", e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border-t pt-4 mt-4">
                  <button
                    onClick={() => setExpandedId(null)}
                    className="px-4 py-2 bg-cv-red text-white text-sm font-medium rounded-md hover:bg-red-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
