import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <SelectItem value="json">Json (.json file)</SelectItem>
                  <SelectItem value="txt">Text (.txt file)</SelectItem>
                  <SelectItem value="csv">Csv (.csv file)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
