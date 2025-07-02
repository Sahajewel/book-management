import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    tagTypes: ["Book"],
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
        })
    })
});
export const { useGetBooksQuery, useGetSingleBookQuery, useUpdateBookMutation, useDeleteBookMutation } = baseApi

