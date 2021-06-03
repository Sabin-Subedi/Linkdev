import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { getUserPosts } from '../actions/postActions'
import Post from '../components/Post'
import Loader from '../components/Loader'
import { getProfileDetail } from '../actions/profileActions'
import ProfileModal from '../components/ProfileModal'
import ProfileAvatarModal from '../components/ProfileAvatarModal'
import Meta from '../components/Meta'
import Message from '../components/Message'

const ProfileScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [modalShow, setModalShow] = useState(false)
  const [AvatarModalShow, setAvatarModalShow] = useState(false)

  const userPostList = useSelector((state) => state.userPostList)
  const { posts, loading, error } = userPostList

  const userProfile = useSelector((state) => state.userProfile)
  const { profile, loading: loadingUser } = userProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    dispatch(getProfileDetail(userId))

    dispatch(getUserPosts(userId))
  }, [history, userInfo, dispatch, userId])

  const clickHandler = () => {
    setModalShow(true)
  }

  return (
    <>
      <Meta
        title={`${
          profile && profile.user && profile.user.name
            ? profile.user.name + ' -'
            : ''
        } Linkdev`}
      />
      <Header history={history} user={userInfo} />
      {loading && loadingUser ? (
        <Loader />
      ) : (
        <>
          <section className='profile_body'>
            <Container>
              <Row className='mt-4'>
                <Col md={5}>
                  <Card className='p-4 rounded-lg'>
                    <div className='card_image position-relative d-flex justify-content-center'>
                      <Card.Img
                        src={profile && profile.user && profile.user.avatar}
                        fluid
                        className='rounded-circle '
                        style={{ width: '70%' }}
                      />
                      {userInfo &&
                        profile &&
                        profile.user &&
                        userInfo.id === profile.user._id && (
                          <>
                            <ProfileAvatarModal
                              show={AvatarModalShow}
                              onHide={() => setAvatarModalShow(false)}
                            />
                            <div
                              onClick={() => setAvatarModalShow(true)}
                              className='image_icon icon'
                            >
                              <i className='fas fa-camera'></i>
                            </div>
                          </>
                        )}
                    </div>

                    <Card.Body className='text-left'>
                      <h1 className='text-5 font-weight-regular mb-0 name'>
                        {profile && profile.user && profile.user.name}
                      </h1>
                      <h2 className='text-3 text-color_secondary font-weight-light'>
                        {profile && profile.user && profile.user.isVerified
                          ? 'Creator'
                          : 'Viewer'}
                      </h2>
                      {profile && profile.bio && (
                        <p className='user_bio'>{profile && profile.bio}</p>
                      )}
                      {profile && profile.location && (
                        <p className='text-1 mb-1'>
                          <i className='fal fa-location text-color_secondary icon mr-2'></i>
                          {profile && profile.location}
                        </p>
                      )}

                      {profile && profile.website && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.website.startsWith('https://')
                              ? profile.website.split('//')[1]
                              : profile.website
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fal fa-link text-color_secondary  mr-2'></i>
                            {profile && profile.website.startsWith('https://')
                              ? profile.website.split('/')[
                                  profile.website.split('/').length - 1
                                ]
                              : profile.website}
                          </p>
                        </a>
                      )}

                      {profile && profile.facebook && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.facebook.startsWith('https://')
                              ? profile.facebook.split('//')[1]
                              : profile.facebook
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fab fa-facebook text-color_secondary  mr-2'></i>
                            {profile && profile.facebook.startsWith('https://')
                              ? profile.facebook.split('/')[
                                  profile.facebook.split('/').length - 1
                                ]
                              : profile.facebook}
                          </p>
                        </a>
                      )}
                      {profile && profile.instagram && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.instagram.startsWith('https://')
                              ? profile.instagram.split('//')[1]
                              : profile.instagram
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fab fa-instagram text-color_secondary  mr-2'></i>
                            {profile && profile.instagram.startsWith('https://')
                              ? profile.instagram.split('/')[
                                  profile.instagram.split('/').length - 1
                                ]
                              : profile.instagram}
                          </p>
                        </a>
                      )}
                      {profile && profile.github && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.github.startsWith('https://')
                              ? profile.github.split('//')[1]
                              : profile.github
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fab fa-github text-color_secondary  mr-2'></i>
                            {profile && profile.github.startsWith('https://')
                              ? profile.github.split('/')[
                                  profile.github.split('/').length - 1
                                ]
                              : profile.github}
                          </p>
                        </a>
                      )}
                      {profile && profile.twitter && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.twitter.startsWith('https://')
                              ? profile.twitter.split('//')[1]
                              : profile.twitter
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fab fa-twitter text-color_secondary  mr-2'></i>
                            {profile && profile.twitter.startsWith('https://')
                              ? profile.twitter.split('/')[
                                  profile.twitter.split('/').length - 1
                                ]
                              : profile.twitter}
                          </p>
                        </a>
                      )}

                      {profile && profile.linkedin && (
                        <a
                          rel='noreferrer'
                          target='_blank'
                          href={`https://${
                            profile.linkedin.startsWith('https://')
                              ? profile.linkedin.split('//')[1]
                              : profile.linkedin
                          }`}
                        >
                          <p className='text-1 mb-1'>
                            <i className='fab fa-linkedin text-color_secondary  mr-2'></i>
                            {(profile &&
                              profile.linkedin.startsWith('https://')) ||
                            profile.linkedin.startsWith('http://')
                              ? profile.linkedin.split('/')[
                                  profile.linkedin.split('/').length - 1
                                ]
                              : profile.linkedin}
                          </p>
                        </a>
                      )}
                      {userInfo &&
                        profile &&
                        profile.user &&
                        userInfo &&
                        userInfo.id &&
                        profile.user._id.toString() ===
                          userInfo.id.toString() && (
                          <Button
                            variant='outline-primary mt-4'
                            onClick={clickHandler}
                            block
                          >
                            Edit Profile
                          </Button>
                        )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={7}>
                  <h2>Your Posts</h2>

                  {error ? (
                    <Message>{error}</Message>
                  ) : loading ? (
                    <Loader />
                  ) : (
                    posts.map((post) => (
                      <Post
                        key={post._id}
                        post={post}
                        comment1={post.comments[post.comments.length - 2]}
                        comment2={post.comments[post.comments.length - 1]}
                      />
                    ))
                  )}
                </Col>
              </Row>
              {profile && (
                <>
                  <ProfileModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>
              )}
            </Container>
          </section>

          <Footer background='bg-body_secondary' />
        </>
      )}
    </>
  )
}

export default ProfileScreen
