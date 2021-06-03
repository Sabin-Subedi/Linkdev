import React from 'react'
import { Row, Image, Col } from 'react-bootstrap'

function User() {
  return (
    <Row>
      <Col md={10}>
        <Image
          src='/uploads/image-1622391109878.png'
          style={{ width: '50px', height: '50px' }}
          fluid='true'
          roundedCircle
        />
      </Col>
    </Row>
  )
}

export default User
