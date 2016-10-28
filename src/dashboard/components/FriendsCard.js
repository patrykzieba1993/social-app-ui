import React, { Component, PropTypes } from 'react'

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

class FriendsCard extends Component {
  render() {
    const { friends } = this.props;
    const contacts = friends.map((friend, index) =>
      <ListItem
        value={friend.id}
        primaryText={`${friend.firstName} ${friend.lastName}`}
        leftAvatar={<Avatar src={`/../../${friend.login}.jpg`} />}
        onTouchTap={ () => this.props.set(friend.id) }
      />
    )

    return (
      <div style={{marginLeft: '5px'}}>
        <List>
          <Subheader>Kontakty</Subheader>
          { contacts }
        </List>
      </div>
    );
  }
}

FriendsCard.PropTypes = {
  friends: PropTypes.array,
  set: PropTypes.func.isRequired,
}

export default FriendsCard;