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
        if (!this.props.postsData) {
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

    addComment = (newComment) => {
        axios.post("/comment/createComment", newComment, {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}}).then(({ data }) => {
            this.fetchPosts();
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

    render() {
        const post = {
            userName: "Pratik Gupta",
            body: "hello comment",
            creationTime: new Date(),
            userImage: "logo192.png"
        }
        const comments = [
            {
                userName: "Pratik Gupta",
                body: "hello comment",
                creationTime: new Date(Date.now() - 65465456),
                userImage: "logo192.png"
            },
            {
                userName: "Pranay Gupta",
                body: "tempdfkjldkj comment",
                creationTime: new Date(),
                userImage: "logo192.png"
            }
        ]
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
                                    <PostCard post={postData.post} comments={postData.comments} addComment={this.addComment} />
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);