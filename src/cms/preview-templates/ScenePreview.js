import React from 'react'
import PropTypes from 'prop-types'
import { SceneTemplate } from '../../templates/scene'

const ScenePreview = ({ entry, widgetFor }) => (
  <SceneTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

ScenePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ScenePreview
