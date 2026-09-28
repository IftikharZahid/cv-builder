import React from "react";
import { Edit2 } from "lucide-react";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: Props) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('openCVModal', { detail: id }));
  };

  return (
    <div className={`group relative ring-1 ring-transparent hover:ring-gray-300/50 hover:bg-black/[0.02] transition-all rounded-md print:ring-transparent ${className}`}>
      <button 
        onClick={handleEdit}
        className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 bg-cv-red text-white p-1.5 rounded-md shadow-sm transition-opacity print:hidden hover:bg-red-800"
        title="Edit Section"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
}
