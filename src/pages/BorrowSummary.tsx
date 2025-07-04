import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBorrowSummaryQuery } from "@/redux/baseApi";
import { Loader2 } from "lucide-react";

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500">Failed to load summary</div>;
  }

  // ✅ Filter out null or deleted books
  const summary = data.data.filter((item) => item.book);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Borrow Summary</h1>
      <Table className="border shadow-md rounded-md">
        <TableCaption className="text-sm text-gray-500 py-2">
          A list of all borrowed books with total quantities.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">ISBN</TableHead>
            <TableHead className="text-right font-semibold">
              Total Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
