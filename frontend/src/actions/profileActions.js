import {
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  UPDATE_PROFILE_AVATAR_FAIL,
  UPDATE_PROFILE_AVATAR_REQUEST,
  UPDATE_PROFILE_AVATAR_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/profileConstants'
import axios from 'axios'

export const getProfileDetail = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/v1/profile/${userId}`, config)

    dispatch({ type: PROFILE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProfile =
  (bio, facebook, twitter, linkedin, github, website, location) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Cotent-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/v1/profile`,
        { bio, facebook, twitter, linkedin, github, website, location },
        config
      )

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateProfileAvatar = (avatar) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_AVATAR_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Cotent-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/v1/profile/avatar`, { avatar }, config)

    dispatch({
      type: UPDATE_PROFILE_AVATAR_SUCCESS,
      profile: data.profile,
      post: data.post,
    })

    dispatch({
      type: 'USER_AVATAR',
      avatar: data.avatar,
    })

    // Get the existing data
    var existing = localStorage.getItem('userInfo')

    existing = existing ? JSON.parse(existing) : {}

    // Add new data to localStorage Array
    existing.avatar = data.avatar

    // Save back to localStorage
    localStorage.setItem('userInfo', JSON.stringify(existing))
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_AVATAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
