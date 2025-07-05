import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false); 

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-books", label: "All Books" },
    { path: "/add-book", label: "Add Book" },
    { path: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          📚 Book Manager
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`transition duration-200 hover:underline ${
                location.pathname === path ? "font-semibold underline" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white p-6">
              <div className="flex flex-col gap-4">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)} 
                    className="text-gray-700 hover:text-blue-600 text-lg font-medium"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
