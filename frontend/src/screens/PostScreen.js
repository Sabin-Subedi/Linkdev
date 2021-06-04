import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPostById } from '../actions/postActions'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import Post from '../components/Post'

const PostScreen = ({ history, match }) => {
  const postId = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postById = useSelector((state) => state.postById)
  const { loading, post, error } = postById

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    dispatch(getPostById(postId))
  }, [history, userInfo, dispatch, postId])

  return (
    <>
      <Meta title={`${post ? post.name : ''} - Post`} />
      <Header history={history} user={userInfo} />
      <Row className='justify-content-between'>
        <Col md={3}></Col>
        <Col md={6}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error.message}</Message>
          ) : (
            post && <Post post={post} />
          )}
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  )
}

export default PostScreen
