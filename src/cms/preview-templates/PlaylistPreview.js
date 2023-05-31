import React from "react";
import PropTypes from "prop-types";
import PlaylistTemplate from "../../templates/scene";

const PlaylistPreview = ({ entry, widgetFor }) => (
  <PlaylistTemplate
    content={widgetFor("body")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "title"])}
  />
);

PlaylistPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PlaylistPreview;
