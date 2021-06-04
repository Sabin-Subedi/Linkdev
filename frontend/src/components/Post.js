import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Dropdown,
  FormControl,
  Image,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost, likePost } from '../actions/postActions'

import DateFormat from './Date'
import moment from 'moment'
import { Link } from 'react-router-dom'
import DeleteModal from './DeleteModal'

const Post = ({ post, postScreen }) => {
  const dispatch = useDispatch()

  const commentInput = useRef(null)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const commentStatus = useSelector((state) => state.commentStatus)

  const alreadyLiked = post.likes.find((r) =>
    r.user ? r.user.toString() === userInfo.id.toString() : ''
  )

  const [comment, setComment] = useState('')
  const [like, setLike] = useState(post.likes.includes(alreadyLiked))

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [commentCount, setCommentCount] = useState(
    post && post.comments && post.comments.length
  )

  const userAvatar = useSelector((state) => state.userAvatar)
  const { avatar: avy } = userAvatar

  const [avatar, setAvatar] = useState(userInfo && userInfo.avatar)

  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    if (JSON.stringify(avy) !== '{}') {
      setAvatar(avy)
    }
  }, [avy])

  const commentButtonHandler = () => {
    commentInput.current.focus()
  }

  const likeHandler = () => {
    setLike(!like)
    // setLikeCount(!likeCount)
    if (!like) {
      setLikeCount(likeCount + 1)
    } else {
      setLikeCount(likeCount - 1)
    }
    dispatch(likePost(post._id))
  }

  const commentHandler = () => {
    dispatch(commentPost(comment, post._id))
    setCommentCount(commentCount + 1)
    setComment('')
  }

  return (
    <>
      <Card className='rounded-lg my-4'>
        <Card.Body className='px-0 py-1'>
          <Row className='p-2 px-2 align-items-center justify-content-between'>
            <LinkContainer to={`/profile/${post.user}`}>
              <Col sm={8} className='d-flex align-items-center cursor'>
                <Image
                  src={post.avatar}
                  style={{ width: '50px', height: '50px' }}
                  fluid='true'
                  alt={post.name}
                  roundedCircle
                />
                <div className='ml-3'>
                  <h6 className='text-2 text-primary mb-0 capital'>
                    {post.name}
                  </h6>
                  <DateFormat>{post.date}</DateFormat>
                </div>
              </Col>
            </LinkContainer>

            <Col sm={4} className='text-right pr-4'>
              {/* <i className='fas fa-ellipsis-v icon'></i> */}
              {post.user.toString() === userInfo.id.toString() && (
                <Dropdown alignRight>
                  <Dropdown.Toggle
                    className='bg-transparent border-0 text-color_primary dp_delete'
                    id='dropdown-delete'
                  >
                    <i className='fas fa-ellipsis-v icon'></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setModalShow(true)}>
                      <i className='fas fa-trash mr-2'></i>Delete Post
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={post._id}
              />
            </Col>
          </Row>

          {post.postImage ? (
            <>
              <p className='pl-2 my-1 text-2'>{post.text}</p>
              <Card.Img src={post.postImage} alt={post.name} fluid />
            </>
          ) : (
            <h2 className='pl-2 my-1 '>{post.text}</h2>
          )}

          <ListGroup className='px-3' variant='flush'>
            <ListGroup.Item>
              <Row className='align-items-center justify-content-between'>
                <Col className='text-left'>
                  <i className='fas fa-thumbs-up text-primary mr-2'></i>
                  <span>{likeCount} Likes</span>
                </Col>
                <Col className='text-right'>
                  <span>{commentCount} Comments</span>
                  <i className='fas fa-comment-alt text-primary ml-2'></i>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='align-items-center justify-content-between'>
                <Col className='text-left font-weight-light post_button'>
                  <span
                    className={`${
                      like ? 'text-primary' : 'text-color_primary hover '
                    } `}
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
                  <span className='hover' onClick={commentButtonHandler}>
                    <i className='fal fa-comment-alt icon  mr-2'></i>
                    <span className='text-2'>Comment</span>
                  </span>
                </Col>
                <Col className='text-right font-weight-light post_button'>
                  <span className='hover'>
                    <i className='fal fa-share icon  mr-2'></i>
                    <span className='text-2'>Share</span>
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className='text-center'>
              {postScreen &&
                post.comments &&
                post.comments.map((comment) => (
                  <Row className={`align-items-center mb-2`}>
                    <Col
                      md={12}
                      className='px-0 text-left d-flex align-items-center'
                    >
                      <Image
                        className=' mr-2'
                        src={comment.avatar}
                        alt={comment.user}
                        style={{ width: '8%' }}
                        fluid='true'
                        roundedCircle
                      />
                      <div className='bg-body_tertiary p-2 px-4 rounded-pill d-flex flex-column  justify-content-center'>
                        <h6
                          className='mb-0 text-1 d-flex align-items-center'
                          style={{ textTransform: 'capitalize' }}
                        >
                          {comment.name} &nbsp;
                          <span className='text-0 text-secodary font-weight-light my-auto'>
                            -&nbsp;
                            {moment(comment && comment.commentdate).format(
                              'Do MMMM,h:mm a'
                            )}
                          </span>
                        </h6>
                        <p className='mb-0 text-1'>{comment.commentText}</p>
                      </div>
                    </Col>
                  </Row>
                ))}

              {!postScreen &&
                post.comments &&
                post.comments
                  .slice(commentCount - 2, commentCount)
                  .map((comment) => (
                    <Row className={`align-items-center mb-2`}>
                      <Col
                        md={12}
                        className='px-0 text-left d-flex align-items-center'
                      >
                        <Image
                          className=' mr-2'
                          src={comment.avatar}
                          alt={comment.user}
                          style={{ width: '8%' }}
                          fluid='true'
                          roundedCircle
                        />
                        <div className='bg-body_tertiary p-2 px-4 rounded-pill d-flex flex-column  justify-content-center'>
                          <h6
                            className='mb-0 text-1 d-flex align-items-center'
                            style={{ textTransform: 'capitalize' }}
                          >
                            {comment.name} &nbsp;
                            <span className='text-0 text-secodary font-weight-light my-auto'>
                              -&nbsp;
                              {moment(comment && comment.commentdate).format(
                                'Do MMMM,h:mm a'
                              )}
                            </span>
                          </h6>
                          <p className='mb-0 text-1'>{comment.commentText}</p>
                        </div>
                      </Col>
                    </Row>
                  ))}

              {!postScreen && commentCount > 2 && (
                <Link to={`/post/${post._id}`}>
                  <span className='mx-auto text-1 font-weight-light'>
                    View More Comments
                  </span>
                </Link>
              )}

              <Row className='align-items-center mt-2'>
                <Col md={10} className='px-0 d-flex'>
                  <Image
                    className=' mr-2'
                    src={avatar}
                    alt={userInfo.name}
                    style={{ width: '10%' }}
                    fluid='true'
                    roundedCircle
                  />
                  <InputGroup style={{ width: '90%' }}>
                    <FormControl
                      ref={commentInput}
                      className='bg-body_tertiary border-0 text-blue_secondary rounded-pill'
                      type='text'
                      placeholder='Write a comment'
                      value={comment}
                      size='lg'
                      required
                      onChange={(e) => setComment(e.target.value)}
                    ></FormControl>
                  </InputGroup>
                </Col>

                <Col md={2} className='px-1'>
                  <Button
                    onClick={commentHandler}
                    variant='primary rounded-pill px-4'
                    size='small'
                    disabled={!comment}
                  >
                    {commentStatus && commentStatus.loading
                      ? 'Posting'
                      : 'Post'}
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
