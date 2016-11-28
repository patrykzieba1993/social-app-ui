import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserSearch from '../components/UserSearch';

import {
  sendUserSearchQuery,
  sendInvitation,
} from '../actions/dashboard';


function mapPropsToState(state, ownProps) {
  return {
    searchResult: state.dashboard.searchResult,
    location: ownProps.location,
    loggedUserData: state.dashboard.loggedUserData,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    sendUserSearchQuery,
    sendInvitation,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(UserSearch);