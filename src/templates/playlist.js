import React from "react";
import PropTypes from "prop-types";
import PlaylistComponent from "../components/PlaylistComponent";
import { graphql } from "gatsby";

const Playlist = ({ data }) => {
  const { frontmatter, fields } = data.markdownRemark;
  const { image, title, duration } = frontmatter;

  const validDuration =
    !isNaN(parseFloat(duration)) && isFinite(duration) ? duration : 8; // todo: pull out the hardcoded default into a config page

  return (
    <PlaylistComponent
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
                fluid(maxWidth: 4096, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            video
            screenText
            duration
          }
        }
      }
      frontmatter {
        title
        duration
        image {
          childImageSharp {
            fluid(maxWidth: 4096, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
