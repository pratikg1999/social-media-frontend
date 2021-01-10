import React from "react";
import { Container, Grid, Typography, CardContent, CardMedia } from "@material-ui/core";
import classes from "./post.module.css";
import axios from "../../axiosInstance"
const Post = (props) => {
    return (

        <>
            {props.image != undefined &&
                <CardMedia>
                    <img className={classes.postImage} src={axios.defaults.baseURL + props.image} />
                </CardMedia>
            }
            {props.body != undefined &&
                <CardContent>
                    <div className={classes.postBody}>{props.body}</div>
                </CardContent>
            }


        </>



    );
}

export default Post;