"use client";
import { useLocaleStore } from "../../store/localeStore";
import * as React from "react";
import { Check, Earth } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageToogle() {
  const { locale, setLocale } = useLocaleStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-foreground size-8 rounded-full"
        >
          <Earth className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Earth className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => setLocale("en")}>
          <div className="flex flex-row items-center gap-1">
            {locale === 'en' ? <Check className=" size-4" /> : <div className=" size-4"/>}
            English
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("tl")}>
          <div className="flex flex-row items-center gap-1">
            {locale === 'tl' ? <Check className=" size-4" /> : <div className=" size-4"/>}
            Tagalog
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("wr")}>
          <div className="flex flex-row items-center gap-1">
            {locale === 'wr' ? <Check className=" size-4" /> : <div className=" size-4"/>}
            Waray
          </div>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
