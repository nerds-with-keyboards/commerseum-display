import React from "react";
import PropTypes from "prop-types";
import { NewSceneTemplate, scenePageQuery } from "./scene";
import { graphql } from "gatsby";

class PlaylistTemplate extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    const { scenes, duration } = this.props;
    if (!!scenes) {
      const first = scenes[0];
      if (!!first && !!first.frontmatter) {
        const sceneDuration = first.frontmatter.duration;
        const validDuration =
          !isNaN(parseFloat(sceneDuration)) &&
          isFinite(sceneDuration) &&
          sceneDuration > 0
            ? sceneDuration
            : duration || 8;
        // console.log(validDuration)
        const durationToUse = Math.round(validDuration * 1000);

        this.state = {
          sceneIndex: 0,
          activeScene: first,
        };

        !!first.frontmatter.video
          ? void 0
          : setTimeout(this.advanceScene, durationToUse);
      }
    }
  }

  render() {
    if (!this.state || !this.state.activeScene)
      return "Error: unable to render playlist.";

    const { image, video, dueDates, screenText } =
      this.state.activeScene.frontmatter;

    // console.log(this.props)
    console.log(screenText);

    return (
      <div>
        {!!this.state.activeScene && (
          <NewSceneTemplate
            image={image}
            video={video}
            dueDates={dueDates}
            onEnded={() => this.advanceScene()}
            screenText={screenText}
          />
        )}
      </div>
    );
  }

  advanceScene = () => {
    // alert('scene over, advancing to next scene in playlist')
    const { sceneIndex } = this.state;
    const { scenes, duration } = this.props;
    const nextIndex = sceneIndex < scenes.length - 1 ? sceneIndex + 1 : 0;
    const nextScene = scenes[nextIndex];
    // alert(
    //   `${JSON.stringify(this.state)}, ${nextIndex}, ${JSON.stringify(
    //     nextScene
    //   )}`
    // )

    this.setState({
      sceneIndex: nextIndex,
      activeScene: nextScene,
    });

    const sceneDuration = nextScene.frontmatter.duration;
    const validDuration =
      !isNaN(parseFloat(sceneDuration)) &&
      isFinite(sceneDuration) &&
      sceneDuration > 0
        ? sceneDuration
        : duration || 8;

    // alert(`${sceneDuration}, ${duration}, ${validDuration}`)

    const durationToUse = Math.round(validDuration * 1000);

    !!nextScene.frontmatter.video
      ? void 0
      : setTimeout(this.advanceScene, durationToUse);
  };
}

PlaylistTemplate.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  duration: PropTypes.number,
  scenes: PropTypes.any.isRequired, // todo: get specific
};

export { PlaylistTemplate };

const Playlist = ({ data }) => {
  const { frontmatter, fields } = data.markdownRemark;
  const { image, title, duration } = frontmatter;

  const validDuration =
    !isNaN(parseFloat(duration)) && isFinite(duration) ? duration : 8; // todo: pull out the hardcoded default into a config page

  return (
    <PlaylistTemplate
      image={image}
      title={title}
      scenes={fields.scenes}
      duration={validDuration}
    />
  );
};

Playlist.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      fields: PropTypes.object,
      frontmatter: PropTypes.object,
    }),
  }),
};

export default Playlist;

export const playlistPageQuery = graphql`
  query Playlist($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        scenes {
          frontmatter {
            title
            image {
              childImageSharp {
                sizes(maxWidth: 4096, quality: 100) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            video
            screenText
            duration
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
      frontmatter {
        title
        duration
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
`;
