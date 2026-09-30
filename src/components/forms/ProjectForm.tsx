import { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { FolderGit2, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function ProjectForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addArrayItem("projects", {
      id: newId,
      title: "",
      company: "",
      website: "",
      duration: "",
      description: ""
    });
    setExpandedId(newId);
  };

  const handleChange = (index: number, field: string, value: string) => {
    updateArrayItem("projects", index, { [field]: value });
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.projects?.map((proj, index) => (
          <div key={proj.id} className="border rounded-md bg-white overflow-hidden">
            <div
              className="flex items-center justify-between px-2 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{proj.title || "(Not specified)"}</span>
                  {(proj.company || proj.duration) && (
                    <span className="text-xs text-gray-500">
                      {[proj.company, proj.duration].filter(Boolean).join(" | ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === proj.id ? null : proj.id); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeArrayItem("projects", proj.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === proj.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>

            {expandedId === proj.id && (
              <div className="p-3 border-t space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Project Title</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={proj.title || ""} onChange={(e) => handleChange(index, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Organization / Client</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={proj.company || ""} onChange={(e) => handleChange(index, "company", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Project Link / Website</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={proj.website || ""} onChange={(e) => handleChange(index, "website", e.target.value)} placeholder="https://" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={proj.duration || ""} onChange={(e) => handleChange(index, "duration", e.target.value)} placeholder="e.g. Jan 2023 - Mar 2023" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Project Description & Outcomes</label>
                  <ReactQuill
                    theme="snow"
                    value={proj.description || ""}
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
