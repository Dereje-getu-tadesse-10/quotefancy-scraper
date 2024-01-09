import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, FormSchema } from "@/schemas/form-schema";
import { usePostScraperInfo } from "@/hooks/usePostScraperInfo";
import { useDownloadStore } from "@/stores/useDownloadStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export const ScraperForm = () => {
  const [showTextArea, setShowTextArea] = useState(false);
  const { addDownloadUrl } = useDownloadStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_type: "json",
    },
  });

  const { mutate, isLoading } = usePostScraperInfo(addDownloadUrl);

  const onSubmit: SubmitHandler<FormSchema> = (values) => {
    mutate(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scraper Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {showTextArea ? (
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center flex-wrap gap-4">
                      Quotefancy url
                      <div className="flex items-center gap-2">
                        <p>Multiple URL Scraping</p>
                        <Switch
                          onClick={() => setShowTextArea(!showTextArea)}
                        />
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`https://quotefancy.com/taylor-swift-quotes,
https://quotefancy.com/taylor-swift-quotes/page/2,
https://quotefancy.com/taylor-swift-quotes/page/3
`}
                        {...field}
                        className="resize-none text-base"
                      />
                    </FormControl>
                    <FormDescription>
                      You can pass a list of url separed by{" "}
                      <strong>comma</strong>.{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex justify-between items-center flex-wrap gap-4">
                      Quotefancy url
                      <div className="flex items-center gap-2">
                        <p>Multiple URL Scraping</p>
                        <Switch
                          onClick={() => setShowTextArea(!showTextArea)}
                        />
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://quotefancy.com/taylor-swift-quotes"
                        {...field}
                        type="url"
                        className="text-base"
                      />
                    </FormControl>
                    <FormDescription>Quotefancy url </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="file_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="taylor-swift-quotes"
                      className="text-base"
                      {...field}
                    />
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
                      <SelectItem value="txt">
                        TEXT (image quote not available)
                      </SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <FormDescription>
                    This is the output extension of the file by default, is{" "}
                    <strong>json</strong>.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Scraping..." : "Scrape"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
