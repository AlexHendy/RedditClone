import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class ListPosts extends Component {

    componentDidMount() {
        this.props.fetchPosts()
    }

    componentWillReceiveProps(){
        this.props.fetchPosts()
    }

    sortPosts(posts, field) {
        if (field === 'timestamp'){
            posts.map(post => post.timestamp = new Date(post.timestamp).getTime())
        }

        // Found at https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
        return posts.sort(function(a, b) {
            return parseFloat(b[field]) - parseFloat(a[field]);
        })
    }

    render() {
        const selected = this.props.filter
        let posts = []

        if (selected !== '') {
            posts = this.props.postList.filter(post => post.category === selected)
        }
        else {
            posts = this.props.postList
        }
        
        if(this.props.sortBy) {
            posts = this.sortPosts(posts, this.props.sortBy)
        }
  
        return (
            <div>
                <div>
                </div>
                {posts.map((post) => 
                    <Post key={post.id} post={post} showComments={false} />
                )}
            </div>
        )
    }
}

const mapDispatchToProps = { fetchPosts }
  
function mapStateToProps(state, ownProps) {
    return {
      postList: state.postList
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)