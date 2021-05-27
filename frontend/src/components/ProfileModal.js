import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import 'emoji-mart/css/emoji-mart.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../actions/profileActions'

function Profile(props) {
  const dispatch = useDispatch()

  const userProfile = useSelector((state) => state.userProfile)
  const { profile } = userProfile

  const [bio, setBio] = useState(profile.bio)
  const [location, setLocation] = useState(profile.location)
  const [facebook, setFacebook] = useState(profile.facebook)
  const [twitter, setTwitter] = useState(profile.twitter)
  const [github, setGithub] = useState(profile.github)
  const [website, setWebsite] = useState(profile.website)
  const [linkedin, setLinkedin] = useState(profile.linkedin)

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateProfile(bio, facebook, twitter, linkedin, github, website, location)
    )

    props.onHide()
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Your Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label className='form_label text-2'>Bio</Form.Label>
            <Form.Control
              className='bg-body_tertiary border-0 text-color_primary font-weight-light'
              size='lg'
              as='textarea'
              rows={4}
              placeholder='Add a Bio'
              value={bio ? bio : ''}
              required
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='location' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fal fa-map-marker-alt mr-2'></i> Location
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Location'
                value={location ? location : ''}
                required
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='website' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fal fa-link mr-2'></i> Website
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Website'
                value={website ? website : ''}
                required
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='twitter' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fab fa-twitter mr-2'></i> Twitter
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Your Twitter Profile URL'
                value={twitter ? twitter : ''}
                required
                onChange={(e) => setTwitter(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='github' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fab fa-github mr-2'></i> Github
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Your Github Profile URL'
                value={github ? github : ''}
                required
                onChange={(e) => setGithub(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='facebook' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fab fa-facebook mr-2'></i> Facebook
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Your Facebook Profile URL'
                value={facebook ? facebook : ''}
                required
                onChange={(e) => setFacebook(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group controlId='linkedin' as={Row}>
            <Form.Label column sm='2' className='form_label text-2 pr-0 '>
              <i className='fab fa-linkedin mr-2'></i> Linkedin
            </Form.Label>
            <Col className='pl-0' sm={10}>
              <Form.Control
                className='bg-body_tertiary border-0 ml-0 text-color_primary font-weight-light'
                size='lg'
                type='text'
                placeholder='Your Linkedin Profile URL'
                value={linkedin ? linkedin : ''}
                required
                onChange={(e) => setLinkedin(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            size='lg'
            className='mt-2 '
            block
          >
            Update Profile
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Profile
