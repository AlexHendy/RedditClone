import React, { Component } from 'react'
import { FormControl, FormGroup, DropdownButton, MenuItem, Button, ControlLabel, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPost, createPost, editPost } from '../actions'

class CreateEditView extends Component {
    state = {
        isModalOpen: false,
        btnTitle: 'Select Category',
        edit: false,
        post: { 
            id: this.createGuid(),
            timestamp: new Date(),
            title: '', 
            body: '',
            author: '',
            category: '', 
        }
    }

    openModal = () => this.setState(() => ({ isModalOpen: true }))
    closeModal = () => this.setState(() => ({ isModalOpen: false }))

    onSelect(event) {
        this.setState({ 
            post: {
                ...this.state.post,
                category: event
            },
            btnTitle: event 
        })
    }

    onChangeAuthor(event) {
        this.setState({ 
            post: {
                ...this.state.post,
                author: event.target.value
            } 
        })
    }

    onChangeTitle(event) {
        this.setState({ 
            post: {
                ...this.state.post,
                title: event.target.value
            } 
        })
    }

    onChangeBody(event) {
        this.setState({ 
            post: {
                ...this.state.post,
                body: event.target.value
            } 
        })
    }

    componentDidMount() {
        if (this.props.location.pathname.includes('edit')){
            
            const id = this.props.location.pathname.substr(6)
            this.props.fetchPost(id)

            this.setState({ edit: true })
        }
        this.props.fetchCategories()
    }

    componentWillReceiveProps() {
        let id = ''
        if (this.state.edit) {
            id = this.props.location.pathname.substr(6)

            this.props.postList.filter(post => post.id === id).map(post =>
                this.setState({ post })
            )
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

    isFieldEmpty(skip){
        for(var key in this.state.post) {
            if (!this.state.post[key] && key !== skip){
                this.openModal()
                return true
            }
        }

        return false
    }

    handleSubmit(event) {
        event.preventDefault()
        this.state.edit ? this.handleEdit() : this.handleCreate()
        
    }

    handleCreate(){
        if(this.isFieldEmpty('')) {
            return
        }

        this.props.createPost(this.state.post)
        this.props.history.push(`/`)
    }

    handleEdit(){
        if(this.isFieldEmpty('deleted')) {
            return
        }

        this.props.editPost(this.state.post)
        this.props.history.push(`/${this.state.post.category}/${this.state.post.id}`)
    }

    render() {
        const { post, edit, btnTitle } = this.state

        return (
            <div className='App'>
                <div className='top-bar'> 
                    <h1>
                        {edit ? 'Edit ' : 'Create ' } 
                        Post
                    </h1> 
                </div>
                <Link to={edit ? `/${post.category}/${post.id}` : '/'} className="close-post" />
                <form className='createForm' onSubmit={this.handleSubmit.bind(this)}>
                    {!edit &&
                        <div>
                            <DropdownButton title={btnTitle} id='1' onSelect={this.onSelect.bind(this)}>
                                {this.props.categories.map(category =>
                                    <MenuItem key={category.path} eventKey={category.name}>{category.name}</MenuItem>
                                )}
                            </DropdownButton>
                            <FormGroup controlId="formInlineAuthor" className='createItem' >
                                <ControlLabel>Username</ControlLabel>
                                <FormControl type="text" placeholder="Username" value={post.author} onChange={this.onChangeAuthor.bind(this)}/>
                            </FormGroup> 
                        </div>
                    }
                    <FormGroup controlId="formInlineTitle" className='createItem'>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" placeholder="Title" value={post.title} onChange={this.onChangeTitle.bind(this)}/>
                    </FormGroup>
                    <FormGroup controlId="formInlineBody" className='createItem'>
                        <ControlLabel>Body</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Body" rows={5} value={post.body} onChange={this.onChangeBody.bind(this)}/>
                    </FormGroup>
                    <p className='required'>All fields are required</p>
                    <br />
                    <Button type='submit' bsStyle='primary'>
                        {edit ? 'Update Post' : 'Post'}
                    </Button>
                </form>

                <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Attention!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='App modalForm'>
                        <p className='postBody'>All fields are required</p> <br />
                        <Button onClick={this.closeModal}>Close</Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

const mapDispatchToProps = { fetchCategories, fetchPost, createPost, editPost }

function mapStateToProps(state, ownProps) {
    return {
        categories: state.categories,
        postList: state.postList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditView)