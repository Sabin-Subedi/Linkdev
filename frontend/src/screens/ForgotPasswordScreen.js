import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Container, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'
import { forgotEmail } from '../actions/authActions'
import Footer from '../components/Footer'
import Message from '../components/Message'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const forgetEmail = useSelector((state) => state.forgetEmail)
  const { error, success } = forgetEmail

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(forgotEmail(email))
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
            <h1>Forgot Password</h1>
            <p className='text-secondary text-0'>
              Please enter your registered email address. An email notification
              with a password reset link will then be sent to you.
            </p>
            {success && (
              <Message variant='success'>
                Password Reset Link Sent To Your Email.
              </Message>
            )}
            {error && <Message>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Control
                  className='bg-body_tertiary border-0 text-blue_secondary'
                  size='lg'
                  type='email'
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

export default ForgotPasswordScreen
