import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import CommentCard from './CommentCard';

class PostCard extends Component {
  constructor() {
    super();
  }

  state = {
    expanded: true,
  }

  handleExpandChange(state) {
    this.setState({
      expanded: state
    });
  }
  
  render() {
    const { postWithComments } = this.props;
    return (
      <Paper zDepth='1' style={{width: '50%', margin: '0 auto', marginTop: '8px'}}>
        <Card expanded={this.state.expanded} onExpandChange={(state) => this.handleExpandChange(state)}>
          <CardHeader
            title={postWithComments.content}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <CommentCard comments={postWithComments.comments} />
          </CardText>
          <CardActions>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

PostCard.propTypes = {
  postWithComments: PropTypes.object,
}

export default PostCard;