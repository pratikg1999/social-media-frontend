import React, { useRef } from "react";
import { Button, Grid, TextField, Paper } from "@material-ui/core";
import { Image } from '@material-ui/icons';
import axios from "../../axiosInstance";

class EditPost extends React.Component {

    state = {
        profileImage: null,
    }

    componentDidMount(){
        if(this.props.post.image){
            this.setState({profileImage: axios.defaults.baseURL+this.props.post.image});
        }
    }

    submitForm = async (e) => {
        e.preventDefault();
        // console.log(e.target.body.value, e.target.image.value);
        if (e.target.body.value || e.target.image.value) {
            let formData = new FormData(e.target);
            if(!e.target.image.value){
                if(this.state.profileImage){
                    formData.set("image", new Blob([(await axios.get(this.state.profileImage, {responseType: 'blob',})).data]), "novhange.png" ) ;
                    console.log("kuchh mila");
                    console.log(formData.get("image"));
                }
            }
            console.log("edit form submit", e.target.body.value, e.target.image.value);
            this.props.onEdit(this.props.post._id, formData);
        }
        window.$(`#modal${this.props.post._id}`).modal('hide')
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
                    <Grid container className="p-3">
                        <Grid item xs={12}>
                        <TextField defaultValue={this.props.post.body} fullWidth name="body" placeholder="Add post" multiline variant="outlined" inputProps={{style:{height: "auto"}}} />
                        </Grid>
                        {this.state.profileImage !== null &&
                            <Grid item xs={12} className="py-1">
                                <img id="profileImageSrc" src={this.state.profileImage} alt="Post image" style={{ objectFit: "contain", width:"100%", padding:"2px", maxHeight:"50vh"}} />
                            </Grid>
                        }

                        <Grid item xs={12}>
                            <input name="image" accept="image/*" className="d-none" id={`inputimg_${this.props.post._id}`} type="file" onChange={this.handleInputImage} />
                            <label htmlFor={`inputimg_${this.props.post._id}`}>
                                <Button aria-label="upload picture" component="span" startIcon={<Image/>}>Add Image</Button>
                            </label>
                            {this.state.profileImage!==null &&
                                <Button onClick={(e)=>{document.getElementById(`inputimg_${this.props.post._id}`).value=""; this.setState({profileImage: null});}}>Remove Image</Button>
                            }
                            <div style={{ marginLeft: "auto" }}>
                                <Button color="primary" type="submit">Save Changes</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default EditPost;