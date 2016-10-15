import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Register from '../components/Register';

import { register } from '../actions/authorization';
import { registerSuccessful, resetRegister } from '../actions/authorization';

function  mapStateToProps(state) {
  return {
    registerState: state.authorization.registerState,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    register,
    registerSuccessful,
    resetRegister,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);