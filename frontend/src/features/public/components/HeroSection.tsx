import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  PlayCircle,
  Clock,
  Storefront,
  Users,
  Circle,
} from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
      {/* Subtle Background Glow behind the card */}
      <div
        className="w- absolute top-1/2 right-0 h-150 translate-x-1/4 -translate-y-1/2 rounded-full blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Side: Marketing Content */}
        <div className="max-w-2xl">
          <Badge
            variant="secondary"
            className="mb-8 rounded-full border-none px-4 py-1.5"
          >
            <Circle weight="fill" className="mr-2 h-2 w-2" />
            Queue Management Made Simple
          </Badge>

          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl">
            Stop the Queue. <span className="text-primary">Start Booking.</span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Let your customers book a slot before they walk in. Reduce waiting
            room friction and manage your flow with digital tokens.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 rounded-lg px-6 text-base font-semibold shadow-md shadow-orange-500/20">
              Register Your Shop
              <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-lg px-6 text-base font-semibold"
            >
              See How It Works
              <PlayCircle className="ml-2 h-5 w-5" weight="regular" />
            </Button>
          </div>
        </div>

        {/* Right Side: App Mockup Card */}
        <Card className="relative mx-auto w-full max-w-md">
          <CardContent className="shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
            {/* Card Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl">
                  <Storefront className="h-6 w-6" weight="regular" />
                </div>
                <div>
                  <h3 className="leading-none font-bold">Ace Barbershop</h3>
                  <p className="mt-1.5 text-[13px]">Booking Confirmed</p>
                </div>
              </div>
              <Badge className="rounded-md border-none px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-none">
                LIVE
              </Badge>
            </div>

            {/* Token Highlight Area */}
            <div className="mb-6 rounded-xl py-8 text-center">
              <p className="mb-2 text-xs font-semibold tracking-widest uppercase">
                YOUR TOKEN NUMBER
              </p>
              <p className="text-6xl font-black tracking-tighter text-primary">
                #007
              </p>
            </div>

            {/* Details List */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" weight="regular" />
                  Est. Wait Time
                </div>
                <span className="font-semibold">12 Mins</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" weight="regular" />
                  People Ahead
                </div>
                <span className="font-semibold">2 People</span>
              </div>
            </div>

            {/* Bottom Action */}
            <Button className="h-12 w-full rounded-lg text-base font-semibold">
              View Live Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
