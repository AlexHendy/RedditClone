import React, { Component } from 'react'
import { Glyphicon, Button } from 'react-bootstrap'

class Voter extends Component {
    render() {
        return (
            <span>
                <Button bsSize="xsmall" onClick={() => this.props.onVote(this.props.id, 'upVote')}>
                    <Glyphicon glyph="arrow-up" />
                </Button>
                {` ${this.props.voteScore} `}
                <Button bsSize="xsmall" onClick={() => this.props.onVote(this.props.id, 'downVote')}>
                    <Glyphicon glyph="arrow-down" />
                </Button>
            </span>
        )
    }
}

export default Voter