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
              <span className='mx-1 cursor'>Privacy & Policy</span>
            </LinkContainer>
            <a href='https://www.privacypolicygenerator.info/live.php?'>
              <span className='mx-1 text-color_primary cursor'>
                Give Feedback
              </span>
            </a>

            <a
              href='https://discord.gg/8h4Cfj5enj'
              target='_blank'
              rel='noreferrer'
            >
              <i className='icon fab fa-discord mx-2 text-color_primary'></i>
            </a>
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
