import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';

import { 
  initSocket,
  fetchUserData,
} from '../actions/dashboard';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
    loggedUserData: state.dashboard.loggedUserData,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    initSocket,
    fetchUserData,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
