import { ProfileAction, ProfileActionsTypes } from '../actions/profile-actions';
import { ILoginUser } from './../../models/auth/user-login-model';

export let initialState: ILoginUser;

export function profileReducer(state = initialState, action: ProfileAction) {
    
  switch (action.type) {
    case ProfileActionsTypes.LOGIN:
      return action.payload;
    case ProfileActionsTypes.LOGOUT:
      return null;
    default:
      return state;
  }
}
