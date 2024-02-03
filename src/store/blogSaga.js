import axios from "axios";
import { put , call } from "redux-saga/effects";
import {
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
} from "./blogRedux";
import { getAccessToken } from "../utilities/utility";

let API_URL = "http://localhost:3002/api";

export function* getAllBlogPost({ payload }) {
  try {
    yield put(allBlogPostStart());
    const result = yield axios.get(`${API_URL}/blog-posts`);
    console.log('result->' , result)
    yield put(allBlogPostSuccess(result.data))
  } catch (err) {
  
    let error = err.response.data.message
    ? err.response.data.message
    : err.response.data.errorCode;
    yield put(allBlogPostFailure(error));
  }
}


export function* getSingleBlogPost({payload}){
    try {
        console.log('calle' , payload)
        yield put(singleBlogPostStart());
        let token = yield getAccessToken()
        console.log('token' , token)
        const result = yield axios.get(`${API_URL}/blog-posts/${payload.id}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          
    })
       
        yield put(singleBlogPostSuccess(result.data))
      } catch (err) {
     
        let error =err.response.data.message
        ? err.response.data.message
        : err.response.data.errorCode;
        yield put(singleBlogPostFailure(error));
      }   
}

export function* addBlogPostSaga({payload}){
    try{
        yield put(addBlogPostStart())
        console.log('payload->' , payload)
        const formData = new FormData()
        formData.append("title" , payload.title)
        formData.append("description" , payload.description);
        if(payload.image){
        formData.append("bannerImage" , payload.image);
        }
        let token = yield getAccessToken()
        const result = yield axios.post(
            `${API_URL}/blog-posts`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              },
            }
          );
        yield put(addBlogPostSuccess(result.data))
        payload.navigate('/')

    }catch(err){
        let error = err.response.data.message
        ? err.response.data.message
        : err.response.data.errorCode;
        yield put(addBlogPostFailure(error))
    }
}

export function* editBlogPostSaga({payload}){
    try{
        yield put(editBlogPostStart())
        let token = yield getAccessToken()
        const formData = new FormData()
        formData.append("title" , payload.title)
        formData.append("description" , payload.description);
        if(payload.image !== ""){
        formData.append("bannerImage" , payload.image);
        }
        const result = yield axios.patch(
            `${API_URL}/blog-posts/${payload.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization" : `Bearer ${token}`
              },
            }
          );
        yield put(editBlogPostSuccess(result.data))
        payload.navigate('/')
    }catch(err){
        let error =err.response.data.message
        ? err.response.data.message
        : err.response.data.errorCode;
        yield put(editBlogPostFailure(error))
    }
}

export function* deleteBlogPostSaga({payload}){
    try{
    yield put(deleteBlogPostStart())
    let token = yield getAccessToken()
    const result = yield axios.delete(
        `${API_URL}/blog-posts/${payload.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`

          },
        }
      );
      yield put(deleteBlogPostSuccess(result.data))
      payload.navigate('/')
    }catch(err){
        let error = err.response.data.message
        ? err.response.data.message
        : err.response.data.errorCode;
        yield put(deleteBlogPostFailure(error))
    }
}

export function* commentUser({payload}){
    try{
        yield put(addCommentStart())
        const token = yield getAccessToken()
        const result = yield axios.post(
            `${API_URL}/blog-posts/postcomment`,
            {...payload},
            {
              headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
              },
            }
          );
          yield put(addCommentSuccess(result.data))
          yield call(getAllCommentsSaga, { payload: {id : result.data.blogPostId} });

    }catch(err){
        let error = err.response.data.message
        ? err.response.data.message
        : err.response.data.errorCode;
        yield put(addCommentFailure(error))
    }
}

export function* getAllCommentsSaga({ payload }) {
    try {
        console.log('payload ->' , payload)
      yield put(getAllCommentStart());
      const result = yield axios.get(`${API_URL}/blog-posts/comments/${payload.id}`);
      console.log('result->' , result)
      yield put(getAllCommentSuccess(result.data))
    } catch (err) {
    
      let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.errorCode;
      yield put(getAllCommentFailure(error));
    }
  }