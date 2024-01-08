import * as z from "zod";
import { useMutation } from "react-query";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDownloadStore } from "@/stores/useQuoteList";

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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  file_name: z.string().max(30).optional(),
  file_type: z.enum(["json", "txt", "csv"]),
  path: z
    .string()
    .transform((input) =>
      input
        .split(/,\s*/)
        .map((urlString) => {
          try {
            const url = new URL(urlString.trim());
            return url.pathname;
          } catch {
            return "";
          }
        })
        .filter((path) => path !== "")
    )
    .refine((paths) => paths.length > 0, {
      message: "Please provide at least one valid URL",
    }),
});

export const ScraperForm = () => {
  const { addDownloadUrl } = useDownloadStore();
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
      addDownloadUrl(res.file);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      file_type: values.file_type,
      file_name: values.file_name,
      path: values.path,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scraper form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quotefancy url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://quotefancy.com/taylor-swift-quotes, https://quotefancy.com/taylor-swift-quotes/page/2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can pass a list of url separed by comma.{" "}
                  </FormDescription>
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
                  <FormDescription>
                    This is the output file name by default, is{" "}
                    <strong>quotes</strong>.
                  </FormDescription>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormDescription>
                    This is the output extension of the file by default:{" "}
                    <strong>json</strong>.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit">Scrape</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
