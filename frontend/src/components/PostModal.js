import { useState } from 'react'
import { Badge, Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../actions/postActions'
import { LinkContainer } from 'react-router-bootstrap'

function PostModal(props) {
  const dispatch = useDispatch()

  //eslint-disable-next-line
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState(``)
  const [text, setText] = useState(``)
  const [picker, setPicker] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        'https://linkdev-sabin.herokuapp.com/v1/upload',
        formData,
        config
      )

      setImage(data)
      setUploading(false)
      console.log(data)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const emojiPickerStyle = {
    display: picker ? 'block' : 'none',
    position: 'absolute',
    zIndex: '100',
    right: '0',
    height: ' 20rem',
    width: '20rem',
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createPost(text, image))

    props.onHide()
    setText('')
    setImage('')
    setPicker(false)
  }

  const emojiOpener = () => {
    setPicker(!picker)
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter text-center'>
          Create Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='align-items-center justify-content-between'>
          <Col className=''>
            <LinkContainer to={`/profile/${userInfo && userInfo.id}`}>
              <div className='d-inline-flex align-items-center cursor capital '>
                <Image
                  src={userInfo && userInfo.avatar}
                  style={{ width: '50px', height: '50px' }}
                  fluid='true'
                  roundedCircle
                />

                <div className='ml-3'>
                  <h6 className='text-2 text-primary mb-0'>
                    {userInfo && userInfo.name}
                  </h6>
                  <Badge variant='blue_primary'>
                    {userInfo && userInfo.isVerified ? 'Creator' : 'Viewer'}
                  </Badge>
                </div>
              </div>
            </LinkContainer>
          </Col>
        </Row>

        <Form onSubmit={submitHandler} className='mt-2'>
          <Form.Group className='text'>
            <Form.Control
              className='create_input bg-body_secondary border-0 text-blue_secondary form_create'
              as='textarea'
              row={50}
              size='lg'
              placeholder={`What's on your mind, ${
                userInfo && userInfo.name
              } ?`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Form.Control>

            {image && <Image src={image} fluid block />}
          </Form.Group>

          <Form.Group className='file'>
            <Row className='align-items-center pr-5 postion-relative'>
              <Col md={6}>
                <Form.File
                  id='image-file'
                  className='bg-body_secondary d-inline-block'
                  label='Insert Image'
                  onChange={uploadFileHandler}
                ></Form.File>
              </Col>

              <div className='emoji_picker ml-auto  postion-relative'>
                <i
                  onClick={emojiOpener}
                  className='text-primary icon fal fa-smile-beam cursor'
                ></i>
                <Picker
                  set='google'
                  theme='dark'
                  title='Pick Your Emoji'
                  exclude={['flags']}
                  style={emojiPickerStyle}
                  onSelect={(emoji) => setText(text + emoji.native)}
                />
              </div>
            </Row>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            block
            disabled={!image && !text}
          >
            Post
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default PostModal
