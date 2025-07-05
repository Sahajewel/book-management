import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateBorrowMutation, useGetSingleBookQuery } from "@/redux/baseApi";
import type { Iborrow } from "@/types/iBorrow";
import { Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function BorrowBook() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { data: bookData, isLoading } = useGetSingleBookQuery(bookId ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const form = useForm<Iborrow>();
  const [createBorrow] = useCreateBorrowMutation();

  const onSubmit: SubmitHandler<Iborrow> = async (data) => {
    if (!bookId) return;
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
    } catch (error) {
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

  const book = bookData?.data;

  // 🔴 If book is unavailable, show error instead of form
  if (!book?.available) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-red-100 text-red-700 px-6 py-5 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-2">This book is currently unavailable!</h2>
        <p className="text-center">You cannot borrow it at this moment.</p>
      </div>
    );
  }

  const maxQuantity = book?.copies || 1;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Borrow Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="quantity"
            rules={{ required: "Quantity is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    placeholder={`Max available: ${maxQuantity}`}
                    {...field}
                    className={`border px-3 py-2 rounded-md ${
                      fieldState.invalid ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            rules={{ required: "Date is required" }}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    className={`border px-3 py-2 rounded-md ${
                      fieldState.invalid ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition"
          >
            Borrow Now
          </Button>
        </form>
      </Form>
    </div>
  );
}
