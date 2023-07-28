import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import SceneComponent from "../components/SceneComponent";

const Scene = ({ data }) => {
  // const { frontmatter } = data.markdownRemark
  const { image, video, screenText } = data.markdownRemark.frontmatter;

  return <SceneComponent image={image} video={video} screenText={screenText} />;
};

Scene.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default Scene;

export const scenePageQuery = graphql`
  query Scene($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        video
        screenText
      }
    }
  }
`;
