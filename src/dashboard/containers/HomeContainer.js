import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { sendPost } from '../actions/dashboard';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
    posts: state.dashboard.posts,
  }
};

function mapDispatchToProps(dispatch) {
  const actions = {
    sendPost,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);