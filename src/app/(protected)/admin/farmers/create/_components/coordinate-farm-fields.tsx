"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type Control } from "react-hook-form";

interface CoordinatesFieldArrayProps {
  control: Control<any>;
  name: string;
}

export function CoordinatesFieldArray({
  control,
  name,
}: CoordinatesFieldArrayProps) {

  return (
    <div className="space-y-2">
      <div className="space-y-2 overflow-y-auto">
        <FormField
          control={control}
          name={name} // this should be the array or text field in your schema
          render={({ field }) => {
            console.log(field.value)
            return (
            <FormItem className="w-full">
              <FormLabel className=" opacity-50">Format : ( lattitude, longtitude lattitude, longtitude... )</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Enter coordinates here, e.g.: 124.5484678, 12.1022562, 124.5489245, 12.1023293 ...`}
                  className="min-h-[120px] font-mono"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
          }}
        />
      </div>
    </div>
  );
}
