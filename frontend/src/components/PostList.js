import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post'

import Message from './Message'
import Loader from './Loader'

const PostList = ({ history }) => {
  const postList = useSelector((state) => state.postList)
  const { loading, posts, error } = postList

  return error ? (
    <Message>{error}</Message>
  ) : loading ? (
    <Loader />
  ) : (
    posts.map((post) => <Post key={post._id} post={post} />)
  )

  // return <Loader />
}

export default PostList
