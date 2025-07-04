import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/baseApi";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function BookTable() {
  const { data, isLoading, refetch } = useGetBooksQuery(undefined,{ refetchOnMountOrArgChange: true});
  const [deleteBook] = useDeleteBookMutation();
  const books = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className={cn("h-12 w-12 animate-spin text-blue-600")} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-center my-12 text-4xl font-extrabold text-gray-900 tracking-tight">
        Library Book Collection
      </h1>

      <Table className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <TableHeader className="bg-gray-100">
          <TableRow>
            {["Title", "Author", "Genre", "ISBN", "Copies", "Status", "Actions"].map((header) => (
              <TableHead
                key={header}
                className="text-left text-gray-700 uppercase tracking-wide px-4 py-3 select-none"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="font-semibold px-4 py-3 max-w-xs truncate" title={book.title}>
                {book.title}
              </TableCell>
              <TableCell className="px-4 py-3">{book.author}</TableCell>
              <TableCell className="px-4 py-3">{book.genre}</TableCell>
              <TableCell className="px-4 py-3">{book.isbn}</TableCell>
              <TableCell className="px-4 py-3 text-center">{book.copies}</TableCell>
              <TableCell className="px-4 py-3 text-center">
                {book.available ? (
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Unavailable
                  </span>
                )}
              </TableCell>

              <TableCell className="px-4 py-3 space-x-3 whitespace-nowrap flex items-center justify-center">
                <Link to={`/edit-book/${book._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 cursor-pointer"
                    aria-label={`Edit ${book.title}`}
                  >
                    Edit
                  </Button>
                </Link>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 cursor-pointer"
                      aria-label={`Delete ${book.title}`}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-md rounded-xl border border-red-300 shadow-xl">
                    <DialogHeader>
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 text-red-600 p-2 rounded-full ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-10 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M4 6h16M4 6l4 14h8l4-14"
                            />
                          </svg>
                        </div>
                        <DialogTitle className="text-red-600">Delete Book?</DialogTitle>
                      </div>
                      <DialogDescription className="text-gray-600 mt-2">
                        Are you sure you want to permanently remove?{" "}
                       
                      </DialogDescription>
                    </DialogHeader>

                   <DialogFooter className="flex justify-end gap-2 mt-6">
  <DialogClose asChild>
    <Button
      variant="outline"
      size="sm"
      className="hover:bg-gray-100 cursor-pointer"
    >
      Cancel
    </Button>
  </DialogClose>

  <Button
    className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
    size="sm"
    onClick={async () => {
      try {
        await deleteBook(book._id ?? "").unwrap();
        toast.success("Book deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete book");
      }
    }}
  >
    Yes, Delete
  </Button>
</DialogFooter>

                  </DialogContent>
                </Dialog>

                <Link to={`/borrow/${book._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 hover:bg-green-50 cursor-pointer"
                    aria-label={`Borrow ${book.title}`}
                  >
                    Borrow
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
