import {
  PASSWORD_FORGET_FAIL,
  PASSWORD_FORGET_REQUEST,
  PASSWORD_FORGET_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TOKEN_VERIFY_FAIL,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
} from '../constants/authConstant'

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }

    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const verifyEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true }
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const forgetEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_FORGET_REQUEST:
      return { loading: true }
    case PASSWORD_FORGET_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case PASSWORD_FORGET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const tokenVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOKEN_VERIFY_REQUEST:
      return { loading: true }
    case TOKEN_VERIFY_SUCCESS:
      return { loading: false, success: true }
    case TOKEN_VERIFY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true }
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true }
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
