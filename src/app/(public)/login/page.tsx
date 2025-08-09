import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components.tsx/login-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/app/_components/mode-toggle";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  if (!!session?.user.type) {
    redirect("/"+session?.user.type.toLowerCase());
  }

  return (
    <div className="bg-sidebar relative grid min-h-screen">
      <div className="absolute z-10 h-full w-full">
        <Image
          width={10000}
          height={10000}
          alt="logo"
          src={"/bg.png"}
          className="h-full w-full object-cover opacity-10"
        />
      </div>
      <div className="z-20 flex flex-col items-center justify-center">
        <div className="flex min-w-full flex-col items-center justify-center gap-2 p-2 sm:min-w-lg">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image width={100} height={100} alt="logo" src={"/logo.png"} />
            <div className="text mb-5 text-center text-4xl font-black text-white uppercase">
               <p className=" tracking-widest">GEO-AGRI</p>
              <p className="text-xl font-bold">
                RICE FARMERS GEO MAPPING
              </p>
              <p className="text-xs font-normal">
                Calbayog City, Samar, Philippines
              </p>
            </div>
          </div>
          <Card className="bg-background w-full max-w-md gap-5 dark:opacity-80">
            <CardHeader className="gap-0">
              <CardTitle className="text-lg font-semibold sm:text-2xl mt-4">
                Admin
              </CardTitle>
              <CardDescription>
                Login and manage rice farmers data and mappings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm userType="ADMIN" />
              <p className=" text-center w-full text-xs mt-8 opacity-50">© Geo-Agri 2025. All rights reserved.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="absolute right-5 bottom-5 z-20 sm:top-5">
        <ModeToggle />
      </div>
    </div>
  );
}
