import React, { Component } from 'react';
import axios from "../../axiosInstance";
import { withStyles, withTheme } from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Link,
    Dialog,
    DialogContent,
    DialogContentText,
    Drawer,
    AppBar,
    Toolbar,
    MenuItem,
    Menu,
    IconButton,
    Backdrop,
    CircularProgress,
    Snackbar,
} from "@material-ui/core";
import { Dashboard as DashboardIcon, AccountCircle } from "@material-ui/icons";
import { Switch, Route } from "react-router-dom";
import ProfilePage from "../profile/ProfilePage";
import Home from "../home/home";
import * as actions from "../../store/actions";
import { connect } from "react-redux";


const styles = (theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }
};

class Dashboard extends Component {

    handleMenu = (event) => {
        // console.log("opening menu ", event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState((prevState, props) => {
            return { anchorEl: null };
        });
    }

    state = {
        anchorEl: null,
    }


    componentDidMount() {
        axios.defaults.headers['x-access-token'] = window.localStorage["x-access-token"];

        axios.get("/user/getCurrentUserInfo").then((response) => {
            console.log(response.data);
            response.data.profileImage = axios.defaults.baseURL + response.data.profileImage;
            this.props.modifyState({ isLoading: false, currentUserInfo: response.data, showSnackbar: true, snackbarMessage: "User  info fetched" });
        }).catch((err) => {
            if (err.response) {
                console.log("fetching user error", err.response);
            }
            else {
                console.log("fetch error no response ", err);
            }
            this.props.modifyState({ isLoading: false, showSnackbar: true, snackbarMessage: "Some error occured!" });
        })

    }

    render() {
        const classes = this.props.classes;
        return (
            <>
                {this.props.isLoading &&
                    <Backdrop className={classes.backdrop} open={this.props.isLoading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Social-media
                </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.anchorEl ? true : false}
                                onClose={this.handleMenuClose}
                            >
                                <MenuItem onClick={()=>{this.props.history.push("/profile"); this.handleMenuClose();}}>Profile</MenuItem>
                                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <div id="content">
                    <Switch>
                        <Route path="/home" exact component={Home} />
                        <Route path="/profile/:userId" component={ProfilePage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>
                </div>
                { this.props.showSnackbar &&
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.props.showSnackbar}
                        autoHideDuration={2000}
                        onClose={() => this.props.modifyState({ showSnackbar: false })}
                        message={this.props.snackbarMessage} />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        currentUserInfo: state.currentUserInfo,
        showSnackbar: state.showSnackbar,
        snackbarMessage: state.snackbarMessage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modifyState: (newState) => dispatch({ type: actions.MODIFY_STATE, newState: newState }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles, { withTheme: true })(Dashboard)));