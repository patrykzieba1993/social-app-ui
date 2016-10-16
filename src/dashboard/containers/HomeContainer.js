import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
  }
};

function mapDispatchToProps(dispatch) {
  const actions = {};
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);