import React, { Fragment } from "react";
import ReactPlayer from "react-player";
import { GatsbyImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";

export const MarkdownHtml = ({ markdownText }) => (
  <div
    style={{
      width: "calc(100vw - 128px)",
      background: "rgba(0,0,0,0.64)",
      color: "white",
      padding: "64px",
      borderRadius: "32px",
      fontSize: "2rem",
      position: "absolute",
      zIndex: "4",
      left: "64px",
      textAlign: "center", // TODO: EVALUATE
    }}
  >
    <ReactMarkdown>{markdownText ?? ""}</ReactMarkdown>
  </div>
);

class SceneComponent extends React.Component {
  render() {
    const { image, video, onEnded, screenText } = this.props;

    return (
      <Fragment>
        {!!image ? (
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            position='absolute'
            alt=''
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-1",
              position: "absolute",
            }}
          />
        ) : (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: "-1",
              position: "absolute",
              background: "black",
            }}
          />
        )}

        <div
          style={{
            width: "100vw",
            height: "100vh",
            background: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!!screenText && <MarkdownHtml markdownText={screenText} />}
          {!!video && (
            <ReactPlayer
              url={video}
              playing
              ref='player'
              height='100%'
              width='100%'
              // loop // has to be absent for now, due to
              // https://github.com/CookPete/react-player/issues/496
              playsinline
              onEnded={!!onEnded ? onEnded : () => this.refs.player.seekTo(0)} // the second function simulates looping (for the loop issue)
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
        </div>
      </Fragment>
    );
  }
}

export default SceneComponent;
