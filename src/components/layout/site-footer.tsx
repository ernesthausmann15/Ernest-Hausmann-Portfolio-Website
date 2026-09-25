import { LinkedInMark } from "@/components/icons/linkedin-mark";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}
          <span className="px-2 text-border">/</span>
          {site.role}
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">
            {site.email}
          </a>
          <a
            href={site.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Ernest Hausmann on LinkedIn"
            className="text-primary hover:opacity-80"
          >
            <LinkedInMark className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
