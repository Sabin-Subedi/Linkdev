import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  PASSWORD_FORGET_FAIL,
  PASSWORD_FORGET_REQUEST,
  PASSWORD_FORGET_SUCCESS,
  TOKEN_VERIFY_REQUEST,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from '../constants/authConstant'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/v1/auth/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (email, password, name, date) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/v1/auth/register',
      { email, password, date, name },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT })

  localStorage.removeItem('userInfo')
}

export const getEmail = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PASSWORD_FORGET_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/v1/auth/verifyEmail', config)

    dispatch({
      type: PASSWORD_FORGET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PASSWORD_FORGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgotEmail = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: PASSWORD_FORGET_REQUEST })

    const config = {
      headers: {
        'Content-Type': `application/json`,
      },
    }

    const { data } = await axios.post(
      '/v1/auth/forgotPassword',
      { email },
      config
    )

    dispatch({
      type: PASSWORD_FORGET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PASSWORD_FORGET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const verifyForgetToken = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOKEN_VERIFY_REQUEST })

    const { data } = await axios.get(`/v1/auth/tokenVerify/${token}`)

    dispatch({
      type: TOKEN_VERIFY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TOKEN_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const resetPassword =
  (token, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST })

      const config = {
        headers: {
          'Content-Type': `application/json`,
        },
      }

      const { data } = await axios.post(
        `/v1/auth/resetPassword/${token}`,
        { password },
        config
      )

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
