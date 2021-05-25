import React from 'react'
import moment from 'moment'

const DateFormat = ({ children }) => {
  return <p className='mb-0 text-secondary'>{moment(children).format('LLL')}</p>
}

export default DateFormat
