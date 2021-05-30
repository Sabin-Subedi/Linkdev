import React from 'react'
import { useSelector } from 'react-redux'

import Post from './Post'

import Message from './Message'
import Loader from './Loader'

const PostList = ({ history }) => {
  const postList = useSelector((state) => state.postList)
  const { loading, posts, error } = postList

  const commentStatus = useSelector((state) => state.commentStatus)

  // {
  //   commentStatus && commentStatus.success && (
  //     <Alert className='rounded-pill my-2 mb-3' variant='success'>
  //       You Succesfully commented to the post.{' '}
  //       <Link className='text-blue_primary' to={`/post/${post._id}`}>
  //         View Your Comment
  //       </Link>
  //     </Alert>
  //   )
  // }
  // {
  //   commentStatus && commentStatus.loading ? (
  //     <div className='d-flex align-items-center justify-content-center my-2 text-2'>
  //       <span className='mr-2'>Posting...</span>
  //       <Spinner
  //         as='span'
  //         variant='primary'
  //         animation='border'
  //         role='status'
  //         aria-hidden='true'
  //       />
  //     </div>
  //   ) : (
  //     ''
  //   )
  // }
  // {
  //   commentStatus && commentStatus.error && (
  //     <Alert className='rounded-pill my-2 mb-3' variant='danger'>
  //       {commentStatus.error}
  //     </Alert>
  //   )
  // }

  return error ? (
    <Message>{error}</Message>
  ) : loading ? (
    <Loader />
  ) : (
    posts.map((post) => (
      <Post
        key={post._id}
        post={post}
        home={true}
        comment1={post.comments[post.comments.length - 2]}
        comment2={post.comments[post.comments.length - 1]}
      />
    ))
  )

  // return <Loader />
}

export default PostList
