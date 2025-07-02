import {
  Table,
  TableBody,
  //   TableCaption,
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
export function BookTable() {
  const { data, isLoading, refetch } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const books = data?.data || [];
  console.log("data", data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className={cn("h-10 w-10 animate-spin text-blue-600")} />
      </div>
    );
  }
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Do you want to delete this book?");
    if (!confirm) return;
    try {
      await deleteBook(id).unwrap();
      toast.success("The book has been deleted");
      refetch();
    } catch (err) {
      console.error("Deleted Failed", err);
      toast.error("The book can't be deleted");
    }
  };
  return (
    <div>
      <h1 className="text-center my-10 text-4xl lg:text-6xl font-bold">
        List of all Books
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell className="font-medium">{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                {book.available ? (
                  <span className="text-green-600 font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Unavailable
                  </span>
                )}
              </TableCell>
              <TableCell className="space-x-2">
                {/* Edit Button */}
                <Link to={`/edit-book/${book._id}`}>
                  <Button variant="ghost" size="icon" className="text-blue-600 cursor-pointer">
                    Edit
                  </Button>
                </Link>

                {/* Delete Button + DialogTrigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="text-red-600 cursor-pointer"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Do you want to delete?</DialogTitle>
                      <DialogDescription>
                        Are you sure? <strong>{book.title}</strong>"Do you want to delete this book? This action cannot be undone."
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end space-x-2 ">
                      
                      <Button className="cursor-pointer"
                        variant="destructive"
                        onClick={async () => {
                          await deleteBook(book._id).unwrap();
                          toast.success("The book has been deleted");
                          refetch();
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Borrow Button */}
                <Button variant="ghost" size="icon" className="text-green-600 ml-2 cursor-pointer">
                  Borrow
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
