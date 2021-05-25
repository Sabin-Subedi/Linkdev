import React, { useState } from 'react'
import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../actions/postActions'

import DateFormat from './Date'

const Post = ({ post }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const alreadyLiked = post.likes.find(
    (r) => r.user.toString() === userInfo.id.toString()
  )

  const [comment, setComment] = useState()
  const [like, setLike] = useState(post.likes.includes(alreadyLiked))

  const [likeCount, setLikeCount] = useState(false)

  const likeHandler = () => {
    setLike(!like)
    setLikeCount(!likeCount)

    dispatch(likePost(post._id))
  }

  return (
    <>
      <Card className='rounded-lg my-4'>
        <Card.Body className='px-0 py-1'>
          <Row className='p-2 px-2 align-items-center justify-content-between'>
            <LinkContainer to={`/profile/${post.user}`}>
              <Col md={8} className='d-flex align-items-center cursor'>
                <Image
                  src={post.avatar}
                  style={{ width: '50px', height: '50px' }}
                  fluid='true'
                  roundedCircle
                />
                <div className='ml-3'>
                  <h6 className='text-2 text-primary mb-0'>{post.name}</h6>
                  <DateFormat>{post.date}</DateFormat>
                </div>
              </Col>
            </LinkContainer>

            <Col md={4} className='text-right pr-4'>
              <i className='fas fa-ellipsis-v icon'></i>
            </Col>
          </Row>

          {post.postImage ? (
            <>
              <p className='pl-2 my-1 text-2'>{post.text}</p>
              <Card.Img src={post.postImage} fluid />
            </>
          ) : (
            <h2 className='pl-2 my-1 '>{post.text}</h2>
          )}

          <ListGroup className='px-3' variant='flush'>
            <ListGroup.Item>
              <Row className='align-items-center justify-content-between'>
                <Col className='text-left'>
                  <i className='fas fa-thumbs-up text-primary mr-2'></i>
                  <span>{post.likes.length} Likes</span>
                </Col>
                <Col className='text-right'>
                  <span>{post.comments.length} Comments</span>
                  <i className='fas fa-comment-alt text-primary ml-2'></i>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='align-items-center justify-content-between'>
                <Col className='text-left font-weight-light post_button'>
                  <span
                    className={`${
                      like ? 'text-primary' : 'text-color_primary'
                    }`}
                    onClick={likeHandler}
                  >
                    <i
                      className={` fa-thumbs-up icon ${
                        like ? 'fas' : 'fal'
                      }  mr-2`}
                    ></i>
                    <span className='text-2'>Like</span>
                  </span>
                </Col>
                <Col className='text-center font-weight-light post_button'>
                  <i className='fal fa-comment-alt icon  mr-2'></i>
                  <span className='text-2'>Comment</span>
                </Col>
                <Col className='text-right font-weight-light post_button'>
                  <i className='fal fa-share icon  mr-2'></i>
                  <span className='text-2'>Share</span>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='align-items-center '>
                <Col md={10} className='px-0 d-flex'>
                  <Image
                    className=' mr-2'
                    src={userInfo && userInfo.avatar}
                    style={{ width: '10%' }}
                    fluid='true'
                    roundedCircle
                  />
                  <InputGroup style={{ width: '90%' }}>
                    <FormControl
                      className='bg-body_tertiary border-0 text-blue_secondary rounded-pill'
                      type='text'
                      placeholder='Write a comment'
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    ></FormControl>
                  </InputGroup>
                </Col>
                <Col md={2}>
                  <Button variant='primary rounded-pill px-4' size='small'>
                    Post
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )
}

export default Post
