import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDownloadStore = create(
  persist(
    (set) => ({
      downloadUrls: [],
      addDownloadUrl: () =>
        set((state) => ({
          downloadUrls: [...state.downloadUrls, url],
        })),
    }),
    {
      name: "download-urls-storage",
      getStorage: () => localStorage,
    }
  )
);
