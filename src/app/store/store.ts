import { configureStore } from '@reduxjs/toolkit';
import { RootActionsType, rootReducer } from './reducers/root-reducer';

export const store = configureStore({
  reducer: {
    counter: rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppActions = RootActionsType;
