# Commerseum

This repo serves as the base repo for the beta version of Commerseum client!


## Info

Built with [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org): **[Demo Link](https://gatsby-netlify-cms.netlify.com/)**.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/) (todo: is it strictly required?)
- Yarn

## Getting Started
```
$ git clone https://github.com/floydnoel/commerseum.git
$ cd commerseum
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
