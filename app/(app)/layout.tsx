import { requireUser } from "@/lib/session";
import { Appbar } from "@/components/Appbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}
