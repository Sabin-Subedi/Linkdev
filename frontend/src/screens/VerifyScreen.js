import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { logout } from '../actions/authActions'
import Footer from '../components/Footer'
import Meta from '../components/Meta'

const VerifyScreen = ({ location, history }) => {
  const dispatch = useDispatch()
  const query = location.search

  useEffect(() => {
    if (query && query.toString() === '?verified') {
      dispatch(logout())
    }
    if (!query) {
      history.push('/')
    }
  }, [dispatch, query, history])

  return (
    <>
      <Meta title='Verify - Linkdev' />
      {query && query.toString() === '?verified' ? (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{ minHeight: '90vh' }}
        >
          <Card className='rounded-lg col-md-4 text-center p-5'>
            <Card.Title className=' text-3 text-primary'>
              Your Account Has Been Verified
            </Card.Title>

            <i
              className='fal fa-check-circle text-primary my-4'
              style={{ fontSize: '10rem' }}
            ></i>
            <Card.Body>
              <p className='text-2'>
                We have Succesfully verified your account. Now you are the
                creator of our community and post your posts.
              </p>
            </Card.Body>

            <Link to='/' className='btn btn-primary btn-lg text-white'>
              Continue
            </Link>
          </Card>
        </div>
      ) : (
        query &&
        query.toString() === '?notverified' && (
          <div
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: '90vh' }}
          >
            <Card className='rounded-lg col-md-4 text-center p-5'>
              <Card.Title className=' text-3 text-danger'>
                Account Verification Failed
              </Card.Title>

              <i
                className='fal fa-times-circle text-danger my-4'
                style={{ fontSize: '10rem' }}
              ></i>
              <Card.Body>
                <p className='text-2'>
                  We couldn't Verify your account. There was some error in the
                  process. Please contact{' '}
                  <span class='text-danger'>Sabin Subedi</span> From the link
                  below.
                </p>
              </Card.Body>

              <a
                href='https://www.messenger.com/t/100003158884234'
                className='btn btn-danger btn-lg text-white'
              >
                Contact Us
              </a>
            </Card>
          </div>
        )
      )}
      <Footer />
    </>
  )
}

export default VerifyScreen
