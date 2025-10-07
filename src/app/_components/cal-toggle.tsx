"use client";

import * as React from "react";
import { Calculator, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RiceComputationCard from "../(protected)/admin/_components/rice-computation";

export function CalculatorToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="size-8 rounded-full bg-green-600">
          <Calculator className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="max-h-[80vh] w-[380px] overflow-y-auto rounded-xl p-0 shadow-xl"
      >
        <div className="flex items-center justify-between rounded-t-xl border-b bg-green-600 p-3 text-white">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Calculator className="h-4 w-4" /> Calbayog Rice Sufficiency
            Calculator
          </h3>
        </div>

        <div className="bg-gradient-to-b from-green-50 to-white p-3">
          <RiceComputationCard />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
