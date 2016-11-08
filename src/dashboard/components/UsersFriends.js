import React, { Component, PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

class UsersFriends extends Component {
  render() {
    const { friends } = this.props;

    const friendsData = friends.map(friend => { return {
      img: `../../${friend.login}.jpg`,
      title: `${friend.firstName} ${friend.lastName}`,
    } });

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 260,
        height: 450,
        overflowY: 'auto',
      },
    };

    return (
      <div style={{marginLeft: '10px'}}>
        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          <Subheader>Lista znajomych</Subheader>
          {friendsData.map((tile) => (
            <GridTile
              key={tile.img}
              title={tile.title}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
    )
  }
}

UsersFriends.PropTypes = {
  friends: PropTypes.array,
}

export default UsersFriends;