import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { sendPost, sendComment } from '../actions/dashboard';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
    postsWithComments: state.dashboard.postsWithComments,
  }
};

function mapDispatchToProps(dispatch) {
  const actions = {
    sendPost,
    sendComment,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);