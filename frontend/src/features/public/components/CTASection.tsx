import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 sm:py-32">
      {/* Subtle background glow using the semantic primary color */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-3/4 w-3/4 max-w-2xl -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to streamline your shop?
        </h2>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Join hundreds of local businesses using BookSure to manage their daily
          walk-ins efficiently.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 rounded-lg px-8 text-base font-semibold"
          >
            Get Started for Free
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-lg border-border bg-secondary/30 px-8 text-base font-semibold text-secondary-foreground hover:bg-secondary/60"
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
