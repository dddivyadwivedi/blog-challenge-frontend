import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogPosts: undefined,
  getAllBlogLoading : false,
  getAllBlogError : undefined,
  addBlogLoading : false,
  addBlogError : undefined,
  editBlogLoading : false,
  editBlogError : undefined,
  deleteBlogLoading : false,
  deleteBlogError : undefined,
  singleBlogLoading : false,
  singleBlog : undefined,
  singleBlogError : undefined,
  addCommentLoading : false,
  addCommentError : undefined,
  getAllCommentLoading : false,
  getAllComments : undefined,
  getAllCommentsError : undefined,
};

const BlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {

    allBlogPostStart : (state,action)=>{
      return{
        ...state,
        getAllBlogLoading : true,
        blogPosts : undefined,
        getAllBlogError : undefined,
      }
    },
    allBlogPostSuccess : (state,action)=>{
      return{
        ...state,
        getAllBlogLoading : false,
        blogPosts : action.payload,
        getAllBlogError : undefined,
      }
    },
    allBlogPostFailure : (state,action)=>{
      return{
        ...state,
        getAllBlogLoading : false,
        blogPosts : undefined,
        getAllBlogError : action.payload,
      }
    },
    singleBlogPostStart : (state,action)=>{
      return{
        ...state,
        singleBlogLoading : true,
        singleBlog : undefined,
        singleBlogError : undefined,
      }
    },
    singleBlogPostSuccess : (state,action)=>{
      return{
        ...state,
        singleBlogLoading : false,
        singleBlog : action.payload,
        singleBlogError : undefined,
      }
    },
    singleBlogPostFailure : (state,action)=>{
      return{
        ...state,
        singleBlogLoading : false,
        singleBlog : undefined,
        singleBlogError : action.payload,
      }
    },
    addBlogPostStart: (state , action)=>{
      return{
        ...state,
        addBlogLoading : true,
        addBlogError : undefined,
      }
    },
    addBlogPostSuccess: (state, action) => {
      return{
        ...state,
        addBlogLoading : false,
        addBlogError : undefined,
      }
    },
    addBlogPostFailure: (state, action) => {
      return{
        ...state,
        addBlogLoading : false,
        addBlogError : action.payload,
      }
    },

  
    editBlogPostStart:  (state, action) => {
      return{
        ...state,
        editBlogLoading : true,
        editBlogError : undefined
      }
    },
    editBlogPostSuccess: (state, action) => {
      return{
        ...state,
        editBlogLoading : false,
        editBlogError : undefined
      }
    },
    editBlogPostFailure: (state, action) => {
      return{
        ...state,
        editBlogLoading : false,
        editBlogError : action.payload
      }
    },


    deleteBlogPostStart: (state  , action)=> {
      return{
        ...state,
        deleteBlogLoading : true,
        deleteBlogError : undefined
      }
    },
    deleteBlogPostSuccess: (state, action) => {
      return{
        ...state,
        deleteBlogLoading : false,
        deleteBlogError : undefined
      }
    },
    deleteBlogPostFailure: (state, action) => {
      return{
        ...state,
        deleteBlogLoading : false,
        deleteBlogError : action.payload
      }
    },
    addCommentStart : (state , action)=>{
      return{
        ...state,
        addCommentLoading : true,
        addCommentError : undefined
      }
    },
    addCommentSuccess : (state,action)=>{
      return{
        ...state,
        addCommentLoading: false,
        addCommentError : undefined
      }
    },
    addCommentFailure : (state,action)=>{
      return{
        ...state,
        addCommentLoading : false,
        addCommentError : undefined,
      }
    },
    getAllCommentStart : (state,action)=>{
      return{
        ...state,
        getAllCommentLoading : true,
        getAllComments : undefined,
        getAllCommentsError : undefined,
      }
    },
    getAllCommentSuccess : (state,action)=>{
      return{
        ...state,
        getAllCommentLoading : false,
        getAllComments : action.payload,
        getAllCommentsError : undefined,
      }
    },
    getAllCommentFailure : (state,action)=>{
      return{
        ...state,
        getAllCommentLoading : true,
        getAllComments : undefined,
        getAllCommentsError : action.payload,
      }
    }
  },
  
});

export const {
  allBlogPostStart,
  allBlogPostSuccess,
  allBlogPostFailure,
  singleBlogPostStart,
  singleBlogPostSuccess,
  singleBlogPostFailure,
  addBlogPostStart,
  addBlogPostSuccess,
  addBlogPostFailure,
  editBlogPostStart,
  editBlogPostSuccess,
  editBlogPostFailure,
  deleteBlogPostStart,
  deleteBlogPostSuccess,
  deleteBlogPostFailure,
  addCommentStart,
  addCommentSuccess,
  addCommentFailure,
  getAllCommentStart,
  getAllCommentSuccess,
  getAllCommentFailure,
} = BlogSlice.actions;

export default BlogSlice.reducer;
