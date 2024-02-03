import { all,  takeLatest } from "redux-saga/effects";
import {
 userSignUpSaga,
 userLoginSaga,
} from "./userSaga";

import {
  getAllBlogPost,
  getSingleBlogPost,
  addBlogPostSaga,
  editBlogPostSaga,
  deleteBlogPostSaga,
  getAllCommentsSaga,
  commentUser,

} from './blogSaga'

export default function* root() {
  yield all([
    takeLatest("signUpUserSagaCalled", userSignUpSaga),
    takeLatest("loginUserSagaCalled" , userLoginSaga),
    takeLatest("fetchAllBlogPostSagaCalled" , getAllBlogPost),
    takeLatest("fetchSingleBlogPostSagaCalled" , getSingleBlogPost),
    takeLatest("addBlogPostSagaCalled" , addBlogPostSaga),
    takeLatest("editBlogPostSagaCalled" , editBlogPostSaga),
    takeLatest("deleteBlogPostSagaCalled" , deleteBlogPostSaga),
    takeLatest("getAllCommentSagaCalled" , getAllCommentsSaga),
    takeLatest("addCommentSagaCalled" , commentUser),
   
  ]);
}
