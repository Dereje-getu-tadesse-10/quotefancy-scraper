import { FileDown, Trash2, File } from "lucide-react";
import { UseMutateFunction, useMutation } from "react-query";
import { z } from "zod";

import { truncateString } from "@/lib/truncate";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useDownloadStore } from "@/stores/useDownloadStore";

const urlSchema = z.object({
  file: z.string().min(1),
});

export const DownloadUrls = () => {
  const { downloadUrls, removeDownloadUrl } = useDownloadStore();

  const deleteQuery = async (data: z.infer<typeof urlSchema>) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/delete/${data.file}`,
      {
        method: "delete",
      }
    );
    return res;
  };

  const { mutate, isLoading } = useMutation(deleteQuery, {
    onSuccess: async (data, variables) => {
      const res = await data.json();
      if (res.status === true) {
        removeDownloadUrl(variables.file);
      }
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My files</CardTitle>
        <CardDescription>All your files are here</CardDescription>
      </CardHeader>
      <CardContent className="h-[410px] overflow-x-scroll">
        {downloadUrls.length === 0 ? (
          <EmptyCard />
        ) : (
          <ItemWrapper
            downloadUrls={downloadUrls}
            mutate={mutate}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};

const ItemWrapper = ({
  downloadUrls,
  mutate,
  isLoading,
}: {
  downloadUrls: string[];
  mutate: UseMutateFunction<
    Response,
    unknown,
    {
      file: string;
    },
    unknown
  >;
  isLoading: boolean;
}) => (
  <ul className="space-y-2">
    {downloadUrls.map((file: string) => (
      <Item
        isLoading={isLoading}
        file={file}
        onClick={() => {
          mutate({ file });
        }}
      />
    ))}
  </ul>
);

const Item = ({
  file,
  onClick,
  isLoading,
}: {
  file: string;
  onClick: () => void;
  isLoading: boolean;
}) => (
  <li className="flex items-center justify-between gap-4 flex-wrap rounded-lg border p-3 md:flex-row">
    <p className="flex items-center gap-1 text-card-foreground">
      <File className="text-card-foreground" size={20} />
      {truncateString(file, 20)}
    </p>
    <div className="flex">
      <Tooltip>
        <TooltipTrigger>
          <a
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            href={`${import.meta.env.VITE_BACKEND_API}/download/${file}`}
            download
          >
            {isLoading ? (
              <p>...</p>
            ) : (
              <FileDown className="text-card-foreground" size={16} />
            )}
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download file</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button variant={"ghost"} size={"sm"} onClick={onClick}>
            <Trash2 className="text-destructive" size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete file</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </li>
);

const EmptyCard = () => (
  <p className="text-center text-card-foreground font-medium">
    No downloadable files available. 📂✨
  </p>
);
