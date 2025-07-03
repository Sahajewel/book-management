import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateBorrowMutation, useGetSingleBookQuery } from "@/redux/baseApi";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";


export default function BorrowBook() {
    const {bookId} = useParams();
    const navigate = useNavigate();
    const {data: bookData, isLoading} = useGetSingleBookQuery(bookId);
    const form = useForm();
    const [createBorrow]= useCreateBorrowMutation();
    const onSubmit:SubmitHandler<FieldValues> = async(data)=>{
        if(!bookId) return;
        const borrow = {
           book: bookId,
           quantity: Number(data.quantity),
           dueDate: data.dueDate
        }
       try{
        await createBorrow(borrow).unwrap();
        toast.success("Book successfully borrowed");
        form.reset();
        
        navigate("/borrow-summary");
       }catch(error: any){
        toast.error("Failed to borrow book")
       }
    };
    if(isLoading){
        return <p>..Loading</p>
    }
    const maxQuantity = bookData?.data?.copies || 1;
   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input  type="number" min={1} max={maxQuantity}  placeholder="No. of copies" {...field} />
              </FormControl>
            
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Date" {...field} />
              </FormControl>
            
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
