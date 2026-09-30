import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CVData } from "../types/cv";
import { dummyCVData, emptyCVData } from "../utils/dummyData";

interface CVStore {
  data: CVData;
  updateField: <K extends keyof CVData>(field: K, value: CVData[K]) => void;
  updateArrayItem: <K extends keyof CVData>(field: K, index: number, value: any) => void;
  addArrayItem: <K extends keyof CVData>(field: K, item: any) => void;
  removeArrayItem: <K extends keyof CVData>(field: K, id: string) => void;
  reorderArrayItems: <K extends keyof CVData>(field: K, startIndex: number, endIndex: number) => void;
  loadSampleData: () => void;
  clearAllData: () => void;
  setFullData: (newData: CVData) => void;
}

const defaultData: CVData = emptyCVData;

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
      loadSampleData: () =>
        set((state) => ({
          data: {
            ...dummyCVData,
            theme: state.data.theme || "modern", // Preserve user's chosen theme if selected
            sidebarWidth: state.data.sidebarWidth || 350
          }
        })),
      clearAllData: () =>
        set((state) => ({
          data: {
            ...emptyCVData,
            theme: state.data.theme || "modern",
            sidebarWidth: state.data.sidebarWidth || 350
          }
        })),
      setFullData: (newData) =>
        set(() => ({
          data: newData
        })),
    }),
    {
      name: "cv-builder-storage",
    }
  )
);