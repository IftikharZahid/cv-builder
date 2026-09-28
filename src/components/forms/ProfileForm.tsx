import React from "react";
import { useCVStore } from "../../store/cvStore";
import { User, Image as ImageIcon, MapPin, Phone, Mail, Globe, Link, Code, X } from "lucide-react";

export default function ProfileForm() {
  const { data, updateField } = useCVStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateField("profileImage", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm mb-6">
      <div className="flex items-center gap-2 border-b pb-4 mb-4">
        <User className="w-5 h-5 text-gray-500" />
        <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
      </div>

      <div className="space-y-3">
        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
          <div className="flex items-center gap-3">
            {data.profileImage ? (
              <div className="relative group shrink-0">
                <img src={data.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border" />
                <button 
                  onClick={() => updateField("profileImage", "")} 
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 border flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input className="w-full border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input className="w-full border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={data.designation} onChange={(e) => updateField("designation", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea rows={4} className="w-full border rounded-md p-1.5 text-sm focus:ring-1 focus:ring-cv-red outline-none" value={data.summary} onChange={(e) => updateField("summary", e.target.value)} />
        </div>

        <div className="pt-4 border-t mt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Contact Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Address</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.address} onChange={(e) => updateField("address", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Phone</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> Email</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><Globe className="w-3 h-3"/> Website</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.website} onChange={(e) => updateField("website", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><Link className="w-3 h-3"/> LinkedIn</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1 flex items-center gap-1"><Code className="w-3 h-3"/> GitHub</label>
              <input className="w-full border rounded-md p-1.5 text-sm outline-none" value={data.github} onChange={(e) => updateField("github", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}