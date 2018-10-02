import React from "react";
import "./PostFooter.css";
import PostAPI from "../../../utils/postAPI";
import savedAPI from "../../../utils/savedAPI";

class PostFooter extends React.Component {

  state = {
    numLikes: this.props.numLikes,
    comments: this.props.comments || [],
    saves: this.props.saves,
    isLiked: this.props.isLiked || false
  };


  handleLike = id => {
    PostAPI.likePost(id).then(data => {
      this.setState({
        numLikes: this.state.numLikes + 1,
        isLiked: true
      });
    });
  };

  handleUnlike = id => {
    PostAPI.unlikePost(id).then(data => {
      this.setState({
        numLikes: this.state.numLikes - 1,
        isLiked: false
      });
    });
  };

  handleComment = id => {
    const comment = prompt("Add a comment:");
    PostAPI.commentPost({
      post_id: id,
      comment: comment
    }).then(data => {
      console.log(data.data.comments);
      this.setState({
        comments: data.data.comments || []
      });
    }).catch(err => {
      console.log(err);
    });
  };


  handleDelete = (id) => {
    console.log(id);
    PostAPI.deleteComment(id).then(data => {
      if (data.data.success) {
        window.location.reload();
      } else {
        console.log(data.data);
      };
    }).catch(err => {
      console.log(err);
    });
  };


  displayComments = () => {
    return this.state.comments.map(comment => {
      return (

        <li key={comment._id}>
          <button
            className="comment-x btn btn-sm btn-light mr-2 align-middle"
            onClick={() => this.handleDelete(comment._id)}
          >X
          </button>
          <a href={"/profile/" + comment.author._id}>
            {comment.author.firstName || comment.firstName}
          </a>: {comment.text}

        </li>
      );
    });
  };

  saveSnippet = id => {
    savedAPI.saveSnippet(id).then(data => {
      console.log(data);
    })
  };

  renderLikeButton = () => {
    if (this.state.isLiked) {
      return (
        <button
          onClick={() => this.handleUnlike(this.props.id)}
          type="button" className="post-btn like-btn btn btn-danger btn-sm"
        ><span className="fa fa-thumbs-o-down"></span> Unlike ({this.state.numLikes})</button>
      );
    } else {
      return (
        <button
          onClick={() => this.handleLike(this.props.id)}
          type="button" className="post-btn like-btn btn btn-secondary btn-sm"
        ><span className="fa fa-thumbs-o-up"></span> Like ({this.state.numLikes})</button>
      );
    }
  }

  render() {
    return (
      <div className="footer">
        <div>
          <button onClick={() => this.handleComment(this.props.id)} type="button" className="post-btn comment-btn btn btn-secondary btn-sm"><span className="fa fa-thumbs-o-up"></span> Comment</button>
          {this.renderLikeButton()}
          <button onClick={() => this.saveSnippet(this.props.id)} type="button" className="post-btn snippet-btn btn btn-secondary btn-sm"><span></span> Save Snippet</button>

          <div className="row comment-row" style={{ margin: 10 }}>
            <div className="comments">
              {this.displayComments()}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default PostFooter;
