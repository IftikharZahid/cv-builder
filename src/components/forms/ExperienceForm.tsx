import { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { Clock, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function ExperienceForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addArrayItem("experiences", {
      id: newId,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
    setExpandedId(newId);
  };

  const handleChange = (index: number, field: string, value: string) => {
    updateArrayItem("experiences", index, { [field]: value });
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.experiences.map((exp, index) => (
          <div key={exp.id} className="border rounded-md bg-white overflow-hidden">
            <div
              className="flex items-center justify-between px-2 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{exp.position || "(Not specified)"}</span>
                  <span className="text-xs text-gray-500">{exp.company || "Company"} | {exp.startDate || "Start"} - {exp.endDate || "End"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === exp.id ? null : exp.id); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit experience"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeArrayItem("experiences", exp.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === exp.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>

            {expandedId === exp.id && (
              <div className="p-3 border-t space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={exp.position} onChange={(e) => handleChange(index, "position", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={exp.company} onChange={(e) => handleChange(index, "company", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={exp.location} onChange={(e) => handleChange(index, "location", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                      <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" placeholder="e.g. Oct 2022" value={exp.startDate} onChange={(e) => handleChange(index, "startDate", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                      <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" placeholder="e.g. Present" value={exp.endDate} onChange={(e) => handleChange(index, "endDate", e.target.value)} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description (Bullets)</label>
                  <ReactQuill
                    theme="snow"
                    value={exp.description}
                    onChange={(val) => handleChange(index, "description", val)}
                    className="bg-white rounded-md mb-4"
                  />
                </div>
                <div className="flex justify-end border-t pt-4">
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
