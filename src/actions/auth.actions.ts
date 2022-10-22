import { AuthConstants } from '../constants/auth.constants'

const AuthActions = {
  fetchStart,
  fetchSuccess,
  fetchFailed,
  signOut,
}

function fetchStart() {
  return (dispatch: any) => {
    dispatch(_fetchStart())
  }
}

const _fetchStart = () => {
  return {
    type: AuthConstants.PROFILE_GET_START,
  }
}

function fetchSuccess(user: any) {
  return (dispatch: any) => {
    dispatch(_fetchSuccess(user))
  }
}

const _fetchSuccess = (user: any) => {
  return {
    type: AuthConstants.PROFILE_GET_SUCCESS,
    payload: user,
  }
}

function fetchFailed() {
  return (dispatch: any) => {
    dispatch(_fetchFailed())
  }
}

const _fetchFailed = () => {
  return {
    type: AuthConstants.PROFILE_GET_FAILED,
  }
}

function signOut() {
  return (dispatch: any) => {
    dispatch(_signOut())
  }
}

const _signOut = () => {
  return {
    type: AuthConstants.SIGN_OUT,
  }
}

export default AuthActions
