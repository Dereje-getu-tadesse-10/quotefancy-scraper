import { FormSchema } from "@/schemas/form-schema";
import { DownloadStore } from "@/stores/useDownloadStore";
import { useMutation } from "react-query";

export const usePostScraperInfo = (
  addDownloadUrl: DownloadStore["addDownloadUrl"]
) => {
  return useMutation(async (formData: FormSchema) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    addDownloadUrl(data.file);
  });
};
