import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import { login } from '../actions/authActions'

import { LinkContainer } from 'react-router-bootstrap'
import Footer from '../components/Footer'
// import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')

  // const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Container>
        <Row className='login_mainContent align-items-center justify-content-between'>
          <Col md={5}>
            <Image src='./logo.svg' fluid='true' />
            <p className='my-2 text_desc'>
              Connect with developers all around the world on Linkdev
            </p>
          </Col>
          <Col md={5} className='bg-body_secondary p-5 rounded-lg'>
            <h1>Reset Password</h1>
            <p className='text-secondary text-1'>
              Enter your email address to request password change
            </p>
            {/* {error && <Message>{error}</Message>} */}
            {/* {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Control
                  className='bg-body_tertiary border-0 text-blue_secondary'
                  size='lg'
                  type='text'
                  placeholder='Email Address'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                className='text-white'
                type='submit'
                variant='primary'
                size='lg'
                block
              >
                Request Password Reset
              </Button>
            </Form>

            <hr className='bg-blue_secondary border-bottom-2 mb-2 mt-4' />

            <p className='d-block text-primary text-center my-0'>
              Remember Password ?
            </p>
            <Row className='py-3'>
              <Col>
                <LinkContainer to='/login'>
                  <Button
                    className='text-white'
                    type='submit'
                    variant='blue_primary'
                    size='lg'
                    block
                  >
                    Login
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default LoginScreen
