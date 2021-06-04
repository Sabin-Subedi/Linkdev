import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostById } from '../actions/postActions'

export default function DeleteModal(props) {
  const dispatch = useDispatch()

  const deletedPost = useSelector((state) => state.deletedPost)
  const { success } = deletedPost

  const deletePostHandler = () => {
    dispatch(deletePostById(props.id))
    if (success) {
      props.onHide()
    }
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton style={{ borderBottom: 'none' }}>
        <Modal.Title id='contained-modal-title-vcenter text-1'>
          Are you sure you want to delete this post?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          size='lg'
          className='mr-3 px-4'
          onClick={deletePostHandler}
          variant='danger'
        >
          Delete
        </Button>
        <Button
          onClick={props.onHide}
          size='lg'
          className='bg-transparent text-color_primary px-4 border-0'
        >
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  )
}
