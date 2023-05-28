import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  comments: [],
  imageData: {},
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePosts: (state, { payload }) => ({
      ...state,
      posts: payload,
    }),
    updateImage: (state, { payload }) => {
      return { ...state, imageData: payload };
    },
    updateLikes: (state, { payload }) => {
      const { id, likes } = payload;
      const updatedPosts = state.posts.map(post => {
        if (post.postId === id) {
          return { ...post, likes };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
    updateComments: (state, { payload }) => ({
      ...state,
      comments: payload,
    }),
    updateCommentsCount: (state, { payload }) => {
      const { id, commentsCount } = payload;
      const updatedPosts = state.posts.map(post => {
        if (post.postId === id) {
          return { ...post, commentsCount };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
  },
});
