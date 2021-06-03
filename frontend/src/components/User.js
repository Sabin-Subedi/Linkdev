import React from 'react'
import { Row, Image, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function User({ user }) {
  return (
    <Row>
      <LinkContainer to={`/profile/${user && user._id}`}>
        <Col md={10} className='d-flex my-2 align-items-center '>
          <Image
            src={user && user.avatar}
            style={{ width: '40px', height: '40px' }}
            fluid='true'
            roundedCircle
            className='cursor'
          />
          <h6 className='ml-2 cursor capital'>{user && user.name}</h6>
        </Col>
      </LinkContainer>
    </Row>
  )
}

export default User
