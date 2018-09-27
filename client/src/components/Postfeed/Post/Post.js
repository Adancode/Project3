import React, { Component } from "react";
// import Card from "../Card/Card";
import Article from "./PostType/Article";
import Snippet from "./PostType/Snippet";
import Status from "./PostType/Status";
import PostHeader from "../PostHeader/PostHeader";
import "./Post.css";

//determines which post type is rendered based on data
//use Card component and pass props in to determine post type??
//FOR NOW: wrapping everything in temp div container and displaying several posts for visual purposes
//THIS SHOULD EVENTUALLY ONLY DISPLAY ONE POSTTYPE WITH POSTHEADER

class Post extends Component {
  render() {
    return (
      <div className="tempcontainer">
        <div className="card">
          <PostHeader />
          <Article />
        </div>
        <div className="card">
          <PostHeader />
          <Snippet />
        </div>
        <div className="card">
          <PostHeader />
          <Status />
        </div>
      </div>
    );
  }
}

export default Post;
