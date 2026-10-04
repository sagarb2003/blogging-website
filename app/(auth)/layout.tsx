import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) redirect("/blogs");
  return <div className="grid min-h-screen bg-paper lg:grid-cols-[1fr_1.05fr]">{children}</div>;
}
