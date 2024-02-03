import React from 'react';
import BlogCard from "../../components/BlogCard/BlogCard";
import NavBar from "../../components/Navbar/Navbar";
import "./HomePageStyle.css";
import { connect } from "react-redux";
import * as _ from "lodash";
import { useEffect } from "react";
import Spin from "../../components/Spinner/Spinner";

const HomePage = ({
  allBlogPostsLoading,
  allBlogPostsData,
  allBlogPostFailure,
  fetchAllBlogPostAsync,
}) => {
  useEffect(() => {
    fetchAllBlogPostAsync();
  }, []);

  return (
    <>
      <NavBar />
      <h3 className="header">Home</h3>
      <div id="home">
        {allBlogPostsLoading && <Spin />}
        {allBlogPostsData !== undefined &&
          allBlogPostsData.length > 0 &&
          allBlogPostsData.map((item) => <BlogCard postData={item} key={item.id} />)}
      </div>
      ;
    </>
  );
};

const mapStateToProps = ({ BlogSlice = {} }) => {
  const allBlogPostsLoading = _.get(BlogSlice, "getAllBlogLoading", false);
  const allBlogPostsData = _.get(BlogSlice, "blogPosts", undefined);
  const allBlogPostFailure = _.get(BlogSlice, "getAllBlogError", undefined);

  return {
    allBlogPostsLoading,
    allBlogPostsData,
    allBlogPostFailure,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchAllBlogPostAsync: () => dispatch({ type: "fetchAllBlogPostSagaCalled" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
