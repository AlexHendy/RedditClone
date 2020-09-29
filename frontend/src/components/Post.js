import React, { Component } from 'react'
import { Panel, Glyphicon, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchCommentsForId, votePost } from '../actions'
import Comment from './Comment'
import Timestamp from 'react-timestamp'
import Voter from './Voter'
import DeleteModal from './DeleteModal'

class Post extends Component {
    state = {
        isModalOpen: false
    }

    redirect = (url) => this.props.redirect(url)

    openModal = () => this.setState(() => ({ isModalOpen: true }))
    closeModal = () => this.setState(() => ({ isModalOpen: false }))

    componentDidMount() {
        if (this.props.showComments) {
            this.props.fetchCommentsForId(this.props.post.id)
        }
    }

    componentWillReceiveProps(){
        if (this.props.showComments) {
            this.props.fetchCommentsForId(this.props.post.id)
        }
    }

    sortComments(comments, field = 'timestamp') {
        comments.map(comment => comment.timestamp = new Date(comment.timestamp).getTime())

        // Found at https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
        return comments.sort(function(a, b) {
            return parseFloat(b[field]) - parseFloat(a[field]);
        })
    }

    render() {
        const { post, showComments } = this.props

        return (
            <div className='post'>
                <Panel header={post.title} bsStyle="info">
                    <div className='container'>
                        <div className="row">
                            By: {post.author} 
                            {!showComments &&
                            <div className='pull-right'><Button bsSize="xsmall" href={`/${post.category}/${post.id}`}>View Details</Button> 
                            </div> }
                            {showComments &&
                            <div className='pull-right'>
                                <Button bsSize="xsmall" className='postButton' onClick={this.openModal.bind(this)}>Delete</Button>
                                <Button bsSize="xsmall" href={`/edit/${post.id}`} className='postButton'>Edit</Button>  
                            </div> }
                            <br /> <br />
                            <Timestamp time={new Date(post.timestamp).toISOString()} format='full'/> <div className='pull-right'>Category: {post.category}</div>
                        </div>
                        <hr />
                        <div>
                            <p className='postBody'>{post.body}</p>
                            <hr />
                            <div className='row'>
                                <div className='pull-left'><Glyphicon glyph="comment" /> :  {post.commentCount}</div>
                                <div className='pull-right'>{'Votes: '}
                                    {showComments ? 
                                        <Voter onVote={this.props.votePost} voteScore={post.voteScore} id={post.id}/>
                                        : post.voteScore
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.showComments &&
                        <ListGroup fill>
                                    {this.sortComments(this.props.comments).filter(comment => comment.parentId === post.id)
                                        .map(comment => 
                                            <ListGroupItem key={comment.id}>
                                                <Comment comment={comment} />
                                            </ListGroupItem>
                                    )}
                        </ListGroup>
                    }
                </Panel>

                <DeleteModal 
                    isModalOpen={this.state.isModalOpen} 
                    closeModal={this.closeModal} 
                    openModal={this.openModal}
                    postId={post.id}
                    isPost={true}
                    redirect={this.redirect}
                />
            </div>
        )
    }
}

const mapDispatchToProps = { fetchCommentsForId, votePost }

function mapStateToProps(state, ownProps) {
    return {
      comments: state.comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)