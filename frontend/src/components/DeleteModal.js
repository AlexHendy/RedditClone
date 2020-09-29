import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { deletePost, deleteComment } from '../actions'

class DeleteModal extends Component {

    handleSubmit(event) {
        event.preventDefault()

        this.props.isPost ? this.props.deletePost(this.props.postId) : this.props.deleteComment(this.props.comment)
        this.props.closeModal()
        if (this.props.isPost) this.props.redirect('/')
    }

    render(){
        return(
            <Modal show={this.props.isModalOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete{this.props.isPost ? ' Post' : ' Comment'}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className='App modalForm postBody'>
                            Are you sure you want to delete this {this.props.isPost? 'post' : 'comment'}?
                        </div>
                        <Modal.Footer>
                            <Button onClick={this.props.closeModal}>No</Button>
                            <Button bsStyle='primary' type='submit'>Delete</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = { deletePost, deleteComment }

export default connect(null, mapDispatchToProps)(DeleteModal)