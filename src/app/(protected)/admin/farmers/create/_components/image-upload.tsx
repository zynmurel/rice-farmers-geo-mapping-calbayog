"use client";
import React, { useRef, useState } from "react";
import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadFieldProps {
  control: Control<any>;
  name: string;
  label?: string;
}

export function ImageUploadField({
  control,
  name,
  label = "Upload Images",
}: ImageUploadFieldProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.click();
  }
  function handleFilesChange(files: File[] | null) {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              <div>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const filesArray = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    const data = field.value
                      ? [...field.value, ...filesArray]
                      : filesArray;
                    handleFilesChange(data);
                    field.onChange(data);
                  }}
                />
                <Button type="button" onClick={handleClick} variant={"outline"}>
                  {field.value.length
                    ? `Upload Image : ${field.value.length} image/s`
                    : "Upload Images"}
                </Button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative">
                    <Button
                      type="button"
                      className="absolute top-0 right-0 h-5 w-5"
                      variant={"outline"}
                      onClick={() => {
                        // Remove the file at index idx from field.value
                        if (!field.value) return;
                        const newFiles = [...field.value];
                        newFiles.splice(idx, 1);
                        handleFilesChange(newFiles); // update preview accordingly
                        field.onChange(newFiles); // update form state
                      }}
                    >
                      <X />
                    </Button>
                    <Image
                      key={idx}
                      src={src}
                      height={200}
                      width={200}
                      alt={`Preview ${idx + 1}`}
                      className="h-24 w-24 rounded border object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
