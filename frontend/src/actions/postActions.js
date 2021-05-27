import axios from 'axios'
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

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/v1/posts', config)

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const likePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST })

    const {
      userLogin: { userInfo },
      postList,
      userPostList,
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/v1/post/like/${postId}`, config)

    const dataIndex = postList.posts.findIndex(
      (post) => post._id.toString() === data._id
    )

    const userPostIndex = userPostList.posts.findIndex(
      (post) => post._id.toString() === data._id
    )

    postList.posts[dataIndex] = data
    userPostList.posts[userPostIndex] = data

    dispatch({
      type: POST_LIKE_SUCCESS,
      payload: postList.posts,
      userPostList: userPostList.posts,
    })
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPost = (text, image) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const {
      postList: { posts },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/v1/posts',
      { text, postImage: image },
      config
    )

    posts.unshift(data)

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: posts,
    })
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserPosts = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_POST_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/v1/posts/${userId}`, config)

    dispatch({
      type: USER_POST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const commentPost = (text, postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_COMMENT_REQUEST })

    const {
      userLogin: { userInfo },
      postById,
      postList,
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/v1/post/comment/${postId}`,
      { text },
      config
    )

    postList.posts &&
      postList.posts
        .find((post) => post._id === postId)
        .comments.push(data.newComment)

    postById && postById.post && postById.post.comments.push(data.newComment)

    dispatch({
      type: POST_COMMENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getPostById = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_BY_ID_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/v1/post/${postId}`, config)

    dispatch({
      type: POST_BY_ID_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
