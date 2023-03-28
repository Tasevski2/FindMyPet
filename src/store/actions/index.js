import * as actionTypes from './types';

export const incrementAction = () => {
  return {
    type: actionTypes.INCREMENT,
  };
};

export const decrementAction = () => {
  return {
    type: actionTypes.DECREMENT,
  };
};

export const increment = () => async (dispatch) => {
  setTimeout(() => {
    dispatch(incrementAction());
  }, 1000);
};

export const decrement = () => (dispatch) => {
  dispatch(decrementAction());
};
