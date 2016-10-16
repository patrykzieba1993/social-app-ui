import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

const LoginFailure = () => {
  return <Snackbar
    open={true}
    message="Logowanie nie powiodło się..."
    autoHideDuration={6000}
    contentStyle={{textAlign: 'center'}}
  />
}

export default LoginFailure;