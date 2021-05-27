import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Linkdev',
  keywords: 'social,media,community,linkdev,share',
  description:
    ' Log into Linkdev to start sharing and connecting with developers and be the part of best community in the world.',
}

export default Meta
