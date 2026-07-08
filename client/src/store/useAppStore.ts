import { create } from 'zustand';

type AppStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
