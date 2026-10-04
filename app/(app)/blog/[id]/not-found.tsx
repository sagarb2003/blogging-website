import { NotFoundState } from "@/components/NotFoundState";

export default function NotFound() {
  return (
    <NotFoundState
      title="This story wandered off"
      description="It may have been removed, or the link might be wrong."
      href="/blogs"
      cta="Back to stories"
    />
  );
}
