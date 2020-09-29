import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Timestamp from 'react-timestamp'
import Voter from './Voter.js'
import { voteComment } from '../actions'
import { connect } from 'react-redux'
import AddEditCommentModal from './AddEditCommentModal'
import DeleteModal from './DeleteModal'

class Comment extends Component {
    state = {
        isAddEditModalOpen: false,
        isDeleteModalOpen: false
    }

    openAddEditModal = () => this.setState(() => ({ isAddEditModalOpen: true }))
    closeAddEditModal = () => this.setState(() => ({ isAddEditModalOpen: false }))

    openDeleteModal = () => this.setState(() => ({ isDeleteModalOpen: true }))
    closeDeleteModal = () => this.setState(() => ({ isDeleteModalOpen: false }))

    render() {
        const { comment } = this.props

        return (
            <div>
                <div>
                    <p>
                        By: {comment.author}
                        <span className='pull-right'>
                            <Button bsSize="xsmall" className='postButton' onClick={this.openAddEditModal.bind(this)}>Edit</Button>                        
                            <Button bsSize="xsmall" className='postButton' onClick={this.openDeleteModal.bind(this)}>Delete</Button> 
                        </span> 
                    </p>
                    <p className='tab postBody'>{comment.body}</p>
                    <Timestamp time={new Date(comment.timestamp).toISOString()}/>
                    <div className='pull-right'>{'Votes: '}
                        <Voter onVote={this.props.voteComment} voteScore={comment.voteScore} id={comment.id}/>
                    </div>
                </div>

                <AddEditCommentModal 
                    isModalOpen={this.state.isAddEditModalOpen} 
                    closeModal={this.closeAddEditModal} 
                    openModal={this.openAddEditModal} 
                    parentId={comment.parentId}
                    edit={true}
                    comment={comment}
                />

                <DeleteModal 
                    isModalOpen={this.state.isDeleteModalOpen} 
                    closeModal={this.closeDeleteModal} 
                    openModal={this.openDeleteModal}
                    comment={comment}
                    isPost={false}
                />
            </div>
        )
    }
}

const mapDispatchToProps = { voteComment }

export default connect(null, mapDispatchToProps)(Comment)