import { create } from 'zustand';
import type { Chapter } from '../types/chapter-contents';

interface DashboardStore {
  selectedBoard: string | null;
  selectedClass: string | null;
  selectedLanguage: string | null;
  subjectId: number | null;
  chapters: Chapter[];
  resourceId: string | null;
  setBoard: (board: string | null) => void;
  setClass: (classId: string | null) => void;
  setSelectedLanguage: (selectedLanguage: string | null) => void;
  setSubject: (subjectId: number | null) => void;
  setChapters: (chapters: Chapter[]) => void;
  setResourceId: (resourceId: string | null) => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedBoard: null,
  selectedClass: null,
  selectedLanguage:null,
  subjectId: null,
  chapters: [],
  resourceId: null,
  setBoard: (board) => set({ selectedBoard: board }),
  setClass: (classId) => set({ selectedClass: classId }),
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
  setSubject: (subjectId) => set({ subjectId }),
  setChapters: (chapters) => set({ chapters }),
  setResourceId: (resourceId) => set({ resourceId }),
  resetFilters: () =>
    set({
      selectedBoard: null,
      selectedClass: null,
      selectedLanguage: null,
      subjectId: null,
      chapters: [],
      resourceId: null
    }),
}));
