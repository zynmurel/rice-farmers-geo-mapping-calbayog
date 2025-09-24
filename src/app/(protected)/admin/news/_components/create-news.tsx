"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { parseAsBoolean, useQueryState } from "nuqs";
import { handleUploadSupabase } from "@/lib/upload";
import { api } from "@/trpc/react";
import { toast } from "sonner";

// --- Zod schema
const newsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.instanceof(File)).optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export default function CreateNewsModal() {
  const [previews, setPreviews] = React.useState<string[]>([]);
  const useUtils = api.useUtils();
  const [isUploading, setIsUploading] = React.useState(false);

  const [open, setOpen] = useQueryState(
    "create-news",
    parseAsBoolean.withDefault(false),
  );

  const { mutate, isPending } = api.news.create.useMutation({
    onSuccess: async () => {
      await Promise.all([
        useUtils.news.getAll.invalidate(),
        useUtils.news.getAllCount.invalidate(),
      ]);
      toast.success("News created");
      setOpen(false);
    },
    onError: () => {
      toast.error("Failed to create news");
    },
  });

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });

  // Handle file preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    form.setValue("images", files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (values: NewsFormValues) => {
    try {
      setIsUploading(true);
      // 1. Upload images -> get URLs (replace with your API call, e.g. Supabase / S3 upload)
      let uploadedUrls: string[] = [];
      if (values.images) {
        uploadedUrls = await Promise.all(
          values.images.map(async (img: File) => {
            return await handleUploadSupabase(img);
          }),
        );
      }
      setIsUploading(false);
      const { images, ...rest } = values;
      mutate({
        ...rest,
        images: uploadedUrls,
      });
    } catch (err) {
      console.error("Error submitting news:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create News</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="News title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write news content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormItem>
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </FormControl>
              <div className="mt-2 flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="h-20 w-20 rounded-md border object-cover"
                  />
                ))}
              </div>
            </FormItem>

            <div className="flex justify-end">
              <Button type="submit" disabled={isUploading || isPending}>
                {isUploading
                  ? "Uploading..."
                  : isPending
                    ? "Creating..."
                    : "Create News"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
