import * as actionTypes from "./actions"

const initialState = {
    isLoading: true,
    showSnackbar: false,
    snackbarMessage: "",
    postsData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MODIFY_STATE:
            return { ...state, ...action.newState };
        case actionTypes.CLEAR_STATE:
            return initialState;
        case actionTypes.ADD_COMMENT:
            state.postsData.find(e => e.post._id === action.comment.post).comments.unshift(action.comment);
            return { ...state, postsData: [...state.postsData] }
        case actionTypes.UPDATE_LIKES:
            state.postsData.find(e=>e.post._id === action.postId).post.likes = action.likes;
            return { ...state, postsData: [...state.postsData] }
        case actionTypes.DELETE_POST:
            state.postsData.splice(state.postsData.findIndex(e=>e.post._id === action.postId),1);
            return { ...state, postsData: [...state.postsData] }
        case actionTypes.EDIT_POST:
            state.postsData.find(e=>e.post._id === action.postId).post = action.updatedPost;
            return { ...state, postsData: [...state.postsData] }
        case actionTypes.DELETE_COMMENT:
            let post = state.postsData.find(e=>e.post._id === action.postId);
            post.comments.splice(post.comments.findIndex(e=>e._id === action.commentId),1);
            return { ...state, postsData: [...state.postsData] }
        default:
            return state;
    }
}

export default reducer;