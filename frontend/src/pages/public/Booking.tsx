import React, { useState } from "react";
import { MapPin, Phone, Scissors, Drop, HandPalm } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample Data
const services = [
  { id: "haircut", label: "Haircut", icon: Scissors },
  { id: "shave", label: "Shave", icon: Drop }, // Using Drop for Shave to closely match the visual intent, or user preference
  { id: "massage", label: "Head Massage", icon: HandPalm },
];

const dates = [
  { date: "24", day: "Today", month: "May" },
  { date: "25", day: "Tomorrow", month: "May" },
  { date: "26", day: "Sun", month: "May" },
  { date: "27", day: "Mon", month: "May" },
  { date: "28", day: "Tue", month: "May" },
];

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "12:30 PM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: true },
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("haircut");
  const [selectedDate, setSelectedDate] = useState("24");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-secondary/20 p-4 py-24 font-sans">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Business Info Card */}
        <Card className="border-none shadow-sm">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Raj Salon
                </h1>
                <Badge
                  variant="secondary"
                  className="pointer-events-none rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/20"
                >
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  OPEN NOW
                </Badge>
              </div>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
                <div className="flex items-center gap-2">
                  <MapPin size={18} weight="fill" />
                  <span>123 Grooming Lane, Downtown Metro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} weight="fill" />
                  <span>+1(555) 012-3456</span>
                </div>
              </div>
            </div>

            {/* Avatar Group */}
            <div className="flex items-center">
              <div className="flex -space-x-3">
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12 border-2 border-background">
                  <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-secondary text-sm font-medium text-secondary-foreground">
                  +4
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Select Service */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Select Service
          </h2>
          <div className="flex flex-wrap gap-4">
            {services.map((service) => (
              <Button
                key={service.id}
                variant={selectedService === service.id ? "default" : "outline"}
                className="h-12 rounded-full px-6 text-base"
                onClick={() => setSelectedService(service.id)}
              >
                <service.icon
                  className="mr-2 h-5 w-5"
                  weight={selectedService === service.id ? "fill" : "regular"}
                />
                {service.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Choose Date */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Choose Date</h2>
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {dates.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <Card
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex h-28 w-24 shrink-0 cursor-pointer flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "border-primary ring-1 ring-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CardContent className="flex flex-col items-center gap-1 p-0">
                    <span
                      className={`text-sm ${
                        isSelected
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {d.day}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {d.date}
                    </span>
                    <span
                      className={`text-sm ${
                        isSelected
                          ? "font-medium text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {d.month}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Available Time Slots */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Available Time Slots
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {timeSlots.map((ts, i) => (
              <Button
                key={i}
                variant={selectedTime === ts.time ? "default" : "outline"}
                disabled={!ts.available}
                className={`h-12 text-base ${
                  !ts.available
                    ? "bg-secondary/50 text-muted-foreground opacity-50"
                    : ""
                }`}
                onClick={() => setSelectedTime(ts.time)}
              >
                {ts.time}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
