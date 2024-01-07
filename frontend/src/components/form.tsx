import * as z from "zod";
import { useMutation } from "react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const formSchema = z.object({
  file_name: z.string().max(30).optional(),
  file_type: z.enum(["json", "txt", "csv"]),
  path: z
    .string()
    .refine(
      (input) => {
        try {
          new URL(input);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid URL",
      }
    )
    .transform((input) => {
      const url = new URL(input);
      return url.pathname;
    }),
});

export const ScraperForm = () => {
  const [downloadLink, setDownloadLink] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_type: "json",
    },
  });

  const postScraperInfo = async (body: z.infer<typeof formSchema>) => {
    const res = await fetch(import.meta.env.VITE_BACKEND_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return res;
  };

  const mutation = useMutation(postScraperInfo, {
    onSuccess: async (data) => {
      const res = await data.json();
      const downloadLink = `${import.meta.env.VITE_BACKEND_API}/download/${
        res.file
      }`;
      setDownloadLink(downloadLink);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({
      file_type: values.file_type,
      file_name: values.file_name,
      path: values.path,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-[500px] mx-auto"
      >
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://quotefancy.com/taylor-swift-quotes"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is the output file name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>
              <FormControl>
                <Input placeholder="quotes" {...field} />
              </FormControl>
              <FormDescription>This is the output file name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the output of the file type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="txt">TEXT</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button type="submit">Scrape</Button>
          {downloadLink && (
            <a
              href={downloadLink}
              className={buttonVariants({ variant: "secondary" })}
              download
            >
              Download File
            </a>
          )}
        </div>
      </form>
    </Form>
  );
};
