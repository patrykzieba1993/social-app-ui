import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Messages from '../components/Messages';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
  };
};

function mapDispatchToProps(dispatch) {
  const actions = {
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);