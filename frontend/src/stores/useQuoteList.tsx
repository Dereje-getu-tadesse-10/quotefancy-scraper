import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDownloadStore = create(
  persist(
    (set) => ({
      downloadUrls: [],
      addDownloadUrl: (url) =>
        set((state: any) => ({
          downloadUrls: [...state.downloadUrls, url],
        })),
      removeDownloadUrl: (url) =>
        set((state) => ({
          downloadUrls: state.downloadUrls.filter((item) => item !== url),
        })),
    }),
    {
      name: "download-urls-storage",
      getStorage: () => localStorage,
    }
  )
);
