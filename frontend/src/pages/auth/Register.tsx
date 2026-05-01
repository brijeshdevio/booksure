import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Storefront,
  EnvelopeSimple,
  LockKey,
  ArrowRight,
  Scissors,
  Plant,
  ForkKnife,
  Barbell,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2 lg:p-12">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl shadow-black/5">
          <CardHeader className="space-y-2 pt-10 pb-8 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Create an account
            </CardTitle>
            <CardDescription className="text-base">
              Start your 14-day free trial. No credit card required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              {/* Business Name Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="businessName"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Owner Name
                </Label>
                <div className="relative">
                  <Storefront
                    className="absolute top-3 left-3 h-5 w-5 text-muted-foreground"
                    weight="regular"
                  />
                  <Input
                    id="businessName"
                    placeholder="Acme Barbershop"
                    className="h-11 pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <EnvelopeSimple
                    className="absolute top-3 left-3 h-5 w-5 text-muted-foreground"
                    weight="regular"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="owner@example.com"
                    className="h-11 pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <LockKey
                      className="absolute top-3 left-3 h-5 w-5 text-muted-foreground"
                      weight="regular"
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11 pl-10 tracking-widest"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    Confirm
                  </Label>
                  <div className="relative">
                    <CheckCircle
                      className="absolute top-3 left-3 h-5 w-5 text-muted-foreground"
                      weight="regular"
                    />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="h-11 pl-10 tracking-widest"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-start space-x-3 pt-2">
                <Checkbox id="terms" className="mt-1" required />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed font-medium text-muted-foreground"
                >
                  I agree to the{" "}
                  <a
                    href="#terms"
                    className="font-bold text-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    className="font-bold text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <Button className="mt-2 h-12 w-full text-base font-bold shadow-lg shadow-primary/20">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center pb-10">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-foreground transition-colors hover:text-primary"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Trusted Brands Footer */}
        <div className="mt-10 text-center">
          <p className="mb-6 text-xs font-bold tracking-widest text-muted-foreground/60 uppercase">
            Trusted by leading local brands
          </p>
          <div className="flex items-center justify-center gap-8 text-muted-foreground/40 sm:gap-12">
            <Scissors
              className="h-7 w-7 transition-colors hover:text-primary"
              weight="fill"
            />
            <Plant
              className="h-7 w-7 transition-colors hover:text-primary"
              weight="fill"
            />
            <ForkKnife
              className="h-7 w-7 transition-colors hover:text-primary"
              weight="fill"
            />
            <Barbell
              className="h-7 w-7 transition-colors hover:text-primary"
              weight="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
