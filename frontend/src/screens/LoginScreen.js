import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/authActions'

import { LinkContainer } from 'react-router-bootstrap'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Meta from '../components/Meta'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('?')[1] : '/'

  console.log(redirect)

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <>
      <Meta title='Linkdev - Login' />
      <Container>
        <Row className='login_mainContent align-items-center justify-content-between'>
          <Col md={5}>
            <Image src='./logo.svg' fluid='true' />
            <p className='my-2 text_desc'>
              Connect with developers all around the world on Linkdev
            </p>
          </Col>
          <Col md={5} className='bg-body_secondary p-5 rounded-lg'>
            <h1>Sign In</h1>
            {error && <Message>{error}</Message>}
            {/* {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label className='form_label'>
                  Username or Email
                </Form.Label>
                <Form.Control
                  className='bg-body_tertiary border-0 text-blue_secondary'
                  size='lg'
                  type='text'
                  placeholder='Enter Username or Email'
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className='bg-body_tertiary border-0'
                  size='lg'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                className='text-white'
                type='submit'
                variant='primary'
                size='lg'
                block
              >
                Sign In
              </Button>
            </Form>
            <Link to={'/forgotpassword'} className='d-block text-center mt-3'>
              Forgot Password?
            </Link>
            <hr className='bg-blue_secondary border-bottom-2' />
            <Row className='py-3'>
              <Col>
                <LinkContainer to='/register'>
                  <Button
                    className='text-white'
                    type='submit'
                    variant='blue_primary'
                    size='lg'
                    block
                  >
                    Create New Account
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
