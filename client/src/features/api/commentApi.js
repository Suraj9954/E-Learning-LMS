import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COMMENT_API = "http://localhost:8080/api/v1/comment";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COMMENT_API,
    credentials: "include",
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/comments`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: ({ courseId, lectureId, text }) => ({
        url: `/${courseId}/lecture/${lectureId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Comments"],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, text }) => ({
        url: `/comment/${commentId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
