import { z } from "zod";

const transformPath = (input: string) => {
  return input
    .split(/,\s*/)
    .map((urlString: string) => {
      try {
        const url = new URL(urlString.trim());
        return url.pathname;
      } catch {
        return "";
      }
    })
    .filter((path) => path !== "");
};

export const formSchema = z.object({
  file_name: z.string().max(30),
  file_type: z.enum(["json", "txt", "csv"]),
  path: z
    .string()
    .transform(transformPath)
    .refine((paths) => paths.length > 0, {
      message: "Please provide at least one valid URL",
    }),
});

export type FormSchema = z.infer<typeof formSchema>;
