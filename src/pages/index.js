import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import { graphql } from "gatsby";

export default class IndexPage extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { data } = this.props;
    const { edges: playlistsAndScenes } = data.allMarkdownRemark;
    const scenes = playlistsAndScenes.filter(
      e => e.node.frontmatter.templateKey === "scene"
    );
    const playlists = playlistsAndScenes.filter(
      e => e.node.frontmatter.templateKey === "playlist"
    );

    return (
      <div
        style={{
          overflow: "scroll",
          height: "100vh",
        }}
      >
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Commerseum</h1>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content">
              <h2>List of playlists</h2>
            </div>
            {playlists.map(({ node: playlist }) => (
              <div
                className="content"
                style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
                key={playlist.id}
              >
                <h3>{playlist.frontmatter.title}</h3>
                <p>{playlist.frontmatter.date}</p>
                <p>{playlist.excerpt}</p>
                <p>
                  <Link className="button is-small" to={playlist.fields.slug}>
                    {playlist.fields.slug}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content">
              <h2>List of scenes</h2>
            </div>
            {scenes.map(({ node: scene }) => (
              <div
                className="content"
                style={{ border: "1px solid #eaecee", padding: "2em 4em" }}
                key={scene.id}
              >
                <h3>{scene.frontmatter.title}</h3>
                <p>{scene.frontmatter.date}</p>
                <p>{scene.excerpt}</p>
                <p>
                  <Link className="button is-small" to={scene.fields.slug}>
                    {scene.fields.slug}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { templateKey: { regex: "/scene|playlist|screen/" } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            # image
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
