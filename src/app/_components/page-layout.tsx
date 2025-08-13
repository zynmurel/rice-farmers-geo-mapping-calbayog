import * as LucideIcons from "lucide-react";
import React, { type JSX } from "react";
type LucideIconName = keyof typeof LucideIcons;

function PageLayout({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description?: string;
  icon: LucideIconName;
  children: JSX.Element;
}) {
  const IconComponent = LucideIcons[icon] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return (
    <div>
      <div className="flex flex-row items-center gap-3 mt-2">
        <div className=" border-foreground flex items-center justify-center overflow-hidden rounded-xl border-3 p-1 brightness-125">
          <IconComponent className="size-5" strokeWidth={3}/>
        </div>
        <div className="">
          <p className="text-xl font-bold uppercase brightness-75 dark:brightness-100 dark:text-foreground">{title}</p>
          {description && (
            <p className="-mt-1 dark:text-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className=" my-5">{children}</div>
    </div>
  );
}

export default PageLayout;
