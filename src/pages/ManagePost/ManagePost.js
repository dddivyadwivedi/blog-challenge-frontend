import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField/InputField";
import NavBar from "../../components/Navbar/Navbar";
import Button from "react-bootstrap/Button";
import "./ManagePostStyle.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import Spin from "../../components/Spinner/Spinner";
import { clearUserRedux } from "../../store/userRedux";
import { useNavigate } from "react-router-dom";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ManagePost({
  editBlogLoading,
  editBlogError,
  addBlogLoading,
  addBlogError,
  addBlogAsyncCalled,
  editBlogAsyncCalled,

}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [editData, setEditData] = useState();

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    if (location && location.state && location.state.blogPostsData) {
      console.log("location.state.blogPostsData", location.state.blogPostsData);
      setEditData(location.state.blogPostsData);
      
    }
  }, [location]);

  useEffect(() => {
    if (editData) {
      setInitialValues({
        title: editData.title || "",
        description: editData.description || "",
        image: "",
      });
    }
  }, [editData]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title of post is required"),
    description: Yup.string().required("Description is required"),
    image: editData !== undefined
    ?Yup.string() 
    : Yup.string().required("Image is required"),
  });

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log('file' , file)
    setInitialValues(prevValues => ({
      ...prevValues,
      image: file,
    }));
  };

  useEffect(() => {
    console.log('FORMIK VALUES -> ',initialValues)
  },[initialValues])

  const onSubmit = (values, ) => {
   console.log('values' , values)
   if(editData){
    editBlogAsyncCalled({...values , navigate , id : editData.id})
   }else{
    addBlogAsyncCalled({...values , navigate});
   }
  };

  const extractFileName = (url) => {
    const filename = url.split("/").pop();
    return filename;
  };
  return (
    <>
      {(editBlogLoading || addBlogLoading ) && <Spin />}
      <NavBar />
      <div id="managepost">
        <h3 className="header">Manage Post</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          <Form className="signup-form">
          {editData !== undefined && editData.blogImageLink !== undefined && (
              <div className="showCurrentImage">
                {" "}
                Current File Name : {extractFileName(editData.blogImageLink)}
                {/* <FontAwesomeIcon icon={faTimes} /> */}
              </div>
            )}
            <InputField label="Image" name="image" type="file"  onChange={handleChange}  value={initialValues.image !== "" ? initialValues.name :  "" }/>
            <InputField label="Title" name="title" />
            
            <InputField
              label="Description"
              name="description"
              as="textarea"
              rows="4"
              cols="50"
            />



            <Button variant="primary" type="submit">
              Save
            </Button>
           
          </Form>
        </Formik>
      </div>
    </>
  );
}
const mapStateToProps = ({ BlogSlice = {} }) => {
  const editBlogLoading = _.get(BlogSlice, "editBlogLoading", false);
  const editBlogError = _.get(BlogSlice, "editBlogError", false);
  const addBlogLoading = _.get(BlogSlice, "addBlogLoading", false);
  const addBlogError = _.get(BlogSlice, "addBlogError", undefined);
  

  return {
    editBlogLoading,
    editBlogError,
    addBlogLoading,
    addBlogError,
  
  };
};
const mapDispatchToProps = (dispatch) => ({
  editBlogAsyncCalled: (data) =>
    dispatch({ type: "editBlogPostSagaCalled", payload: data }),
  addBlogAsyncCalled: (data) =>
    dispatch({ type: "addBlogPostSagaCalled", payload: data }),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);
