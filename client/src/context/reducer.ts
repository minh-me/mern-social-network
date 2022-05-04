import { ActionType, AppActions } from './actionTypes';
import { AppState, initialAppState } from './state';

export const appReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case ActionType.AddAuth:
      return { ...state, auth: action.payload };

    case ActionType.Reset:
      return initialAppState;

    default:
      return state;
  }
};
