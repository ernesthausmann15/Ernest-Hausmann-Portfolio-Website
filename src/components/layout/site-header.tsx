"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { GitHubMark } from "@/components/icons/github-mark";
import { LinkedInMark } from "@/components/icons/linkedin-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { displayFont } from "@/lib/fonts";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItems({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: boolean;
}) {
  return (
    <>
      {navLinks.map((link) => {
        const current = isCurrent(pathname, link.href);
        const className = cn(
          "text-sm tracking-wide transition-colors",
          current ? "text-primary" : "text-muted-foreground hover:text-foreground",
        );

        if (onNavigate) {
          return (
            <SheetClose asChild key={link.href}>
              <Link href={link.href} className={className} aria-current={current ? "page" : undefined}>
                {link.label}
              </Link>
            </SheetClose>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={className}
            aria-current={current ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span
            className={`${displayFont.className} grid size-9 place-items-center rounded-full border border-primary/50 text-lg text-primary`}
          >
            EH
          </span>
          <span className="text-sm tracking-wide">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <NavItems pathname={pathname} />
          <div className="flex items-center gap-4">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Ernest Hausmann on GitHub"
              className="text-primary transition-opacity hover:opacity-80"
            >
              <GitHubMark className="size-5" />
            </a>
            <a
              href={site.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Ernest Hausmann on LinkedIn"
              className="text-primary transition-opacity hover:opacity-80"
            >
              <LinkedInMark className="size-5" />
            </a>
          </div>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className={displayFont.className}>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-5 px-4" aria-label="Mobile">
              <NavItems pathname={pathname} onNavigate />
              <SheetClose asChild>
                <a
                  href={site.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <GitHubMark className="size-4" />
                  GitHub
                </a>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href={site.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <LinkedInMark className="size-4" />
                  LinkedIn
                </a>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
