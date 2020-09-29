import React, { Component } from 'react';
import { ButtonGroup, ButtonToolbar, Button, Glyphicon, Label, DropdownButton, MenuItem } from 'react-bootstrap'
import ListPosts from './ListPosts'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions'

class DefaultView extends Component {
    state = {
        sort: ''
    }

    onClick(event){
        this.props.history.push(`/${event.target.value}`)
    }

    onSelect(event){
        this.setState({ sort: event })
    }
    
    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const currentCategory = this.props.location.pathname.split('/')[1]

        return (
          <div>
            <div className='top-bar'> 
                <h1>Readable</h1> 
            </div>
            <div className='App'>
                <h3><Label>Categories:</Label></h3>
                <div className='btn-group'>
                    <ButtonToolbar>
                        <ButtonGroup className='btn-group-wrap'>
                            <Button key='0' onClick={this.onClick.bind(this)} value=''><Glyphicon glyph="star" /> all posts </Button>
                            {this.props.categories.map(category => 
                                <Button key={category.path} onClick={this.onClick.bind(this)} value={category.name}><Glyphicon glyph="star-empty" /> {category.name} </Button>
                            )}
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <br /> <hr />
                <DropdownButton title='Sory By' id='1' onSelect={this.onSelect.bind(this)}>
                    <MenuItem eventKey='voteScore'>Popularity</MenuItem>
                    <MenuItem eventKey='timestamp'>Time</MenuItem>
                </DropdownButton>
            </div>
            <ListPosts filter={currentCategory} sortBy={this.state.sort}/>

            <div className='open-create-edit'> 
                <Link to='/add' />
            </div>
          </div>
        );
      }
}

const mapDispatchToProps = { fetchCategories }

function mapStateToProps(state, ownProps) {
    return {
      categories: state.categories
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)