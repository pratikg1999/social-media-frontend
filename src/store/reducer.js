import * as actionTypes from "./actions"

const initialState = {
    isLoading: true,
    showSnackbar: false,
    snackbarMessage: "",
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.MODIFY_STATE:
            return {...state, ...action.newState};
        case actionTypes.CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
}

export default reducer;