import React, { useState } from "react";
import { useCVStore } from "../../store/cvStore";
import { Cog, Plus, Trash2, GripVertical, Edit2, Check, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableSkillItemProps {
  skill: { id: string; name: string };
  index: number;
  editingId: string | null;
  editValue: string;
  setEditValue: (val: string) => void;
  startEdit: (id: string, name: string) => void;
  cancelEdit: () => void;
  saveEdit: (index: number) => void;
  handleKeyDownEdit: (e: React.KeyboardEvent, index: number) => void;
  removeArrayItem: (field: any, id: string) => void;
}

function SortableSkillItem({
  skill,
  index,
  editingId,
  editValue,
  setEditValue,
  startEdit,
  cancelEdit,
  saveEdit,
  handleKeyDownEdit,
  removeArrayItem
}: SortableSkillItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" as const : "static" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-1.5 border rounded-md transition-colors group text-sm ${isDragging ? "bg-white shadow-md border-cv-red z-10" : "bg-gray-50 hover:bg-white"}`}
    >
      <div className="flex items-center gap-3 flex-1">
        <div {...attributes} {...listeners} className="cursor-grab hover:text-gray-600 active:cursor-grabbing p-1 -m-1">
          <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
        </div>

        {editingId === skill.id ? (
          <div className="flex items-center gap-2 flex-1 mr-2">
            <input
              autoFocus
              className="flex-1 border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => handleKeyDownEdit(e, index)}
            />
            <button onClick={() => saveEdit(index)} className="p-1 text-green-600 hover:bg-green-50 rounded-md">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={cancelEdit} className="p-1 text-gray-500 hover:bg-gray-100 rounded-md">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <span
            className="text-sm text-gray-700 flex-1 cursor-pointer"
            onClick={() => startEdit(skill.id, skill.name)}
            title="Click to edit"
          >
            {skill.name}
          </span>
        )}
      </div>

      {editingId !== skill.id && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => startEdit(skill.id, skill.name)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit skill"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeArrayItem("skills", skill.id)}
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete skill"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function SkillsForm() {
  const { data, addArrayItem, removeArrayItem, updateArrayItem, reorderArrayItems } = useCVStore();
  const [newSkill, setNewSkill] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = () => {
    if (newSkill.trim()) {
      addArrayItem("skills", { id: uuidv4(), name: newSkill.trim() });
      setNewSkill("");
    }
  };

  const handleKeyDownAdd = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditValue(name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const saveEdit = (index: number) => {
    if (editValue.trim()) {
      updateArrayItem("skills", index, { name: editValue.trim() });
      setEditingId(null);
      setEditValue("");
    }
  };

  const handleKeyDownEdit = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit(index);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = data.skills.findIndex((item) => item.id === active.id);
      const newIndex = data.skills.findIndex((item) => item.id === over.id);
      reorderArrayItems("skills", oldIndex, newIndex);
    }
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 border-b pb-4 mb-4">
        <Cog className="w-5 h-5 text-gray-500" />
        <h2 className="text-xl font-semibold text-gray-800">Skills & Strengths</h2>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none"
            placeholder="Add a new skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDownAdd}
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <div className="space-y-2 mt-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={data.skills.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {data.skills.map((skill, index) => (
                <SortableSkillItem
                  key={skill.id}
                  skill={skill}
                  index={index}
                  editingId={editingId}
                  editValue={editValue}
                  setEditValue={setEditValue}
                  startEdit={startEdit}
                  cancelEdit={cancelEdit}
                  saveEdit={saveEdit}
                  handleKeyDownEdit={handleKeyDownEdit}
                  removeArrayItem={removeArrayItem}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
