import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { saySth } from '../actions/ui';

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    saySth
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
