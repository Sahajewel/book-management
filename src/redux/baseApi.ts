import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    tagTypes: ["Book", "BorrowSummary"],
    endpoints: (builder)=>({
        //  all books
        getBooks: builder.query({
            query: ()=>"/books",
             providesTags: ["Book"]
        }),
        // single book
        getSingleBook: builder.query({
            query: (id:string) => `/books/${id}`
        }),
        // update book
        updateBook: builder.mutation({
            query:({id,data})=>({
                url: `edit-book/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Book"]
        }),
        deleteBook: builder.mutation({
            query: (id:string)=>({
                url: `/books/${id}`,
                method: "DELETE"
            })
        }),
        createBook:builder.mutation({
            query:(bookData)=>({
                url: "/create-book",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["Book"]
        }),
        createBorrow: builder.mutation({
            query: (borrowData)=>({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
            invalidatesTags: ["Book", "BorrowSummary"]
        }),
        getBorrowSummary:builder.query({
            query:()=>"/borrow-summary",
            providesTags: ["BorrowSummary"]

        })
    })
});
export const { useGetBooksQuery, useGetSingleBookQuery, useUpdateBookMutation, useDeleteBookMutation, useCreateBookMutation, useCreateBorrowMutation, useGetBorrowSummaryQuery } = baseApi

