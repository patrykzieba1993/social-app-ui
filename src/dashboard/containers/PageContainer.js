import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserPage from '../components/UserPage';

import {
} from '../actions/dashboard';

function mapPropsToState(state, ownProps) {
  return {
    location: ownProps.params,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(UserPage);