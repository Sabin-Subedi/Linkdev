import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Loader from '../components/Loader'

function FeedbackScreen({ history }) {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <Header history={history} user={userInfo} />
      <Row>
        <Col md={3}></Col>
        <Col md={6} className='mt-2 bg-body_secondary rounded-lg p-4 my-5'>
          <iframe
            title='FeedbackForm'
            src='https://docs.google.com/forms/d/e/1FAIpQLSdhYJbAnYgT7OifGiDyFnproSkOVNNlBhDyPGGNc5bd7fYVpg/viewform?embedded=true'
            width='100%'
            height='2300'
            frameborder='0'
            marginheight='0'
            marginwidth='0'
          >
            <Loader />
          </iframe>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Footer background='bg-body_secondary' />
    </>
  )
}

export default FeedbackScreen
