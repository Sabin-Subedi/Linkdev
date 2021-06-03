import React from 'react'
import { Row, Image, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function User() {
  return (
    <Row>
      <LinkContainer to='/profile'>
        <Col md={10} className='d-flex my-2 align-items-center'>
          <Image
            src='/uploads/image-1622391058080.png'
            style={{ width: '40px', height: '40px' }}
            fluid='true'
            roundedCircle
          />
          <h6 className='ml-2'>Sabin Subedi</h6>
        </Col>
      </LinkContainer>
    </Row>
  )
}

export default User
