import {
  POST_BY_ID_FAIL,
  POST_BY_ID_REQUEST,
  POST_BY_ID_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  USER_POST_LIST_FAIL,
  USER_POST_LIST_REQUEST,
  USER_POST_LIST_SUCCESS,
} from '../constants/postConstant'
import { UPDATE_PROFILE_AVATAR_SUCCESS } from '../constants/profileConstants'

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload }
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case POST_LIKE_REQUEST:
      return { ...state, likeLoading: true }
    case POST_LIKE_SUCCESS:
      return { likeLoading: false, success: true, posts: action.payload }
    case POST_LIKE_FAIL:
      return {
        ...state,
        likeLoading: false,
        error: action.payload,
      }
    case POST_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, posts: action.payload }
    case POST_DELETE_SUCCESS:
      return { ...state, loading: false, success: true, posts: action.payload }
    default:
      return state
  }
}

export const userPostListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case USER_POST_LIST_REQUEST:
      return { loading: true, posts: [] }
    case USER_POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload }
    case USER_POST_LIST_FAIL:
      return { loading: false, error: action.payload }
    case POST_LIKE_REQUEST:
      return { ...state, likeLoading: true }
    case POST_LIKE_SUCCESS:
      return { likeLoading: false, success: true, posts: action.userPostList }
    case POST_LIKE_FAIL:
      return {
        ...state,
        likeLoading: false,
        error: action.payload,
      }
    case UPDATE_PROFILE_AVATAR_SUCCESS:
      return { loading: false, posts: action.post }
    default:
      return state
  }
}

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true }
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const commentStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true }
    case POST_COMMENT_SUCCESS:
      return { loading: false, success: true, status: action.payload }
    case POST_COMMENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const postByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BY_ID_REQUEST:
      return { loading: true }
    case POST_BY_ID_SUCCESS:
      return { loading: false, post: action.payload }
    case POST_BY_ID_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deletedPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true }
    case POST_DELETE_SUCCESS:
      return { loading: false, success: true }
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
