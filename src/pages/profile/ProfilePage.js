import React, { Component } from "react";
import Profile from "../../components/profile";
import { connect } from "react-redux";
import axios from "../../axiosInstance";
import * as actions from "../../store/actions";
class ProfilePage extends Component {

    state = {
        info: {},
    }

    componentDidMount() {
        let { userId } = this.props.match.params;
        console.log("profpage mounted ", this.props.currentUserInfo);

        if (userId) {
            this.props.modifyState({ isLoading: true });

            axios.get(`/user/getInfo/${userId}`).then(response => {
                response.data.profileImage = axios.defaults.baseURL + response.data.profileImage;
                this.setState({ info: response.data })
                this.props.modifyState({ isLoading: false });
            }).catch((err) => {
                console.log(err);
                this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "can't get userInfo" });
            });
        }
        else {
            this.setState({ info: this.props.currentUserInfo });
        }
    }
    updateProfile = (formData) => {
        this.props.modifyState({ isLoading: true });
        axios.post(`/user/updateInfo`, formData, { 'Content-Type': 'multipart/form-data' }).then(response => {
            response.data.profileImage = axios.defaults.baseURL + response.data.profileImage;
            this.props.modifyState({ currentUserInfo: response.data, isLoading: false, showSnackbar: true, snackbarMessage: "Information updated successfully." });
        }).catch(err => {
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Can't update your information. Try again later." })
        })
    }


    render() {
        const info = this.props.match.params.userId ? { ...this.state.info } : { ...this.props.currentUserInfo };
        return (
            <>
                { Object.keys(info).length > 0 && !this.props.isLoading ?
                    <Profile editable={this.props.match.params.userId ? false : true} info={info} handleUpdateProfile={this.updateProfile} modifyState={this.props.modifyState} />
                    : null
                }
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentUserInfo: state.currentUserInfo,
        isLoading: state.isLoading,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        modifyState: (newState) => dispatch({ type: actions.MODIFY_STATE, newState: newState }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);