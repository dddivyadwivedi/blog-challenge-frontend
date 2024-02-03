import React , {useState} from 'react';
import './BlogPostStyle.css'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from '../../components/Navbar/Navbar';
import { connect } from "react-redux";
import * as _ from "lodash";
import { useEffect } from "react";
import Spin from "../../components/Spinner/Spinner";
import Button from 'react-bootstrap/Button';

const BlogPost = ({ 
  blogPostsLoading,
  blogPostsData,
  blogPostFailure,
  fetchSingleBlogPostAsync,
  userDetails,
  deleteBlogAsyncCalled,
  deleteBlogLoading,
  deleteBlogError,
  getAllComments,
  getAllCommentsLoading,
  addCommentLoading,
  addCommentAsync,
  fetchAllCommentAsync,
 }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState('');


  useEffect(()=>{
    
    console.log('id->' ,userDetails);
    fetchSingleBlogPostAsync({id})
    fetchAllCommentAsync({id})
  }  , [id])

    const handleCommentChange = (event) => {
      setContent(event.target.value);
    };
  
    const handleAddComment = () => {
      // Add new comment logic here
      // console.log('New comment:', newComment);
      addCommentAsync({content  , blogPostId : blogPostsData.id})
      setContent('');
      
    };
  return (
    <>
    <NavBar />
    {(blogPostsLoading || deleteBlogLoading || addCommentLoading) && <Spin/>}
    {blogPostsData !== undefined &&

    <div id="blog-post">
      <div className="post-content">
        <h3 className='header'>{blogPostsData && blogPostsData.title}</h3>
        <img src={blogPostsData && blogPostsData.blogImageLink} />
        <p>
       {blogPostsData && blogPostsData.description}
        </p>
      </div>
      <h5>Add a Comment</h5>
      <div className="add-comment-section">
       
        <textarea
          value={content}
          onChange={handleCommentChange}
          placeholder="Enter your comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      {getAllComments !== undefined && getAllComments.length > 0 && 
      <div className="comment-section">
        <h3>Comments</h3>
        <ul>
          {getAllComments.map((comment) => (
            <li key={comment.id} className="comment">
             <strong>{comment.content}</strong>
             <div style={{textAlign : 'end'}}>Author : {comment.user.userName}</div>
            </li>
          ))}
        </ul>
      </div>
 }
      {
        ((userDetails !== undefined && userDetails.id)  == blogPostsData.userId) &&
      <>
        <Button variant="warning"  onClick={()=>{ navigate(`/managePost/${blogPostsData.id}` , {state : {blogPostsData}})}} >Edit</Button>
        <Button
                variant="danger"
                className="mr-2"
                onClick={() => {
                  deleteBlogAsyncCalled({ id: blogPostsData.id , navigate });
                }}
              >
                Delete
              </Button>
              </>
      }
    </div>
 }
    </>
  );
};
const mapStateToProps = ({ BlogSlice = {}  , UserAuth = {}}) => {
  const blogPostsLoading = _.get(BlogSlice, "singleBlogLoading", false);
  const blogPostsData = _.get(BlogSlice, "singleBlog", undefined);
  const blogPostFailure = _.get(BlogSlice, "singleBlogError", undefined);
  const userDetails = _.get(UserAuth , "userInfo" , undefined);
  const deleteBlogLoading = _.get(BlogSlice, "deleteBlogLoading", false);
  const deleteBlogError = _.get(BlogSlice, "deleteBlogError", undefined);
  const getAllComments = _.get(BlogSlice , "getAllComments" , undefined);
  const getAllCommentsLoading = _.get(BlogSlice , "getAllCommentLoading" , false);
  const addCommentLoading = _.get(BlogSlice , "addCommentLoading" , false);
  

  return {
  blogPostsLoading,
  blogPostsData,
  blogPostFailure,
  userDetails,
  deleteBlogLoading,
  deleteBlogError,
  getAllComments,
  getAllCommentsLoading,
  addCommentLoading,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchSingleBlogPostAsync: (data) => dispatch({ type: "fetchSingleBlogPostSagaCalled"  , payload : data}),
  deleteBlogAsyncCalled: (data) =>
    dispatch({ type: "deleteBlogPostSagaCalled", payload: data }),
    addCommentAsync : (data)=> dispatch({type : "addCommentSagaCalled" , payload : data}),
    fetchAllCommentAsync : (data)=>dispatch({type : "getAllCommentSagaCalled" , payload : data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
