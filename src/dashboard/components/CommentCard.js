import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class CommentCard extends Component {
  render() {
    const { comments } = this.props;
    const itemsList = comments.map(comment =>
      <div>
        <ListItem
          leftAvatar={<Avatar src={`/../../${comment.user.login}.jpg`} />}
          secondaryTextLines="2"
          primaryText={`${comment.user.firstName} ${comment.user.lastName}`}
          secondaryText={
              <p>
                {comment.content}
              </p>}

        />
        <Divider inset={true} />
      </div>
    )
    return (
      <div>
        <List>
          <Subheader>Komentarze</Subheader>
          {itemsList}
        </List>
      </div>
    );
  }
}

CommentCard.propTypes = {
  comments: PropTypes.object,
};

export default CommentCard;