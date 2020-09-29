import * as PostAPI from '../utils/PostAPI.js'

export const RECIEVE_CATEGORIES = 'RECIEVE_CATEGORIES'
export const RECIEVE_POSTS = 'RECIEVE_POSTS'
export const RECIEVE_POST = 'RECIEVE_POST'
export const RECIEVE_COMMENTS_FOR_ID = 'RECIEVE_COMMENTS_FOR_ID'
export const RECIEVE_COMMENT = 'RECIEVE_COMMENT'

// Categories
export function fetchCategories() {
    return dispatch => {
        PostAPI.getCategories().then(categories => {
            dispatch({
                type: RECIEVE_CATEGORIES,
                payload: categories
            })
        })
    }
}


// Posts
export function fetchPosts() {
    return dispatch => {
        PostAPI.getAllPosts().then(posts => {
            dispatch({
                type: RECIEVE_POSTS,
                payload: posts
            })
        })
    }
}

export function fetchPost(Id) {
    return dispatch => {
        PostAPI.getPost(Id).then(post => {
            dispatch({
                type: RECIEVE_POST,
                payload: post
            })
        })
    }
}

export function votePost(postId, option) {
    return dispatch => {
        PostAPI.votePost(postId, option).then(post =>
            dispatch({
                type: RECIEVE_POST,
                payload: post
            })
        )
    }
}

export function createPost(post) {
    return dispatch => {
        PostAPI.createPost(post).then(post =>
            dispatch({
                type: RECIEVE_POST,
                payload: post
            })
        )
    }
}

export function editPost(post) {
    return dispatch => {
        PostAPI.editPost(post).then(post =>
            dispatch({
                type: RECIEVE_POST,
                payload: post
            })
        )
    }
}

export function deletePost(postId) {
    return dispatch => {
        PostAPI.deletePost(postId).then(post =>
            dispatch({
                type: RECIEVE_POST,
                payload: post
            })
        )
    }
}

// Comments
export function fetchCommentsForId(Id) {
    return dispatch => {
        PostAPI.getCommentsForId(Id).then(comments => {
            dispatch({
                type: RECIEVE_COMMENTS_FOR_ID,
                payload: comments
            })
        })
    }
}

export function voteComment(commentId, option) {
    return dispatch => {
        PostAPI.voteComment(commentId, option).then(comment =>
            dispatch({
                type: RECIEVE_COMMENT,
                payload: comment
            })
        )
    }
}

export function createComment(comment) {
    return dispatch => {
        PostAPI.createComment(comment).then(comment =>
            dispatch({
                type: RECIEVE_COMMENT,
                payload: comment
            }),
            dispatch(fetchPost(comment.parentId))
        )
    }
}

export function editComment(comment) {
    return dispatch => {
        PostAPI.editComment(comment).then(comment =>
            dispatch({
                type: RECIEVE_COMMENT,
                payload: comment
            }),
            dispatch(fetchPost(comment.parentId))
        )
    }
}

export function deleteComment(comment) {
    return dispatch => {
        PostAPI.deleteComment(comment.id).then(comment =>
            dispatch(fetchPost(comment.parentId))
        )
    }
}









