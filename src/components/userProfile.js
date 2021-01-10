import React, { Component } from "react";
import { Grid, Button, Avatar, Container, Typography, } from "@material-ui/core";
import { PhotoCamera, RssFeed as FollowIcon } from "@material-ui/icons"
import { connect } from "react-redux";

import axios from "../axiosInstance"

class UserProfile extends Component {

    render() {
        return (
            <Container className="py-3">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <Avatar alt={this.props.info.firstName[0].toUpperCase() + this.props.info.lastName[0].toUpperCase()}
                            src={this.props.info.profileImage}
                            style={{ width: "8em", height: "8em" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="subtitle1">{this.props.info.firstName + " " + this.props.info.lastName}</Typography>
                        <Typography variant="subtitle2">{this.props.info.email}</Typography>
                    </Grid>

                    {this.props.currentUserInfo && this.props.info._id !== this.props.currentUserInfo._id &&
                        <Grid item sm={12} sm={4}>
                            {
                            this.props.info.isFollowing ?
                                <Button variant="outlined" startIcon={<FollowIcon />} onClick={()=>this.props.onUnfollow(this.props.info._id)}>UnFollow</Button>
                                : <Button variant="outlined" startIcon={<FollowIcon />} onClick={()=>this.props.onFollow(this.props.info._id)}>Follow</Button>
                            }
                        </Grid>
                    }
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" >Following {this.props.info.followings ? this.props.info.followings.length : 0}</Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="outlined" >Followers {this.props.info.followers ? this.props.info.followers.length : 0}</Button>
                    </Grid>
                </Grid>

            </Container >
        );
    }
}
const mapStateToProps = state => {
    return {
        currentUserInfo: state.currentUserInfo,
        isLoading: state.isLoading,
    };
}
export default connect(mapStateToProps)(UserProfile);


