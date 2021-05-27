import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/profileConstants'

export const userProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { loading: true }
    case PROFILE_SUCCESS:
      return { loading: false, profile: action.payload }
    case PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload }
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return { loading: false, profile: action.profile }
    default:
      return state
  }
}

export const userAvatarReducer = (state = { avatar: {} }, action) => {
  switch (action.type) {
    case 'USER_AVATAR':
      return { avatar: action.avatar }
    default:
      return state
  }
}
