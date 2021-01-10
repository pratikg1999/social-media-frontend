import Post from "../post/post";
import Comment from "../comment/comment";
import React, { useRef } from "react";
import { Button, Grid, TextField, Card, CardHeader, CardContent, CardActions, Avatar } from "@material-ui/core";
import axios from "../../axiosInstance"

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

    return (
        <Card className="py-2">

            <CardHeader

                avatar={<Avatar className="bg-danger" alt={props.post.createdBy.firstName[0].toUpperCase() + props.post.createdBy.lastName[0].toUpperCase()} src={axios.defaults.baseURL + props.post.createdBy.profileImage} />}
                title={props.post.createdBy.firstName + " " + props.post.createdBy.lastName}
                subheader={props.post.creationTime ? new Date(props.post.creationTime).toDateString() : ""}

            />
            <hr className="m-0" />
            <Post {...props.post} />

            <CardActions>
                <form onSubmit={submitCommentForm}>
                    <Grid item xs={12} container justify="space-between">
                        <Grid item xs={11}>
                            <TextField required fullWidth inputRef={addCommentRef} name="body" placeholder="Add comment" multiline variant="outlined" />
                        </Grid>
                        <Grid item xs={1}>
                            <Button type="submit">Post</Button>
                        </Grid>
                    </Grid>
                </form>
            </CardActions>


            <CardContent>
                <Grid item xs={12}>
                    {props.comments.map(comment => {
                        console.log(comment);
                        return (<Comment {...comment} key={comment.username + comment.creationTime} />);
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PostCard;