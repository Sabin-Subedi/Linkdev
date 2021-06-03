import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetPassword, verifyForgetToken } from '../actions/authActions'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ResetPasswordScreen({ match, history }) {
  const token = match.params.token

  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const tokenVerify = useSelector((state) => state.tokenVerify)
  const { loading, success, error } = tokenVerify

  const {
    loading: resetLoad,
    success: resetSuccess,
    error: resetError,
  } = useSelector((state) => state.resetPassword)

  useEffect(() => {
    dispatch(verifyForgetToken(token))

    if (resetSuccess) {
      history.push('/login?passwordChanged')
    }
  }, [dispatch, token, resetSuccess, history])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password.toString() === confirmPassword.toString()) {
      dispatch(resetPassword(token, password))
    } else {
      setPasswordError(
        `Your Password and Confirm Password didn't matched. Try Again`
      )
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : success ? (
        <>
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: '90vh' }}
          >
            <Card className='rounded-lg col-md-4 text-center p-4'>
              <Card.Title className=' text-3 text-primary'>
                Reset Your Account Password
              </Card.Title>
              <i
                className='fal fa-fingerprint text-primary my-4'
                style={{ fontSize: '5rem' }}
              ></i>
              <Card.Body>
                {passwordError && <Message>{passwordError}</Message>}
                {resetError && <Message>{resetError}</Message>}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='password'>
                    <Form.Control
                      className='bg-body_tertiary border-0 text-blue_secondary'
                      size='lg'
                      type='password'
                      placeholder='Enter Your New Password'
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId='confirmPassword'>
                    <Form.Control
                      className='bg-body_tertiary border-0 text-blue_secondary'
                      size='lg'
                      type='password'
                      placeholder='Re-Enter Your New Password'
                      value={confirmPassword}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    className='text-white'
                    type='submit'
                    variant='primary'
                    size='lg'
                    block
                  >
                    {resetLoad
                      ? 'Resetting Your Password....'
                      : 'Reset Password'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          <Footer />
        </>
      ) : (
        error && (
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: '90vh' }}
          >
            <Card className='rounded-lg col-md-4 text-center p-5'>
              <Card.Title className=' text-3 text-danger'>
                Reset Password Failed
              </Card.Title>

              <i
                className='fal fa-exclamation-triangle text-danger my-4'
                style={{ fontSize: '10rem' }}
              ></i>
              <Card.Body>
                <p className='text-2'>
                  There was some error while sending you a reset link. Click the
                  button below to get the reset link again.
                </p>
              </Card.Body>

              <Link
                to='/forgotpassword'
                className='btn btn-danger btn-lg text-white'
              >
                Get the Reset Link Again
              </Link>
            </Card>
          </div>
        )
      )}
    </>
  )
}

export default ResetPasswordScreen
