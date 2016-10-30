import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';

import { 
  initSocket,
} from '../actions/dashboard';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    initSocket,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
