import { Action } from '@ngrx/store';
import { ILoginUser } from './../../models/auth/user-login-model';

export enum ProfileActionsTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}
export class LoginUser implements Action {
  type: string = ProfileActionsTypes.LOGIN;
  constructor(public payload: ILoginUser) {}
}

export class LogoutUser implements Action {
  type: string = ProfileActionsTypes.LOGOUT;
  constructor() {}
}
export type ProfileAction = LoginUser
