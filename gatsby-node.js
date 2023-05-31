const _ = require("lodash");
const path = require("path-browserify");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  fmImagesToRelative(node);
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// link collections
exports.sourceNodes = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;

  const nodes = getNodes();

  // link scenes to collections
  // first, build an index
  const scenesByPlaylistIndex = {};
  // Playlist -> Scenes Index build
  nodes
    .filter(
      (node) =>
        node.internal.type === `MarkdownRemark` &&
        !!node.frontmatter &&
        node.frontmatter.templateKey === `playlist`
    )
    .forEach((playlist) => {
      // console.log(playlist)
      if (!!playlist.frontmatter.scenes) {
        playlist.frontmatter.scenes.forEach((sceneLink) => {
          console.log(sceneLink);
          const match = nodes.find(
            (scene) =>
              scene.internal.type === `MarkdownRemark` &&
              !!scene.frontmatter &&
              scene.frontmatter.templateKey === `scene` &&
              scene.frontmatter.title === sceneLink.title
          );

          if (!!match) {
            console.log(match);
            if (!scenesByPlaylistIndex[playlist.id])
              scenesByPlaylistIndex[playlist.id] = [];

            scenesByPlaylistIndex[playlist.id].push(match.id);
          }
        });
      }
    });

  // next, use the index to create the links
  Object.entries(scenesByPlaylistIndex).forEach(([playlistId, sceneIds]) => {
    // link in graphql
    createNodeField({
      node: getNode(playlistId),
      name: `scenes`,
      value: sceneIds,
    });
  });

  // link scenes/playlists to screens
  // nodes
  //   .filter(
  //     node =>
  //       node.internal.type === `MarkdownRemark` &&
  //       !!node.frontmatter &&
  //       node.frontmatter.templateKey === `screen`
  //   )
  //   .forEach(screen => {
  //     // console.log(screen)
  //     if (!!screen.frontmatter.scene) {
  //       // console.log('checking scene')
  //       const match = nodes.find(
  //         scene =>
  //           scene.internal.type === `MarkdownRemark` &&
  //           !!scene.frontmatter &&
  //           scene.frontmatter.templateKey === `scene` &&
  //           scene.frontmatter.title === screen.frontmatter.scene
  //       )
  //
  //       if (!!match) {
  //         // console.log(match)
  //         // link in graphql
  //         createNodeField({
  //           node: screen,
  //           name: `scene`,
  //           value: match.id,
  //         })
  //       }
  //     }
  //
  //     if (!!screen.frontmatter.playlist) {
  //       const match = nodes.find(
  //         playlist =>
  //           playlist.internal.type === `MarkdownRemark` &&
  //           !!playlist.frontmatter &&
  //           playlist.frontmatter.templateKey === `playlist` &&
  //           playlist.frontmatter.title === screen.frontmatter.playlist
  //       )
  //
  //       if (!!match) {
  //         // console.log(match)
  //         // link in graphql
  //         createNodeField({
  //           node: screen,
  //           name: `playlist`,
  //           value: match.id,
  //         })
  //       }
  //     }
  //   })
};
