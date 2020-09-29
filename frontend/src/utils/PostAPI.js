const url = "http://localhost:3001"

const init = {
  headers: {
    'Authorization': 'udacity-readable'
  },
}

// Categories
export const getCategories = () => 
  fetch( `${url}/categories`, init,  )
    .then(res => res.json())
    .then(data => data.categories)


// Posts
export const getAllPosts = () =>
  fetch( `${url}/posts`, init )
    .then(res => res.json())

export const getPost = (postId) =>
  fetch( `${url}/posts/${postId}`, init )
  .then(res => res.json())

export const votePost = (postId, option) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
    }).then(res => res.json())

export const createPost = (post) =>
    fetch(`${url}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': 'udacity-readable',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: post.id, 
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      })
    }).then(res => res.json())

export const editPost = (post) =>
  fetch(`${url}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      title: post.title,
      body: post.body
    })
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
  

    
// Comments
export const getCommentsForId = (postId) =>
  fetch( `${url}/posts/${postId}/comments`, init )
  .then(res => res.json())

export const voteComment = (commentId, option) =>
  fetch(`${url}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
    }).then(res => res.json())

export const createComment = (comment) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id: comment.id, 
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
    })
  }).then(res => res.json())

export const editComment = (comment) =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({  
      timestamp: comment.timestamp,
      body: comment.body,
    })
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'udacity-readable',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())