import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { getUserPosts } from '../actions/postActions'
import Post from '../components/Post'
import Loader from '../components/Loader'

const ProfileScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userPostList = useSelector((state) => state.userPostList)
  const { posts, loading } = userPostList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(getUserPosts(userId))
  }, [history, userInfo, dispatch, userId])

  return (
    <>
      <Header history={history} user={userInfo} />
      <section className='profile_body'>
        <Container fluid>
          <Row className='mt-2'>
            <Col md={5}></Col>
            <Col md={5}>
              <h2>Your Posts</h2>
              {loading && <Loader />}
              {posts &&
                posts.map((post) => <Post key={post._id} post={post} />)}
            </Col>
          </Row>
        </Container>
      </section>

      <Footer background='bg-body_secondary' />
    </>
  )
}

export default ProfileScreen
