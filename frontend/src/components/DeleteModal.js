import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Are you sure you want to delete this post?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={props.onHide} variant='danger'>
          Delete
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Body>
    </Modal>
  )
}
