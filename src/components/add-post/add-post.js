import React, { useRef } from "react";
import { Button, Grid, TextField, Paper, Typography, IconButton } from "@material-ui/core";
import { Image } from '@material-ui/icons';

class AddPost extends React.Component {

    state = {
        profileImage: null,
    }

    submitForm = (e) => {
        e.preventDefault();
        // console.log(e.target.body.value, e.target.image.value);
        if (e.target.body.value || e.target.image.value) {
            this.props.addPost(new FormData(e.target));
        }
    }

    handleInputImage = (evt) => {
        const file = evt.target.files[0];
        const fr = new FileReader();
        fr.readAsDataURL(file)
        fr.onload = () => this.setState({ profileImage: fr.result });

    }
    render() {
        return (
            <Paper>
                <form onSubmit={this.submitForm}>
                    <Grid container className="p-3 mt-3">
                        <Grid item xs={12}>
                            <Typography variant="h6">Have something in mind?</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="body" placeholder="Add post" multiline variant="outlined" />
                        </Grid>
                        {this.state.profileImage !== null &&
                            <Grid item xs={12} className="py-1">
                                <img id="profileImageSrc" src={this.state.profileImage} alt="Post image" style={{ objectFit: "contain", width:"100%", padding:"2px" }} />
                            </Grid>
                        }

                        <Grid item xs={12}>
                            <input name="image" accept="image/*" className="d-none" id="postImageInput" type="file" onChange={this.handleInputImage} />
                            <label htmlFor="postImageInput">
                                <Button aria-label="upload picture" component="span" startIcon={<Image/>}>Add Image</Button>
                            </label>
                            {this.state.profileImage!==null &&
                                <Button onClick={(e)=>{document.getElementById("postImageInput").value=""; this.setState({profileImage: null});}}>Remove Image</Button>
                            }
                            <div style={{ marginLeft: "auto" }}>
                                <Button color="primary" type="submit">Post</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default AddPost;