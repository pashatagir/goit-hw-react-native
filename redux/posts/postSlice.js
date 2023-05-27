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
        if (post.idPost === id) {
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
    updateCountComments: (state, { payload }) => {
      const { id, countComments } = payload;
      const updatedPosts = state.posts.map(post => {
        if (post.idPost === id) {
          return { ...post, countComments };
        }
        return post;
      });
      return { ...state, posts: updatedPosts };
    },
  },
});
