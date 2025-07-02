import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 shadow-md bg-white sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-blue-600">📚 Book Manager</Link>

      <div className="hidden md:flex gap-4">
        <Link to="/all-books" className="hover:underline">
          All Books
        </Link>
        <Link to="/add-book" className="hover:underline">
          Add Book
        </Link>
        <Link to="/borrow-summary" className="hover:underline">
          Borrow Summary
        </Link>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-4">
              <Link to="/books">All Books</Link>
              <Link to="/create-book">Add Book</Link>
              <Link to="/borrow-summary">Borrow Summary</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
