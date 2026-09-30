import { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { Award, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function CertificationsForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addArrayItem("certifications", {
      id: newId,
      title: "",
      provider: "",
      year: "",
      url: ""
    });
    setExpandedId(newId);
  };

  const handleChange = (index: number, field: string, value: string) => {
    updateArrayItem("certifications", index, { [field]: value });
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.certifications?.map((cert, index) => (
          <div key={cert.id} className="border rounded-md bg-white overflow-hidden">
            <div
              className="flex items-center justify-between px-2 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{cert.title || "(Not specified)"}</span>
                  {(cert.provider || cert.year) && (
                    <span className="text-xs text-gray-500">
                      {[cert.provider, cert.year].filter(Boolean).join(" | ")}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === cert.id ? null : cert.id); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit certification"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeArrayItem("certifications", cert.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete certification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === cert.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>

            {expandedId === cert.id && (
              <div className="p-3 border-t space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Certification Title</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={cert.title || ""} onChange={(e) => handleChange(index, "title", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Provider</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={cert.provider || ""} onChange={(e) => handleChange(index, "provider", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={cert.year || ""} onChange={(e) => handleChange(index, "year", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">URL (Optional)</label>
                    <input className="w-full border rounded-md p-2 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={cert.url || ""} onChange={(e) => handleChange(index, "url", e.target.value)} />
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
