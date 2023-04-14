# Commerseum Display v2

Currently WIP. Based on Gatsby + Decap CMS Starter. For the older still-working version, please see the [v1 branch](https://github.com/nerds-with-keyboards/commerseum-display/tree/v1).

**Note:** This starter uses [Gatsby v4](https://www.gatsbyjs.com/gatsby-4/).

The web app harnesses the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Features

- A simple digital signage application based on Decap CMS
- Create playlists and scenes from decap CMS admin page
- Uses Bulma for styling, but size is reduced by `gatsy-plugin-purgecss`
- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- Uses `gatsby-plugin-image` with Decap CMS preview support
- Netlify deploy configuration
- ..and more

## Prerequisites

- [Volta](https://volta.sh) to install Node etc
- Node.js version 18+ (Volta will recognize in package.json)

### Access Locally

Pulldown a local copy of the Github repository Netlify created for you, with the name you specified in the previous step

```
$ git clone https://github.com/nerds-with-keyboards/commerseum-display.git
$ cd commerseum-display
$ npm i
$ npm start
```

This uses [Netlify Dev](https://www.netlify.com/products/dev/?utm_source=blog&utm_medium=netlifycms&utm_campaign=devex) CLI feature to serve any functions you have in the `netlify/functions` folder.

To test the CMS locally, you'll need to run a production build of the site:

```
$ npm serve
```

### Setting up the CMS

Follow the [Decap CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting for production.

If you want use Decap CMS locally, run the site in one terminal with `npm run start` and in another
Terminal you can use `npx netlify-cms-proxy-server` which proxy requests so you'll be automatically logged
in as a user on [http:localhost:3000/admin](http:localhost:3000/admin).

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

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).
