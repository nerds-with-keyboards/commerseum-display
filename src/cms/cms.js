import CMS from "netlify-cms-app";

import ScenePreview from "./preview-templates/ScenePreview";
import PlaylistPreview from "./preview-templates/PlaylistPreview";

CMS.registerPreviewTemplate("scene", ScenePreview);
CMS.registerPreviewTemplate("playlist", PlaylistPreview);

// import youtube from 'netlify-cms-widget-youtube'
// CMS.registerPreviewStyle('/styles.css')
// CMS.registerWidget('youtube', youtubeControl, youtubePreview)
