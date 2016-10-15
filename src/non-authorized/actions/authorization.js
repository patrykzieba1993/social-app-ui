export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_RESET = 'REGISTER_RESET';

import ApiService from '../../services/apiService';

export function registerSuccessful() {
  return {
    type: REGISTER_SUCCESSFUL,
  };
}

export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  };
};

export function resetRegister() {
  return {
    type: REGISTER_RESET,
  };
};

export function register(personalData) {
  return (dispatch, getState) => {
    return ApiService.register(personalData)
      .then(res => {
        if(res.status === 201) {
          return dispatch(registerSuccessful())
        } 
        return dispatch(registerFailure());
      })
      .catch(err => dispatch(registerFailure()));
  }
}