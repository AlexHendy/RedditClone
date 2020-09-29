import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { createComment, editComment } from '../actions'

class AddEditCommentModal extends Component {
    state = {
        disableSubmit: true,
        comment: this.createNewComment()
    }

    createNewComment(){
        return {
            id: this.createGuid(),
            timestamp: new Date(),
            body: '',
            author: '',
            parentId: this.props.parentId
        }
    }

    componentWillReceiveProps(){
        if (this.props.edit && this.state.disableSubmit){
            this.setState({
                comment: this.props.comment
            })
        }
    }

    createGuid() {
        // Found at https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4()
    }

    onChangeAuthor(event) {
        const newComment = {
            ...this.state.comment,
            author: event.target.value
        }
        this.setState({ 
            comment: newComment,
            disableSubmit: this.isFieldEmpty(newComment)
        })
    }

    onChangeBody(event) {
        const newComment = {
            ...this.state.comment,
            body: event.target.value
        }
        this.setState({ 
            comment: newComment,
            disableSubmit: this.isFieldEmpty(newComment)
        })
    }

    isFieldEmpty(comment){
        for(var key in comment) {
            if (!comment[key] && (key !== 'deleted' && key !== 'parentDeleted')){
                return true
            }
        }

        return false
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.edit ? this.handleEdit() : this.handleCreate()
        this.props.closeModal()
    }

    handleCreate(){
        this.props.createComment(this.state.comment)
        this.setState({
            comment: this.createNewComment(),
            disableSubmit: true
        })
    }

    handleEdit(){
        this.props.editComment(this.state.comment)
        this.setState({
            comment: this.createNewComment(),
            disableSubmit: true
        })
    }

    render(){
        return(
            <Modal show={this.props.isModalOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.edit ? 'Edit ' : 'Add '}Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className='App modalForm'>
                            {!this.props.edit &&
                                <FormGroup controlId="formInlineAuthor" className='createItem'>
                                    <ControlLabel>Author</ControlLabel>
                                    <FormControl type="text" placeholder="Author" value={this.state.comment.author} onChange={this.onChangeAuthor.bind(this)}/>
                                </FormGroup>
                            }
                            <FormGroup controlId="formInlineBody" className='createItem'>
                                <ControlLabel>Body</ControlLabel>
                                <FormControl componentClass="textarea" placeholder="Body" value={this.state.comment.body} rows={5} onChange={this.onChangeBody.bind(this)}/>
                            </FormGroup>
                            <p className='required'>All fields are required</p>
                        </div>
                        <Modal.Footer>
                            <Button onClick={this.props.closeModal}>Close</Button>
                            <Button bsStyle='primary' type='submit' disabled={this.state.disableSubmit}>{this.props.edit ? 'Edit ' : 'Post ' }Comment</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

const mapDispatchToProps = { createComment, editComment }

export default connect(null, mapDispatchToProps)(AddEditCommentModal)