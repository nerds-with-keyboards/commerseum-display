import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
// import Img from 'gatsby-image'
// import ReactMarkdown from 'react-markdown'
import { markdown } from 'markdown'
import Content from '../components/Content'
import { DueDatesTemplate } from '../components/DueDate'
import Img from 'gatsby-image'

const styles = {
  centerTextContainer: {
    width: 'calc(100vw - 128px)',
    background: 'rgba(0,0,0,0.64)',
    color: 'white',
    padding: '64px',
    borderRadius: '32px',
    fontSize: '2rem',
    position: 'absolute',
    zIndex: '4',
    left: '64px',
    textAlign: 'center', // TODO: EVALUATE
  },
  backgroundImage: {
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    position: 'absolute',
  },
  flexParent: {
    width: '100vw',
    height: '100vh',
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBlack: {
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    position: 'absolute',
    background: 'black',
  },
}

export const MarkdownHtml = ({ markdownText }) => (
  <div style={styles.centerTextContainer}>
    <div
      dangerouslySetInnerHTML={{
        __html: markdown.toHTML(markdownText || ''),
      }}
    />
  </div>
)

class NewSceneTemplate extends React.Component {
  render() {
    const { image, video, onEnded, dueDates, screenText } = this.props
    return (
      <Fragment>
        {!!image ? (
          <Img
            sizes={image.childImageSharp.sizes}
            position="absolute"
            style={styles.backgroundImage}
          />
        ) : (
          <div style={styles.backgroundBlack} />
        )}

        <div style={styles.flexParent}>
          {!!dueDates &&
          Number.isInteger(dueDates.length) &&
          dueDates.length > 0 ? (
            <DueDatesTemplate dates={dueDates} />
          ) : (
            <Fragment>
              {!!screenText && <MarkdownHtml markdownText={screenText} />}
              {!!video && (
                <ReactPlayer
                  url={video}
                  playing
                  ref="player"
                  height="100%"
                  width="100%"
                  // loop // has to be absent for now, due to
                  // https://github.com/CookPete/react-player/issues/496
                  playsinline
                  onEnded={
                    !!onEnded ? onEnded : () => this.refs.player.seekTo(0)
                  } // the second function simulates looping (for the loop issue)
                  // onReady={ () => this.refs.player.seekTo(0) }
                  // config={{
                  //   file: {
                  //     attributes: {
                  //       poster: 'https://placeimg.com/640/480/tech/grayscale?t=1539204198900',
                  //     },
                  //   },
                  // }}
                />
              )}
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }
}

export { NewSceneTemplate }

const Scene = ({ data }) => {
  // const { frontmatter } = data.markdownRemark
  const { image, video, dueDates, screenText } = data.markdownRemark.frontmatter

  return (
    <NewSceneTemplate
      image={image}
      video={video}
      dueDates={dueDates}
      screenText={screenText}
    />
  )
}

Scene.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default Scene

export const scenePageQuery = graphql`
  query Scene($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        image {
          childImageSharp {
            sizes(maxWidth: 4096, quality: 100) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        video
        screenText
        dueDates {
          title
          gender
          dueDate
          image {
            childImageSharp {
              sizes(maxWidth: 4096, quality: 100) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
