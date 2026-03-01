import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  name: string;
  state: string;
  district: string;
  age: number;
  gender: string;
  income: number;
  bpl: boolean;
  bankAccount: boolean;
  occupation: string;
  categories: string[];
  onboarded: boolean;
}

export interface SchemeStatus {
  schemeId: string;
  status: "applied" | "under_review" | "approved";
  appliedDate: string;
}

export interface Reminder {
  schemeId: string;
  daysBefore: number;
  setDate: string;
}

interface UserStore {
  profile: UserProfile;
  language: string;
  savedSchemes: string[];
  appliedSchemes: SchemeStatus[];
  reminders: Reminder[];
  highContrast: boolean;
  extraLargeText: boolean;
  setProfile: (profile: Partial<UserProfile>) => void;
  setLanguage: (lang: string) => void;
  resetProfile: () => void;
  toggleSaveScheme: (id: string) => void;
  setSchemeStatus: (status: SchemeStatus) => void;
  addReminder: (r: Reminder) => void;
  removeReminder: (schemeId: string) => void;
  setHighContrast: (v: boolean) => void;
  setExtraLargeText: (v: boolean) => void;
}

const defaultProfile: UserProfile = {
  name: "",
  state: "",
  district: "",
  age: 0,
  gender: "",
  income: 0,
  bpl: false,
  bankAccount: false,
  occupation: "",
  categories: [],
  onboarded: false,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      language: "en",
      savedSchemes: [],
      appliedSchemes: [],
      reminders: [],
      highContrast: false,
      extraLargeText: false,
      setProfile: (partial) =>
        set((state) => ({ profile: { ...state.profile, ...partial } })),
      setLanguage: (lang) => set({ language: lang }),
      resetProfile: () => set({ profile: defaultProfile }),
      toggleSaveScheme: (id) =>
        set((state) => ({
          savedSchemes: state.savedSchemes.includes(id)
            ? state.savedSchemes.filter((s) => s !== id)
            : [...state.savedSchemes, id],
        })),
      setSchemeStatus: (status) =>
        set((state) => ({
          appliedSchemes: [
            ...state.appliedSchemes.filter((s) => s.schemeId !== status.schemeId),
            status,
          ],
        })),
      addReminder: (r) =>
        set((state) => ({
          reminders: [...state.reminders.filter((x) => x.schemeId !== r.schemeId), r],
        })),
      removeReminder: (schemeId) =>
        set((state) => ({
          reminders: state.reminders.filter((r) => r.schemeId !== schemeId),
        })),
      setHighContrast: (v) => set({ highContrast: v }),
      setExtraLargeText: (v) => set({ extraLargeText: v }),
    }),
    { name: "bridgeos-user" }
  )
);
