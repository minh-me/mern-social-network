import { ActionType, AppActions } from './actionTypes';
import { AppState } from './state';

export const appReducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case ActionType.AddAuth:
      return { ...state, auth: action.payload };

    case ActionType.AddUser:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
