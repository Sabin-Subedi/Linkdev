import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner
        className='mt-5'
        animation='border'
        role='status'
        variant='primary'
        style={{ width: '10rem', height: '10rem' }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
