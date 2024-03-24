import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../../../features/form/userSlice';

export const rootReducer = combineReducers({
    user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

type ActionsType<SliceActions> = SliceActions[keyof SliceActions] extends (...args: any[]) => infer R ? R : never;

export type RootActionsType =
    | ActionsType<typeof userSlice.actions>