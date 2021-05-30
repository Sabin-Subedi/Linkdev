import { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import 'emoji-mart/css/emoji-mart.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateProfileAvatar } from '../actions/profileActions'
import Loader from './Loader'

function ProfileAvatarModal(props) {
  const dispatch = useDispatch()

  //eslint-disable-next-line
  const [uploading, setUploading] = useState(false)

  const userProfile = useSelector((state) => state.userProfile)
  const { profile } = userProfile

  const [avatar, setAvatar] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateProfileAvatar(avatar))

    props.onHide()
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setAvatar('')
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/v1/upload', formData, config)

      setAvatar(data.imagePath)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
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
          Edit Your Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploading && (
          <>
            <Loader />{' '}
            <h4 className='text-primary text-center mt-5'>
              Uploading Your Image....
            </h4>
          </>
        )}
        <Image
          src={avatar ? avatar : profile && profile.user && profile.user.avatar}
          fluid
        />
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.File
              className='border-0 text-color_primary font-weight-light'
              label='Upload Your Profile Picture'
              required
              onChange={uploadFileHandler}
            ></Form.File>
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

export default ProfileAvatarModal
