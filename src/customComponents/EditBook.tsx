import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBookQuery, useUpdateBookMutation } from "@/redux/baseApi";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetSingleBookQuery(id || "", {
    refetchOnMountOrArgChange: true,
  });
  const [updateBook] = useUpdateBookMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        ...data.data,
        copies: Number(data.data.copies),
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      available: formData.copies > 0,
    };

    try {
      await updateBook({ id, data: updated }).unwrap();
      refetch();
      toast.success("Book updated!");
      navigate("/all-books");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className={cn("h-10 w-10 animate-spin text-blue-600")} />
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        Title:{" "}
        <input
          className="w-full border p-2"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        Author:{" "}
        <input
          className="w-full border p-2"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        Genre:{" "}
        <select
          className="w-full border p-2"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        >
          <option value="">Select Genre</option>
          <option value="fiction">Fiction</option>
          <option value="non_fiction">Non-Fiction</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          <option value="biography">Biography</option>
          <option value="fantasy">Fantasy</option>
        </select>
        ISBN:{" "}
        <input
          className="w-full border p-2"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
        Description:{" "}
        <textarea
          className="w-full border p-2"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        Copies:{" "}
        <input
          className="w-full border p-2"
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          type="submit"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
