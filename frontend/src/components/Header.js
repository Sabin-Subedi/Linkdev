import React from 'react'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/authActions'

const Header = ({ history, user }) => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <Navbar
      className='shadow-sm'
      bg='body_primary'
      expand='lg'
      variant='dark'
      collapseOnSelect
      sticky='top'
    >
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <Image
              className='text-primary text-4 font-weight-bold'
              src='\logo.svg'
              style={{ width: '60%' }}
              alt='Linkdev'
              fluid
            ></Image>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto text-2'>
            <LinkContainer to='/'>
              <Nav.Link className='bg-body_tertiary text-primary p-2 px-3 rounded-lg'>
                <i className='fas fa-home mr-2 '></i>Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={`/profile/${user && user.id}`}>
              <Nav.Link className='d-flex text-1 align-items-center text-color_secondary'>
                <Image
                  src={user && user.avatar}
                  className='mx-2 '
                  fluid
                  roundedCircle
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                />{' '}
                {user && user.name}
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              className='bg-body_secondary text-white px-2 rounded-circle text-white'
              id='setting'
              alignRight
            >
              <LinkContainer to={`/profile/${user && user.id}`}>
                <NavDropdown.Item>
                  <i className='fas fa-user mr-2'></i> Profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/feedback'>
                <NavDropdown.Item>
                  <i className='fas fa-comment-alt mr-2'></i> Give Feedback
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/bug'>
                <NavDropdown.Item>
                  <i className='fas fa-bug mr-2'></i>Report a Bug
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/bug'>
                <NavDropdown.Item>
                  <i className='fab fa-discord mr-2'></i>Join Discord
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                <i className='fas fa-sign-out-alt mr-2'></i>Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
