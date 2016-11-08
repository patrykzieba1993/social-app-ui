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
    const { postWithComments, sendComment, loggedUserData, friendProfile } = this.props;
    return (
      <Paper zDepth='1' style={{width: this.props.width, margin: '0 auto', marginTop: '8px'}}>
        <Card expanded={this.state.expanded} onExpandChange={(state) => this.handleExpandChange(state)}>
          <CardHeader
            avatar={`../../${postWithComments.login || postWithComments.userData.login}.jpg`}
            title={postWithComments.content}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <CommentCard comments={postWithComments.comments} />
            <CommentForm sendComment={sendComment} loggedUserData={loggedUserData} id={postWithComments.id} friendProfile={friendProfile} />
          </CardText>
          <CardActions>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

PostCard.propTypes = {
  width: PropTypes.string,
  friendProfile: PropTypes.bool,
  postWithComments: PropTypes.object,
  sendComment: PropTypes.func.isRequired,
  loggedUserData: PropTypes.object,
}

export default PostCard;