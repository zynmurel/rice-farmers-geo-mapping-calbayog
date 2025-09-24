import { Handshake, House, Newspaper, Users, Wheat, Settings, LayoutDashboard } from "lucide-react";

export const menu = [
    {
      title: "Overview",
      key : "overview",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Farmers",
      key : "farmers",
      url: "/admin/farmers",
      icon: Users,
    },
    {
      title: "Farms",
      key : "farms",
      url: "/admin/farms",
      icon: House,
    },
    {
      title: "Crops & Fertilizers",
      key : "crops",
      url: "/admin/crops",
      icon: Wheat,
    },
    {
      title: "Distribution & Crop Planting",
      key : "distribution",
      url: "/admin/distribution",
      icon: Handshake,
    },
    {
      title: "News",
      key : "news",
      url: "/admin/news",
      icon: Newspaper,
    },
    {
      title: "Settings",
      key : "settings",
      url: "/admin/settings",
      icon: Settings,
    }
  ]