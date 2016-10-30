import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

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
    const { postWithComments, sendComment, params } = this.props;
    return (
      <Paper zDepth='1' style={{width: '50%', margin: '0 auto', marginTop: '8px'}}>
        <Card expanded={this.state.expanded} onExpandChange={(state) => this.handleExpandChange(state)}>
          <CardHeader
            avatar={`../../${postWithComments.login}.jpg`}
            title={postWithComments.content}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <CommentCard comments={postWithComments.comments} />
            <CommentForm sendComment={sendComment} params={params} id={postWithComments.id}/>
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
  sendComment: PropTypes.func.isRequired,
  params: PropTypes.object,
}

export default PostCard;