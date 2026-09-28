import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CVData } from "../types/cv";

interface CVStore {
  data: CVData;
  updateField: <K extends keyof CVData>(field: K, value: CVData[K]) => void;
  updateArrayItem: <K extends keyof CVData>(field: K, index: number, value: any) => void;
  addArrayItem: <K extends keyof CVData>(field: K, item: any) => void;
  removeArrayItem: <K extends keyof CVData>(field: K, id: string) => void;
  reorderArrayItems: <K extends keyof CVData>(field: K, startIndex: number, endIndex: number) => void;
}

const defaultData: CVData = {
  theme: "modern",
  profileImage: "",
  fullName: "",
  designation: "",
  summary: "",
  phone: "",
  email: "",
  address: "",
  website: "",
  linkedin: "",
  github: "",
  skills: [],
  experiences: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  hobbies: [],
  awards: [],
  references: [],
  activeTabs: ["profile", "skills", "experience", "education", "projects"],
  sidebarWidth: 250
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: defaultData,
      updateField: (field, value) =>
        set((state) => ({
          data: { ...state.data, [field]: value },
        })),
      updateArrayItem: (field, index, value) =>
        set((state) => {
          const arr = [...(state.data[field] as any[])];
          arr[index] = { ...arr[index], ...value };
          return { data: { ...state.data, [field]: arr } };
        }),
      addArrayItem: (field, item) =>
        set((state) => ({
          data: { ...state.data, [field]: [...(state.data[field] as any[]), item] },
        })),
      removeArrayItem: (field, id) =>
        set((state) => ({
          data: {
            ...state.data,
            [field]: (state.data[field] as any[]).filter((item: any) => item.id !== id),
          },
        })),
      reorderArrayItems: (field, startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.data[field] as any[]);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { data: { ...state.data, [field]: result } };
        }),
    }),
    {
      name: "cv-builder-storage",
    }
  )
);