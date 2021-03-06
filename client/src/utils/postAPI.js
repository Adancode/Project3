import axios from "axios";

export default  {
    // get all the posts
    getPosts: function () {
        return axios.get("/api/posts");
    },

    savePost: function (postData) {
        return axios.post("/api/posts", postData)
    },

    likePost: function (id) {
        return axios.put("/api/posts", {post_id: id, action: "like"})
    },

    unlikePost: function (id) {
        return axios.put("/api/posts", {post_id: id, action: "unlike"})
    },

    commentPost: function (commentData) {
        return axios.post("/api/posts/comment", commentData)
    },
    // Gets the post with the given id
    getOnePost: function (id) {
        return axios.get("/api/posts/" + id);
    },

    editPost: function(id){
        return axios.put("/api/posts/" + id)
    },
    // Deletes the post with the given id (only if you made it)
    deletePost: function (id) {
        return axios.delete("/api/posts/" + id);
    },

    getPostId: function (id){
        return axios.get("/api/posts/author/" + id);
    },

    getSnippets: function(){
        return axios.get("/api/posts/types/snippets")
    }

    // deleteComment: function(id) {
    //     console.log("client side " + id);
    //     return axios.delete("/api/posts/comment/" + id);
    // }

};
