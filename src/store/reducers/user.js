import AsyncStorage from '@react-native-async-storage/async-storage';
import * as actionTypes from '../actions/types';

const initState = { user: null, isLoading: true };

const Reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOGIN:
      const user = payload;
      return { ...state, user, isLoading: false };
    case actionTypes.LOGOUT:
      return { ...state, user: null };
    case actionTypes.FAILED_TO_RETRIEVE_USER:
      return { ...state, user: null, isLoading: false };
    case actionTypes.UPDATE_USER_DETAILS:
      return { ...state, user: { ...state.user, ...payload } };
    default:
      return state;
  }
};

export default Reducer;
