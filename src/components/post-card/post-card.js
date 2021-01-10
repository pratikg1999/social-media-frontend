import Post from "../post/post";
import Comment from "../comment/comment";
import React, { useRef } from "react";
import { withRouter } from "react-router-dom";
import { Button, Grid, TextField, Card, CardHeader, CardContent, CardActions, Avatar, IconButton } from "@material-ui/core";
import { Favorite, Send } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "../../axiosInstance"
import { AvatarGroup } from '@material-ui/lab';

const PostCard = (props) => {

    const addCommentRef = useRef(null);

    const submitCommentForm = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append("post", props.post._id);
        // let comment = {
        //     body: e.target.body.value,
        // }
        // comment["post"] = props.post._id;
        // console.log("new comment ", comment)
        props.addComment(formData);
    }

    const isLiked = (props.currentUserInfo && props.post.likes.map(e => e._id).includes(props.currentUserInfo._id));
    console.log(props.post._id, isLiked, props.post.likes.map(e => e._id));

    return (
        <Card className="py-2">

            <CardHeader

                avatar={<Avatar className="bg-danger" alt={props.post.createdBy.firstName[0].toUpperCase() + props.post.createdBy.lastName[0].toUpperCase()} src={axios.defaults.baseURL + props.post.createdBy.profileImage} />}
                title={<span onClick={() => { props.history.push(`/profile/${props.post.createdBy._id}`) }} style={{ cursor: "pointer" }}>{props.post.createdBy.firstName + " " + props.post.createdBy.lastName}</span>}
                subheader={props.post.creationTime ? new Date(props.post.creationTime).toDateString() : ""}

            />
            <hr className="m-0" />
            <Post {...props.post} />
            {props.post.likes.length > 0 &&
                <div className="px-3" style={{fontSize: "small", color: "grey"}}>
                    <div className="d-table-row">
                        <span className="d-table-cell pr-1" style={{ verticalAlign: "middle" }}>Liked by</span>
                        <AvatarGroup max={5}>
                            {props.post.likes.slice(0, 3).map(user => {
                                return (
                                    // <Avatar src="good" alt="temp"/>
                                    // <span>{console.log("inside")}</span>
                                    <Avatar key={user._id} alt={user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()} src={axios.defaults.baseURL + user.profileImage} style={{width:"23px", height:"23px"}}/>
                                );
                            })}
                        </AvatarGroup>
                        {props.post.likes.length - 3 > 0 &&
                            <span className="d-table-cell pl-1" style={{ verticalAlign: "middle" }}>and {props.post.likes.length - 3} others</span>
                        }
                    </div>
                </div>
            }
            <CardActions className="pt-0">
                <div>
                    <IconButton aria-label="add to favorites" style={isLiked ? { color: "red" } : {}} onClick={() => props.changePostLike(props.post._id, !isLiked)}>
                        <Favorite />
                    </IconButton>
                    {/* <div className="m-auto">{props.post.likes.length + " likes"}</div> */}
                </div>
                <form onSubmit={submitCommentForm} className="w-100">
                    <Grid item xs={12} container justify="space-between" alignItems="center">
                        <Grid item style={{ flexGrow: 10 }}>
                            <TextField required fullWidth inputRef={addCommentRef} name="body" placeholder="Add comment" multiline variant="outlined" size="small" style={{ borderRadius: "25%" }} />
                        </Grid>
                        <Grid item>
                            <IconButton type="submit"><Avatar className="bg-primary"><Send /></Avatar></IconButton>
                        </Grid>
                    </Grid>
                </form>
            </CardActions>


            {props.comments.length > 0 &&
                <CardContent>
                    <Grid item xs={12}>
                        {props.comments.map(comment => {
                            // console.log(comment);
                            return (<Comment {...comment} key={comment.username + comment.creationTime} />);
                        })}
                    </Grid>
                </CardContent>
            }
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        currentUserInfo: state.currentUserInfo,
    };
}

export default withRouter(connect(mapStateToProps)(PostCard));