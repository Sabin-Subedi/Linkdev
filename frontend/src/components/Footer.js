import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
const Footer = ({ background }) => {
  return (
    <footer className={background}>
      <Container>
        <Row className='footer align-items-center justify-content-between'>
          <Col md={6}>
            <span>Copyright &copy;linkdev </span>
            <span>v1.0</span>
          </Col>
          <Col
            md={6}
            className='ml-auto text-right d-flex flex-wrap align-items-center justify-content-end'
          >
            <LinkContainer to='/privacy' className='mx-2'>
              <span className='mx-1'>Privacy & Policy</span>
            </LinkContainer>
            <LinkContainer to='/privacy'>
              <span className='mx-1'>Report a Bug</span>
            </LinkContainer>
            <LinkContainer to='/privacy'>
              <i className='icon fab fa-github mx-2'></i>
            </LinkContainer>
            <LinkContainer to='/privacy'>
              <i className='icon fab fa-discord mx-2'></i>
            </LinkContainer>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

Footer.defaultProps = {
  background: 'bg_body_primary',
}

export default Footer
