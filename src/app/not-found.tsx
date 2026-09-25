import Link from "next/link";
import { Button } from "@/components/ui/button";
import { displayFont } from "@/lib/fonts";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center px-6">
      <h1 className={`${displayFont.className} text-5xl`}>Page not found</h1>
      <p className="mt-3 text-muted-foreground">That address is not part of this site.</p>
      <Button asChild className="mt-6 h-10 px-4">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
