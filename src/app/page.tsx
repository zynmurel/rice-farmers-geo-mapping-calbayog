"use client";
import React, { useState } from "react";
import { ModeToggle } from "./_components/mode-toggle";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { useRouter } from "next/navigation";
import FarmerLoginModal from "./(public)/_components.tsx/farmer-login-modal";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./_components/map"), { ssr: false });
function Page() {
  const router = useRouter();
  const [active, setActive] = useState("#home");
  const [open, openModal] = useState<null | "register" | "login">(null)
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center text-white">
      <FarmerLoginModal open={open} openModal={openModal}/>
      <div className="bg-sidebar flex w-full items-center justify-center p-3 md:p-5">
        <div className="flex w-full max-w-[1300px] flex-row items-center gap-5">
          <Image
            width={100}
            height={100}
            alt="logo"
            src={"/logo.png"}
            className="size-8 md:size-12"
          />
          <div className="hidden flex-col md:flex">
            <p className="text-sidebar-accent text-xl leading-5 tracking-[4px] brightness-150">
              CALBAYOG
            </p>
            <p className="text-xl font-bold tracking-[5px] text-nowrap">
              GEO-AGRI
            </p>
          </div>
          <div className="hidden flex-row items-center justify-center gap-3 px-0 text-sm md:flex md:gap-10 md:px-10 md:text-lg">
            {[
              {
                path: "#home",
                title: "Home",
              },
              {
                path: "#map",
                title: "Map",
              },
              {
                path: "#about",
                title: "About",
              },
            ].map((data) => (
              <Link
                key={data.path}
                className={`${active === data.path ? "font-medium" : "font-light opacity-80"} tracking-widest`}
                href={data.path}
                onClick={() => setActive(data.path)}
              >
                {data.title}
              </Link>
            ))}
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <div className="flex flex-row items-center justify-center gap-2 px-0 text-xs md:gap-6 md:px-5 md:text-sm">
              {[
                {
                  path: "#",
                  title: "LOGIN",
                },
                {
                  path: "#",
                  title: "REGISTER",
                },
              ].map((data) => (
                <Link
                  key={data.title}
                  className={`tracking-widest`}
                  href={data.path}
                  onClick={() => openModal(data.title === "LOGIN" ? "login" : "register")}
                >
                  {data.title}
                </Link>
              ))}
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex h-[90vh] w-full justify-center overflow-y-scroll scroll-smooth">
        <div className="grid w-full">
          <div className="flex h-[90vh] flex-col md:h-[90vh]" id="home">
            <div className="relative flex h-full items-center justify-center overflow-hidden">
              <Image
                width={1000}
                height={1000}
                alt="logo"
                src={"/rice-bg.jpg"}
                className="absolute z-10 h-full w-full object-cover brightness-[.7] sepia-50"
              />
              <div className="z-50 flex w-full max-w-[1300px] flex-col px-5">
                <p className="text-4xl font-bold tracking-widest shadow-black drop-shadow md:text-7xl">
                  GEO-AGRI
                </p>
                <p className="mt-4 max-w-[400px] text-base tracking-widest md:text-2xl">
                  Empowering Calbayog City with a comprehensive overview of rice
                  production
                </p>
                <Button
                  onClick={() => {
                    router.push("#map");
                    setActive("#map");
                  }}
                  className="bg-background/70 text-primary dark:text-foreground hover:bg-background mt-5 w-[200px] flex-none cursor-pointer px-3 text-base md:h-14 md:px-10 md:text-xl"
                >
                  <Map className="size-5 md:size-6" />
                  View Map
                </Button>
              </div>
            </div>
            <div className="text-foreground grid items-center justify-center py-5">
              <div className="w-full font-bold">
                <p className="md:text-xl">FEATURED FARMS</p>
                <div className="flex w-full max-w-[96vw] flex-row flex-nowrap items-center gap-2 overflow-auto xl:max-w-[1300px]">
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                  <div className="bg-primary/40 h-48 w-64 flex-none rounded-2xl shadow md:h-64 md:w-64"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="map"
            className="border-sidebar-accent relative flex h-[70vh] flex-col items-center overflow-hidden border-t border-b md:h-[90vh]"
          >
            <MapView className="absolute opacity-80" />
            <div className="text-foreground absolute top-0 right-0 my-5 flex max-w-[1300px] flex-col items-end justify-center px-5">
              <div className="text-primary flex flex-row items-center gap-3">
                <Map className="size-5 md:size-10" strokeWidth={3} />
                <p className="text-xl font-bold tracking-widest md:text-4xl">
                  FARM MAP VIEW
                </p>
              </div>
              <p className="text-primary text-xs font-medium opacity-80 md:text-xl">
                Farmers Registered : 100
              </p>
            </div>
          </div>

          <div
            className="border-sidebar-accent relative flex h-[20vh] mt-5 flex-col items-center justify-center overflow-hidden  md:h-[30vh]"
            id="about"
          >
            <Image
              width={1000}
              height={1000}
              alt="logo"
              src={"/bg.png"}
              className="absolute z-10 h-full w-full object-cover brightness-[.7] sepia-50 opacity-80"
            />
            <div className="z-50 flex h-full w-full max-w-[1300px] flex-col justify-end px-5 py-5 md:py-10">
              <p className="text-4xl font-bold tracking-widest shadow-black drop-shadow md:text-7xl">
                ABOUT US
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="text-foreground/60 flex w-full max-w-[1300px] flex-col p-5 pb-40 text-xs md:text-xl">
              <p className="xl:mt-5">
                In Calbayog City, farming serves as a major livelihood for many
                residents, with rice cultivation being the dominant crop
                produced in the area, yet there is no centralized system for
                tracking crop location per baranggay. The Department of
                Agriculture Office, meanwhile lacks a centralized system for
                crop mapping, making it hard for them to track the number of
                rice crop farmers registered in each baranggay.
              </p>
              <p className="my-5">
                To address these challenges, Geo-Agri: Rice Finding and Mapping
                System, a web-based GIS application that will allow farmers,
                buyers, and agricultural agencies to locate crops, monitor
                production, and improve market accessibility.
              </p>
            </div>
          </div>
          <div className="bg-sidebar mt-10 h-20 w-full">
            <div className="bg-sidebar flex flex-col items-center justify-center p-10 py-16">
              <p className="text-base font-semibold tracking-widest opacity-80 md:text-xl">
                GEO-AGRI
              </p>
              <p className="text-xs opacity-80 md:text-sm">
                © Geo-Agri 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
