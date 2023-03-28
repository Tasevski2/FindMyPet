import { configureStore } from '@reduxjs/toolkit';

import { UserReducer } from './reducers';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
