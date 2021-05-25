import { Alert } from 'react-bootstrap'
import React from 'react'

const Message = ({ variant, children }) => {
  return (
    <Alert className='mt-4' variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'danger',
  children: 'danger',
}

export default Message
