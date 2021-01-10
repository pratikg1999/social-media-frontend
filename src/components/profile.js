import React, { Component } from "react";
import { Grid, Input, TextField, Button, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons"
import axios from "../axiosInstance"
class Profile extends Component {

    state = {
        profileImage: "logo192.png",
    }

    componentDidMount() {
        //this.updateFormFeilds();

        console.log("profile ", this.props);
        if (this.props.info.profileImage) {
            this.setState({ profileImage: this.props.info.profileImage });
        }
    }


    handleInputImage = (evt) => {
        const file = evt.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(file)
        fr.onload = () => this.setState({ profileImage: fr.result });

    }


    updateFormFeilds() {
        //Manually update TextFeilds as updatings state Here might cause infinite loop
        for (const key in this.props.info) {
            if (Object.hasOwnProperty.call(this.props.info, key)) {
                const element = this.props.info[key];
                if (document.getElementsByName(key).length > 0 && key !== "profileImage") {
                    document.getElementsByName(key)[0].value = element;
                }
            }
        }
        if (this.props.info && this.props.info.profileImage) {
            document.getElementById("profileImageSrc").src = this.props.info.profileImage;
        }
    }

    componentDidUpdate() {
        //this.updateFormFeilds();
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.handleUpdateProfile(new FormData(e.target));
    }

    render() {
        return (
            <div>
                <div className="col-sm-12 col-lg-10 col m-auto">
                    <form onSubmit={this.onSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <img id="profileImageSrc" src={this.state.profileImage} width="200px" height="300px" alt="Profile pic" style={{ objectFit: "contain" }} />
                                {this.props.editable &&
                                    <div className="text-center">
                                        <input name="profileImage" accept="image/*" className="d-none" id="icon-button-file" type="file" onChange={this.handleInputImage} />
                                        <label htmlFor="icon-button-file">
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                    </div>
                                }

                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField defaultValue={this.props.info.firstName} required name="firstName" disabled={!this.props.editable} fullWidth placeholder="First Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField defaultValue={this.props.info.lastName} required name="lastName" disabled={!this.props.editable} fullWidth label="Last Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField defaultValue={this.props.info.email} required name="email" disabled type="email" fullWidth label="Email" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField defaultValue={this.props.info.phone} required name="phone" disabled={!this.props.editable} type="tel" fullWidth label="Phone" variant="outlined" />
                            </Grid>
                            {this.props.editable &&
                                <Grid item xs={12} className="text-center">
                                    <Button type="submit" variant="contained" color="primary" >Save changes</Button>
                                </Grid>
                            }
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }
}

export default Profile;