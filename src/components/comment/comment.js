import React, { Component } from "react";
import { Grid, Paper, Box, Typography, Avatar } from "@material-ui/core";
import classes from "./comment.module.css";
import axios from "../../axiosInstance";
const Comment = (props) => {
    return (
        <Grid container justify="space-between" className="text-left p-2" >
            <Grid item className={`text-center ${classes.avatarArea}`} mx={1} >
                {/* circular avatar of commenter */}
                <Avatar src={axios.defaults.baseURL + props.createdBy.profileImage} alt={`${props.createdBy.firstName[0].toUpperCase()}${props.createdBy.lastName[0].toUpperCase()}`}/>
            </Grid>
            <Grid item mx={1} style={{flexGrow: 2}}>
                <div className={classes.bodyArea}>
                    <div className={classes.title}>{`${props.createdBy.firstName} ${props.createdBy.lastName}`}</div>
                    <div className={classes.commentBody}>{props.body}</div>
                </div>
                <div style={{lineHeight: "2px"}} className="pl-2 pt-1"><span className={classes.subtitle}>{props.creationTime.toString()}</span></div>
            </Grid>
        </Grid>
    );
}

export default Comment;