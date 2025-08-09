import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.type !== "FARMER") {
    redirect("/admin");
  }

  return (
      children
  );
}
