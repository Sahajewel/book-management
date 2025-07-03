import App from "@/App";
import BorrowBook from "@/customComponents/BorrowBook";
import EditBook from "@/customComponents/EditBook";
import AddBook from "@/pages/AddBook";
import AllBooks from "@/pages/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "all-books",
        Component: AllBooks,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "edit-book/:id",
        Component: EditBook,
      },
      {
        path: "borrow/:bookId",
        Component: BorrowBook,
      },
    ],
  },
]);
