import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { register } from '../actions/authActions'
import Footer from '../components/Footer'
import Message from '../components/Message'
import Meta from '../components/Meta'

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [validated, setValidated] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo, validated])

  const submitHandler = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      dispatch(register(email, password, name, date))
    }

    setValidated(true)
  }

  return (
    <>
      <Meta title='Create Your Account' />
      <Container>
        <Row className='login_mainContent align-items-center justify-content-between'>
          <Col md={5}>
            <Image src='./logo.svg' fluid='true' />
            <p className='my-2 text_desc'>
              Connect with developers all around the world on Linkdev
            </p>
          </Col>
          <Col md={5} className='bg-body_secondary p-5 rounded-lg'>
            <h1 className='mb-0'>Create Account</h1>
            <p className='text-blue_secondary mt-0 mb-1'>It's quick and easy</p>
            {error && <Message>{error}</Message>}
            {/* {loading && <Loader />} */}

            <Form onSubmit={submitHandler} noValidate validated={validated}>
              <Form.Group className='mb-1' controlId='name'>
                <Form.Label className='form_label mb-1'>Full Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className='bg-body_tertiary border-0 text-blue_secondary rounded'
                    type='text'
                    placeholder='Name'
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a Username
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-1' controlId='email'>
                <Form.Label className='mb-1 form_label'>
                  Email Adress
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className='bg-body_tertiary border-0 text-blue_secondary rounded'
                    type='text'
                    placeholder='Email Address'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    Please enter valid Email
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className='mb-1' controlId='password'>
                <Form.Label className='form_label mb-1'>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className='bg-body_tertiary border-0 text-blue_secondary rounded'
                    type='password'
                    placeholder='New Password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a Password
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId='Birthdate'>
                <Form.Label className='form_label mb-1'>Birthdate</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className='bg-body_tertiary border-0 text-blue_secondary rounded'
                    type='date'
                    placeholder='Birthdate'
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                  ></Form.Control>
                  <Form.Control.Feedback type='valid'>
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type='invalid'>
                    Please enter a Birthdate
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Button
                className='text-white'
                type='submit'
                variant='primary'
                block
              >
                Sign Up
              </Button>
            </Form>
            <p className='text-0 mt-1'>
              By clicking Sign Up, you accept our{' '}
              <Link to={'/forgotpassword'}>Privacy Policy </Link> and{' '}
              <Link>Terms of Service.</Link>
            </p>

            <hr className='bg-blue_secondary border-bottom-2' />
            <Row>
              <Col>
                <LinkContainer to='/login'>
                  <Button
                    className='text-white'
                    type='submit'
                    variant='blue_primary'
                    block
                  >
                    Sign In
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

export default RegisterScreen
