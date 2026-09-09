import { redirect } from "next/navigation";
import { getUser } from "@/lib/session";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) redirect("/blogs");
  return <div className="grid lg:grid-cols-2">{children}</div>;
}
