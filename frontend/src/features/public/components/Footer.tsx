import { Button } from "@/components/ui/button";
import { Globe, At } from "@phosphor-icons/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 px-6 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <span className="text-xl font-bold tracking-tight text-foreground">
            BookSure
          </span>
          <span className="mt-1 text-xs font-medium text-muted-foreground">
            &copy; {currentYear} BookSure. All rights reserved.
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a href="#terms" className="transition-colors hover:text-foreground">
            Terms of Service
          </a>
          <a
            href="#support"
            className="transition-colors hover:text-foreground"
          >
            Support
          </a>
        </nav>

        {/* Right Side: Icon Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-border bg-background text-foreground hover:bg-muted"
          >
            <Globe className="h-5 w-5" weight="regular" />
            <span className="sr-only">Region / Language</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-border bg-background text-foreground hover:bg-muted"
          >
            <At className="h-5 w-5" weight="regular" />
            <span className="sr-only">Contact</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
