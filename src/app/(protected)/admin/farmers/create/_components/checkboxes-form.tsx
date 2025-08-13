"use client";

import { type Control, useController } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle } from "lucide-react";

interface FarmDataType {
  id: number;
  name: string;
  icon?: React.ReactNode;
}

interface CheckBoxesFormProps {
  control: Control<any>;
  name: string;
  data?: FarmDataType[];
  title: string;
  isLoading: boolean;
}

export function CheckBoxesForm({
  control,
  name,
  data,
  title,
  isLoading,
}: CheckBoxesFormProps) {
  const { field } = useController({
    control,
    name,
  });
  console.log(control._formState.errors);

  const handleToggle = (riskId: number) => {
    const currentValue = field.value || [];
    if (currentValue.includes(riskId)) {
      field.onChange(currentValue.filter((id: number) => id !== riskId));
    } else {
      field.onChange([...currentValue, riskId]);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <div className="flex flex-col flex-wrap gap-3 rounded-xl border p-5">
            {isLoading ? (
              <div className=" w-full flex items-center  justify-center"><LoaderCircle className=" animate-spin"/></div>
            ) : (
              data?.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      className="bg-background"
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={() => handleToggle(item.id)}
                    />
                  </FormControl>
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </div>
              ))
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
