import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateBookMutation } from "@/redux/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CustomForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: "",
      available: true,
    },
  });

  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = {
      ...data,
      copies: Number(data.copies),
      available: Boolean(data.available),
    };

    try {
      await createBook(bookData).unwrap();
      toast.success("📘 A book has been added");
      form.reset();
      navigate("/all-books");
    } catch (error) {
      console.error("Create failed", error);
      toast.error("❌ Failed to add the book.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-center text-3xl font-bold text-indigo-700 mb-8">
        📚 Add New Book
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title & Author */}
          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Tilte is required" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter book title"
                      {...field}
                      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author is required" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      {...field}
                      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Genre & ISBN */}
          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Genre is required" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Genre</option>
                      <option value="fiction">Fiction</option>
                      <option value="non_fiction">Non-Fiction</option>
                      <option value="science">Science</option>
                      <option value="history">History</option>
                      <option value="biography">Biography</option>
                      <option value="fantasy">Fantasy</option>
                    </select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              rules={{ required: "ISBN is required" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter ISBN"
                      {...field}
                      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Description & Copies */}
          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              rules={{ required: "Copies is required" }}
              render={({ field, fieldState }) => (
                <FormItem className="w-full">
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of copies"
                      {...field}
                      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        fieldState.invalid ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Available Checkbox */}
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormLabel className="mb-0">Available</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value || false}
                    className="w-5 h-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="text-center">
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md cursor-pointer"
              type="submit"
            >
              📥 Submit Book
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
