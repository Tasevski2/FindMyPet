import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from './types';
import { setAuthHeader } from '../../api/axios-instance';
import { API } from '../../api';

export const loginAction = (payload) => {
  return {
    type: actionTypes.LOGIN,
    payload,
  };
};

export const logoutAction = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const failedToRetrieveUserAction = () => {
  return {
    type: actionTypes.FAILED_TO_RETRIEVE_USER,
  };
};

export const updateUserDetailsAction = (payload) => {
  return {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload,
  };
};

export const validJWT = (jwt) => async (dispatch) => {
  setAuthHeader(jwt);
  let user;
  try {
    user = (await API.getLoggedInUser()).data;
  } catch (error) {
    console.log(error.response.data.error);
  }
  dispatch(loginAction(user));
};

export const login = (payload) => async (dispatch) => {
  const jwt = payload;
  await AsyncStorage.setItem('jwt', jwt);
  setAuthHeader(jwt);
  const user = (await API.getLoggedInUser()).data;
  dispatch(loginAction(user));
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('jwt');
  dispatch(logoutAction());
};
