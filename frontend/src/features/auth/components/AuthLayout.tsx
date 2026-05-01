import { CheckCircle, Ticket } from "@phosphor-icons/react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Left Panel: Branding & Benefits */}
      {/* Uses bg-foreground and text-background to guarantee high contrast purely via semantic tokens */}
      <div className="hidden w-1/2 flex-col justify-between bg-foreground p-12 text-background lg:flex xl:p-16">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Ticket className="h-8 w-8 text-primary" weight="fill" />
          BookSure
        </div>

        {/* Value Proposition */}
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight xl:text-5xl">
            Your shop. <br />
            Your queue. <br />
            <span className="text-primary">Your way.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed opacity-80">
            Join thousands of local business owners streamlining their daily
            appointments and customer flow with our intelligent queue management
            system.
          </p>

          <div className="mt-10 space-y-6">
            {[
              "Real-time Waitlist Updates",
              "Automated SMS Notifications",
              "Advanced Business Analytics",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-background/10">
                  <CheckCircle
                    className="h-4 w-4 text-background"
                    weight="fill"
                  />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative subtle gradient/spacer at the bottom */}
        <div className="h-1 w-full max-w-sm rounded-full bg-linear-to-r from-primary/50 to-transparent opacity-50" />
      </div>

      {/* Right Panel: Registration Form */}
      <Outlet />
    </div>
  );
}
