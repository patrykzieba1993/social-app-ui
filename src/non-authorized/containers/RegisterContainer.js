import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Register from '../components/Register';

function  mapStateToProps(state) {
  return {
    registerDialogVisible: state.ui.registerDialogVisible,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);