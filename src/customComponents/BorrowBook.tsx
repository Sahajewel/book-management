import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateBorrowMutation, useGetSingleBookQuery } from "@/redux/baseApi";
import type { Iborrow } from "@/types/iBorrow";
import { Loader2 } from "lucide-react";
import { useForm,  type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function BorrowBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading } = useGetSingleBookQuery(bookId);
  const form = useForm<Iborrow>();
  const [createBorrow] = useCreateBorrowMutation();

  const onSubmit: SubmitHandler<Iborrow> = async (data) => {
   if (!bookId) {
  return <div className="text-red-500 text-center mt-10">Invalid Book ID</div>;
}
    const borrow = {
      book: bookId,
      quantity: Number(data.quantity),
      dueDate: data.dueDate,
    };
    try {
      await createBorrow(borrow).unwrap();
      toast.success("Book successfully borrowed");
      form.reset();
      navigate("/borrow-summary");
    } catch (error: any) {
      toast.error("Failed to borrow book");
    }
  };

   if (isLoading) {
      return (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }
  

  const maxQuantity = bookData?.data?.copies || 1;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Borrow Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    placeholder={`Max available: ${maxQuantity}`}
                    {...field}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Select due date"
                    {...field}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition">
            Borrow Now
          </Button>
        </form>
      </Form>
    </div>
  );
}
