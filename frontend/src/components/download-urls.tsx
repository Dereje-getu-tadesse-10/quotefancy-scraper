import { FileDown, Trash2 } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { truncateString } from "@/lib/truncate";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDownloadStore } from "@/stores/useQuoteList";
import { z } from "zod";

const formSchema = z.object({
  file: z.string().min(1),
});

export const DownloadUrls = () => {
  const deleteQuery = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/delete/${data.file}`,
      {
        method: "delete",
      }
    );
    return res;
  };
  const mutation = useMutation(deleteQuery, {
    onSuccess: async (data) => {
      const res = await data.json();
      console.log(res);
    },
  });

  const { downloadUrls } = useDownloadStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>File</CardTitle>
        <CardDescription>all files</CardDescription>
      </CardHeader>
      <CardContent className="h-[384px] overflow-x-scroll">
        <ul className="space-y-4">
          {downloadUrls.map((file: string) => (
            <Item
              file={file}
              onClick={() => {
                mutation.mutate({ file });
              }}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Item = ({ file, onClick }: { file: string; onClick: any }) => (
  <li className="flex items-center justify-between gap-4 md:flex-row">
    <p className="text-slate-700">{truncateString(file, 25)}</p>
    <div className="flex gap-2">
      <a
        className={buttonVariants({ variant: "outline" })}
        href={file}
        download
      >
        <FileDown className="text-slate-700" size={20} />
      </a>
      <Button variant={"destructive"} onClick={onClick}>
        <Trash2 size={20} />
      </Button>
    </div>
  </li>
);
