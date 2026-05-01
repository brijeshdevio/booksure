import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navbarItems = [
  {
    name: "How it works",
    href: "#how-it-works",
  },
  {
    name: "Shops",
    href: "/shops",
  },
];

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 z-50 w-full px-2">
      <nav className="mx-auto flex max-w-lg items-center justify-between gap-x-4 rounded-full border bg-muted p-2">
        <Link to="/" className="pl-2 font-semibold text-primary">
          BookSure.
        </Link>
        <div className="hidden md:flex">
          {navbarItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button variant={"link"} className="text-foreground">
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <div>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
