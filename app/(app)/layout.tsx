import { requireUser } from "@/lib/session";
import { Appbar } from "@/components/Appbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-ember-100">
      <Appbar user={{ name: user.name, email: user.email }} />
      {children}
    </div>
  );
}
