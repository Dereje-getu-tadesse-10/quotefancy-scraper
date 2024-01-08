import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DownloadStore = {
  downloadUrls: string[];
  addDownloadUrl: (url: string) => void;
  removeDownloadUrl: (url: string) => void;
};

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set) => ({
      downloadUrls: [],
      addDownloadUrl: (url: string) =>
        set((state: DownloadStore) => ({
          downloadUrls: [...state.downloadUrls, url],
        })),
      removeDownloadUrl: (url: string) =>
        set((state: DownloadStore) => ({
          downloadUrls: state.downloadUrls.filter((item) => item !== url),
        })),
    }),
    {
      name: "download-urls-storage",
      getStorage: () => localStorage,
    }
  )
);
