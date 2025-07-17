# Commerseum Display

An open-source digital signage application built with Gatsby v4 and Decap CMS. [Check out a demo instance.](https://commerseum-display.netlify.app)

**Note:** This starter uses [Gatsby v4](https://www.gatsbyjs.com/gatsby-4/).

The web app harnesses the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment and CDN distribution.

## Features

- A simple digital signage application based on Decap CMS
- Create playlists and scenes from Decap CMS admin page
- Clock display with time and date
- Support for images, videos, and text overlays
- Automatic scene rotation in playlists
- Uses Bulma for styling, but size is reduced by `gatsby-plugin-purgecss`
- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- Uses `gatsby-plugin-image` with Decap CMS preview support
- Netlify deploy configuration
- ..and more

## Prerequisites

- [Volta](https://volta.sh) to install Node etc
- Node.js version 18+ (Volta will recognize in package.json)
- Yarn, npm

### Access Locally

Pulldown a local copy of the Github repository, either this one or your own fork:

```
$ git clone https://github.com/nerds-with-keyboards/commerseum-display.git
$ cd commerseum-display
$ yarn install
$ yarn develop  # or yarn dev
```

To test the CMS locally, you'll need to run a production build of the site:

```
$ yarn serve
```

### Setting up the CMS

Follow the [Decap CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting for production.

If you want use Decap CMS locally, run the site in one terminal with `yarn develop` and in another
Terminal you can use `npx netlify-cms-proxy-server` which proxy requests so you'll be automatically logged
in as a user on [http://localhost:8000/admin](http://localhost:8000/admin).

## Debugging

Windows users, who aren't using [WSL](https://docs.microsoft.com/en-us/windows/wsl/about), might encounter `node-gyp` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.

```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp "NPM node-gyp page").

MacOS and WSL users who might also encounter some errors, check [node-gyp](https://github.com/nodejs/node-gyp) for more info. We recommend using the latest stable node version.

## Purgecss

This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.

# CONTRIBUTING

Contributions are always welcome, no matter how large or small!
