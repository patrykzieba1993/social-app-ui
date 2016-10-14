import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import { showRegisterDialog } from '../actions/ui';

function mapStateToProps(state, ownProps) {
  return {
    history: ownProps.history,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    showRegisterDialog
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
