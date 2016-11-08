import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';

import PostCard from './PostCard';
import UserPersonalData from './UserPersonalData';
import UsersFriends from './UsersFriends';

class UserPage extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.sendInvitation = this.sendInvitation.bind(this);
  }
  x = null;
  
  componentWillMount() {
    const { location, loggedUserData } = this.props;
    this.fetchData(loggedUserData.id, location.id);
    this.x = this.props.location.id;
  }
  
  componentWillUpdate() {
    this.x = this.props.location.id;
    if (this.x != window.location.pathname.split('/')[3]) {
      console.log('update');
      this.fetchData(this.props.loggedUserData.id, window.location.pathname.split('/')[3]);
    }
  }
  
  fetchData(userId, visitorId) {
    const { fetchUserPageData, resetUserPageData } = this.props;
    resetUserPageData();
    fetchUserPageData(userId , visitorId);
  }

  sendInvitation() {
    const { sendInvitation, userPageData, loggedUserData } = this.props;
    sendInvitation(loggedUserData.id, userPageData.id);
  }
  
  render() {
    const { userPageData, sendComment, loggedUserData } = this.props;
    const postCards = userPageData.postsWithComments.map(item => <PostCard width="95%" postWithComments={item} sendComment={sendComment} loggedUserData={loggedUserData} friendProfile={true} />);

    return (
      <Paper zDepth='1' style={{width: '70%', margin: '0 auto', marginTop: '8px'}}>
        <div style={{overflow: 'auto'}}>
          <div style={{float: 'left', width: '30%'}}>
            <UserPersonalData
              userData={userPageData.userData[0]}
              isFriend={userPageData.isFriend}
              inviteAction={this.sendInvitation}
            />
            <UsersFriends friends={userPageData.friends} />
          </div>
          <div style={{float: 'left', width: '70%'}}>
            <div>{ postCards }</div>
          </div>
        </div>
      </Paper>
    );
  }
}

UserPage.propTypes = {
  sendInvitation: PropTypes.func,
  location: PropTypes.object,
  resetUserPageData: PropTypes.func.isRequired,
  fetchUserPageData: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  updatePostsWithComments: PropTypes.func.isRequired,
  loggedUserData: PropTypes.object,
  userPageData: PropTypes.object,
}

UserPage.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
}

export default UserPage;