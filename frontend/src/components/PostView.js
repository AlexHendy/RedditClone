import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPost } from '../actions'
import Post from './Post'
import { Link } from 'react-router-dom'
import AddEditCommentModal from './AddEditCommentModal'

class PostView extends Component {
    state = {
        isModalOpen: false
    }

    redirect = (url) => this.props.history.push(url)

    id = () => this.props.location.pathname.split('/')[2]

    componentDidMount() {
        this.props.fetchPost(this.id())
    }

    openModal = () => this.setState(() => ({ isModalOpen: true }))
    closeModal = () => this.setState(() => ({ isModalOpen: false }))

    render() {
        return (
            <div>
                <div className='top-bar'>
                    <h1>Readable</h1>
                </div>
                <Link to='/' className="close-post" />
                <br /> <br />
                <div>
                    {this.props.postList.filter(post => post.id === this.id()).map(post => 
                        <Post key={post.id} post={post} showComments={true} redirect={this.redirect}/>
                    )}
                </div>

                <AddEditCommentModal 
                    isModalOpen={this.state.isModalOpen} 
                    closeModal={this.closeModal} 
                    openModal={this.openModal} 
                    parentId={this.id()}
                />

                <div className='open-create-edit'>
                    <span role='button' onClick={this.openModal} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = { fetchPost }

function mapStateToProps(state, ownProps) {
    return {
        postList: state.postList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)