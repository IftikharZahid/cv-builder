import { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { Languages, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function LanguagesForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newId = uuidv4();
    addArrayItem("languages", {
      id: newId,
      name: "",
      proficiency: ""
    });
    setExpandedId(newId);
  };

  const handleChange = (index: number, field: string, value: string) => {
    updateArrayItem("languages", index, { [field]: value });
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-gray-500" />
          <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
        </div>
        <button
          onClick={handleAdd}
          className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {data.languages?.map((lang, index) => (
          <div key={lang.id} className="border rounded-md bg-white overflow-hidden">
            <div
              className="flex items-center justify-between px-2 py-1.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setExpandedId(expandedId === lang.id ? null : lang.id)}
            >
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">{lang.name || "(Not specified)"}</span>
                  <span className="text-xs text-gray-500">{lang.proficiency || "Proficiency"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === lang.id ? null : lang.id); }}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit language"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeArrayItem("languages", lang.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete language"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === lang.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </div>

            {expandedId === lang.id && (
              <div className="p-3 border-t space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Language</label>
                    <input className="w-full border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={lang.name || ""} onChange={(e) => handleChange(index, "name", e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Proficiency</label>
                    <select
                      className="w-full border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none bg-white"
                      value={lang.proficiency || ""}
                      onChange={(e) => handleChange(index, "proficiency", e.target.value)}
                    >
                      <option value="">Select proficiency</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Proficient">Proficient</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Basic">Basic</option>
                    </select>
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
