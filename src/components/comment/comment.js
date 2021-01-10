import React, { Component } from "react";
import { Grid, Paper, Box, Typography } from "@material-ui/core";
import classes from "./comment.module.css";
const Comment = (props) => {
    return (
        <Grid container justify="space-around" className="text-left">
            <Grid item xs={2} className="text-center" mx={1}>
                {/* circular avatar of commenter */}
                <img src={props.userImage} width="50px" height="50px" style={{borderRadius: "50%"}}></img>
            </Grid>
            <Grid item xs={10}  mx={1} className="p-2">
                <div className={classes.title}>{props.userName}</div>
                <div><span className={classes.subtitle}>{props.creationTime.toString()}</span></div>
                <div className={props.commentBody}>{props.body}</div>
            </Grid>
        </Grid>
    );
}

export default Comment;