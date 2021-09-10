import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getEmail } from '../actions/authActions'
import { getPosts } from '../actions/postActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Message from '../components/Message'

import PostCreater from '../components/PostCreater'
import PostList from '../components/PostList'
import Meta from '../components/Meta'
import User from '../components/User'
import { getUsers } from '../actions/userActions'
import Loader from '../components/Loader'

const HomeScreen = ({ history, location }) => {
  const dispatch = useDispatch()
  const [verifiedAlert, setVerifiedAlert] = useState(true)

  const params = location.pathname

  const [show, setShow] = useState(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { users, loading, error } = userList

  const verifyEmail = useSelector((state) => state.verifyEmail)
  const { message } = verifyEmail

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    dispatch(getPosts())
    dispatch(getUsers())
  }, [history, userInfo, dispatch])

  const verifyHandler = () => {
    dispatch(getEmail())
    setShow(false)
  }

  return (
    <div>
      <Meta title='Home - Linkdev' />
      <Header history={history} user={userInfo} />

      <div className='main_content mt-4'>
        <Container fluid>
          <Row className='justify-content-between'>
            <Col md={3}></Col>
            <Col md={5}>
              {params && params.toString() === '/verified' && verifiedAlert && (
                <Alert
                  variant='success'
                  onClose={() => setVerifiedAlert(false)}
                  dismissible
                >
                  <h2 className='font-weight-light'>You are a creater now</h2>
                </Alert>
              )}
              {params && params.toString() === '/notverified' && verifiedAlert && (
                <Alert
                  variant='danger'
                  onClose={() => setVerifiedAlert(false)}
                  dismissible
                >
                  <h2 className='font-weight-light'>
                    Soory, There was Some Error verifying your Account.
                  </h2>
                </Alert>
              )}
              {message && (
                <Message variant='success'>{message.message}</Message>
              )}

              {userInfo && !userInfo.isVerified && show && (
                <Alert
                  variant='warning'
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <Alert.Heading>Verify Your Email Address</Alert.Heading>
                  <h6 className='text-2 mb-2'>
                    You are just Viewer Now. To be a creater and post amazing
                    posts,
                  </h6>
                  <Button variant='outline-warning' onClick={verifyHandler}>
                    Verify Email Address
                  </Button>
                </Alert>
              )}

              <PostCreater user={userInfo} history={history} />
              <PostList />
            </Col>
            <Col md={3} className='pl-0'>
              <h4>
                <i className='fas fa-user mb-2'></i> Let's Connect {users.length}
              </h4>
              {loading && <Loader />}
              {error && <Message>{error}</Message>}
              {users ? users.map((user) => <User user={user} />) : ''}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer background='bg-body_secondary' />
    </div>
  )
}

export default HomeScreen
