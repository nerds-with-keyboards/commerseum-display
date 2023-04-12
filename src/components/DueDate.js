import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
// import Img from 'gatsby-image'
// import ReactMarkdown from 'react-markdown
import { markdown } from 'markdown'
import Content from '../components/Content'
import Img from 'gatsby-image'

// const backgroundUrl = `https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?ixlib=rb-0.3.5&auto=format&fit=crop&w=2000&q=80` backgroundImage: `url(${backgroundUrl})`,

export const DueDatesTemplate = ({ dates }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(0,0,0,0)',
      height: '100vh',
      width: '100vw',
    }}
  >
    {dates.map(e => (
      <DueDateTemplate key={e.title} info={e} />
    ))}
  </div>
)

const getColorForGender = gender => {
  switch (gender) {
    case 'boy':
      return 'lightblue'
    case 'girl':
      return 'lightpink'
    default:
      return 'lightyellow'
  }
}

export const DueDateTemplate = ({ info }) => (
  <div
    style={{
      background: getColorForGender(info.gender),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      margin: '32px 32px 0 32px',
    }}
  >
    {!!info.image && (
      <Img
        sizes={info.image.childImageSharp.sizes}
        // position="absolute"
        // style={{ width: '100vw', height: '100vh', zIndex: '-1', position: 'absolute' }}
        style={{
          // display: 'inline-block',
          borderRadius: '50%',
          height: '192px',
          width: '192px',
          margin: '32px',
          zIndex: '55',
        }}
      />
    )}
    {/* <img
      src={info.image}
      style={{
        display: 'inline-block',
        borderRadius: '50%',
        height: '192px',
        margin: '32px',
      }}
    /> */}
    <div
      style={{
        display: 'inline-block',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '0 32px',
        borderRadius: '4px',
        margin: '32px',
      }}
    >
      <h2 style={{ fontSize: '4rem' }}>{info.title}</h2>
      <h3 style={{ fontSize: '4rem' }}>
        <span style={{ textTransform: 'capitalize' }}>{info.gender}</span> due
        in{' '}
        {// info.dueDate
        Math.round(
          Math.abs(
            (new Date(info.dueDate).getTime() - Date.now()) /
              (24 * 60 * 60 * 1000)
          )
        )}{' '}
        days!
      </h3>
    </div>
  </div>
)
