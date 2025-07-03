// src/pages/Welcome.tsx
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-100 via-white to-pink-100">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          📚 Welcome to Book Management System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Manage your library with ease — add, edit, borrow books.
        </p>
        <Link to="/all-books">
          <Button className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-lg cursor-pointer">
            View All Books
          </Button>
        </Link>
      </div>
    </section>
  )
}
