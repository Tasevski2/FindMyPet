import { mockUser } from '../../../mockData';
import * as actionTypes from '../actions/types';

const initState = { user: mockUser, isLoading: false };

const Reducer = (state = initState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default Reducer;
