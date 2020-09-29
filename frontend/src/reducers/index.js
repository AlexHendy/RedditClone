import {
    RECIEVE_CATEGORIES,
    RECIEVE_POSTS,
    RECIEVE_POST,
    RECIEVE_COMMENTS_FOR_ID,
    RECIEVE_COMMENT
} from '../actions'
//import { combineReducers } from 'redux'

const initialState = {
    categories: [],
    postList: [],
    comments: []
}


function rootReducer (state = initialState, action){
    switch(action.type) {
        case RECIEVE_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case RECIEVE_POSTS:
            return {
                ...state,
                postList: action.payload
            }
        case RECIEVE_POST:
            let newPost = action.payload

            return {
                ...state,
                postList: state.postList.filter(post => post.id !== action.payload.id).concat(newPost)
            }
        case RECIEVE_COMMENTS_FOR_ID:
            return {
                ...state,
                comments: action.payload
            }
        case RECIEVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(post => post.id !== action.payload.id).concat(action.payload)
            }
        default:
            return state
    }
}

export default rootReducer