import React, { Component } from "react";
import Comment from "../../components/comment/comment";
import Post from "../../components/post/post";
import PostCard from "../../components/post-card/post-card";
import AddPost from "../../components/add-post/add-post";
import { connect } from "react-redux";
import axios from "../../axiosInstance";
import * as actions from "../../store/actions";
import { Box } from "@material-ui/core";

class Home extends Component {
    componentDidMount() {
        if (!this.props.postsData || this.props.postsData.length===0) {
            this.fetchPosts();
        }
    }

    fetchPosts = () => {
        axios.get("/post/fetchPosts").then(({ data }) => {
            this.props.modifyState({ postsData: data });
        }).catch(err => {
            if (err.response) {
                console.log("fError fetching posts!", err.response);
            }
            else {
                console.log("Error fetching posts! no response", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error fetching posts!" });

        });
    }

    addPost = (postData) => {
        axios.post("/post/createPost", postData).then(({ data }) => {
            this.fetchPosts();
        }).catch((err) => {
            if (err.response) {
                console.log("Error postin new posts", err.response);
            }
            else {
                console.log("Error postin new posts no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error postin new posts!" });

        });
    }

    onCommentDelete = (commentId, postId)=>{
        console.log("comment to delete", commentId);
        axios.delete(`/comment/${commentId}`).then(({ data }) => {
            console.log("delete comment", commentId, data);
            this.props.deleteComment(commentId, postId);
        }).catch((err) => {
            if (err.response) {
                console.log("Error deleting comment", err.response);
            }
            else {
                console.log("Error deleting comment no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error deleting comment!" });
        });
    }

    addComment = (newComment) => {
        axios.post("/comment/createComment", newComment, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}).then(({ data }) => {
            console.log("comment to add", data);
            this.props.addCommentToState(data);
            // this.fetchPosts();
        }).catch((err) => {
            if (err.response) {
                console.log("Error commenting", err.response);
            }
            else {
                console.log("Error commenting no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error commenting!" });

        });
    }

    
    changePostLike = (postId, status) => {
        const postData = {postId : postId};
        if(status){
            axios.put("/post/likes", postData).then(({ data }) => {
                this.props.updateLikes(postId, data);
                // this.fetchPosts();
            }).catch((err) => {
                if (err.response) {
                    console.log("Error liking", err.response);
                }
                else {
                    console.log("Error liking no response ", err);
                }
                this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error liking!" });
                
            });
        }
        else{
            axios.delete("/post/likes", {data: postData}).then(({ data }) => {
                // this.fetchPosts();
                this.props.updateLikes(postId, data);
            }).catch((err) => {
                if (err.response) {
                    console.log("Error unliking", err.response);
                }
                else {
                    console.log("Error unliking no response ", err);
                }
                this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error unliking!" });
                
            });
            
        }
    }

    onDelete  = (postId) => {
        axios.delete(`/post/${postId}`).then(({ data }) => {
            console.log("delete post", postId, data);
            this.props.deletePost(postId);
        }).catch((err) => {
            if (err.response) {
                console.log("Error deleting", err.response);
            }
            else {
                console.log("Error deleting no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error deleting post!" });
        });
    }

    onEdit = (postId, postData) => {
        // console.log("onEdit", postData.body.value, postData.image.value);
        axios.put(`/post/${postId}`, postData).then(({ data }) => {
            console.log("edit post", postId, data);
            this.props.editPost(postId, data);
        }).catch((err) => {
            if (err.response) {
                console.log("Error editing", err.response);
            }
            else {
                console.log("Error editing no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Error editing post!" });
        });
    }
    
    render() {
        return (
            <>
                <div style={{ width: "70%", margin: "auto" }}>
                    <AddPost addPost={this.addPost} />
                </div>
                <br />
                <br />

                {/* <Post userName="Pratik Gupta" body="hello comment" creationTime={new Date()} userImage="logo192.png"/>
                <Comment userName="Pratik Gupta" body="hello comment" creationTime={new Date()} userImage="logo192.png" /> */}

                <div style={{ width: "70%", margin: "auto" }} className="px-1 py-2">
                    {this.props.postsData !== undefined &&
                        this.props.postsData.map(postData => {
                            return (
                                <React.Fragment key={postData.post._id}>
                                    <PostCard post={{...(postData.post)}} comments={[...(postData.comments)]} addComment={this.addComment} changePostLike={this.changePostLike} onDelete={this.onDelete} onEdit={this.onEdit} onCommentDelete={this.onCommentDelete}/>
                                    <br />
                                    <br />
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        currentUserInfo: state.currentUserInfo,
        showSnackbar: state.showSnackbar,
        snackbarMessage: state.snackbarMessage,
        postsData: state.postsData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modifyState: (newState) => dispatch({ type: actions.MODIFY_STATE, newState: newState }),
        addCommentToState: (comment) => dispatch({ type: actions.ADD_COMMENT, comment: comment }),
        updateLikes: (postId, likes) => dispatch({ type: actions.UPDATE_LIKES, postId: postId, likes: likes}),
        deletePost: (postId) => dispatch({ type: actions.DELETE_POST, postId: postId}),
        editPost: (postId, updatedPost) => dispatch({ type: actions.EDIT_POST, postId: postId, updatedPost: updatedPost}),
        deleteComment: (commentId, postId) => dispatch({ type: actions.DELETE_COMMENT, commentId: commentId, postId: postId}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);