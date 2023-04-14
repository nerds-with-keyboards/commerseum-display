# Commerseum Display

This branch serves as the base repo for v1 of Commerseum Display


## Info

Built with [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org).

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Volta (volta.sh) use it to install node & yarn
- Node (v10, v8)
- Yarn

## Getting Started
```
$ git clone https://github.com/nerds-with-keyboards/commerseum-display.git
$ cd commerseum-display
$ git checkout v1
$ yarn
$ yarn start
```
To test the CMS locally, you'll need run a production build of the site:
```
$ yarn run build
$ yarn run serve
```

### Windows users
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
