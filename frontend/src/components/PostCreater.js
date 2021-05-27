import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PostModal from './PostModal'

const PostCreater = ({ user }) => {
  const [modalShow, setModalShow] = useState(false)

  const [alertShow, setAlertShow] = useState(false)

  const userAvatar = useSelector((state) => state.userAvatar)
  const { avatar: avy } = userAvatar

  const [avatar, setAvatar] = useState(user && user.avatar)

  useEffect(() => {
    if (JSON.stringify(avy) !== '{}') {
      setAvatar(avy)
    }
  }, [avy])

  const clickHandler = () => {
    if (user && !user.isVerified) {
      setAlertShow(true)
    } else {
      setModalShow(true)
    }
  }

  return (
    <>
      {alertShow && (
        <Alert variant='danger' onClose={() => setAlertShow(false)} dismissible>
          Your Email is not verified to post on Linkdev. Verify Your Email To
          Post{' '}
        </Alert>
      )}

      <Card className='rounded-lg p-2'>
        <Row className='p-2 px-4  align-items-center'>
          <Col md={12} className='d-flex'>
            <Image
              className=' mr-2'
              src={avatar}
              style={{ width: '10%' }}
              fluid='true'
              roundedCircle
            />

            <Button
              className='btn_post_create btn-body_tertiary rounded-pill text-left capital'
              block
              size='lg'
              onClick={clickHandler}
              // disabled={user && !user.isVerified}
            >
              What on Your Mind, {user && user.name} ?
            </Button>
          </Col>
        </Row>
      </Card>
      <PostModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default PostCreater
