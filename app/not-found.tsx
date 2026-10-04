import { NotFoundState } from "@/components/NotFoundState";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <NotFoundState
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        href="/"
        cta="Go home"
      />
    </div>
  );
}
