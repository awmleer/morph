# morph

[![Build Status](https://travis-ci.org/awmleer/morph.svg?branch=master)](https://travis-ci.org/awmleer/morph)

Use Markdown to create slides.

![demo](./doc/assets/demo.gif)


## Features

- Easy to use
- Page transition animation
- Auto hide cursor when it stops moving for about 2 seconds
- Pause mode (black screen)
- XSS protection


## Dev prepare
```bash
npm install
bower install
```

## Dev start script
```bash
npm run ng.watch
# after the first command succeeded:
npm run electron.watch
```

## Build Script

```bash
npm run build.prod
cp package.json ./dist/package.json
electron-packager dist morph --platform=win32 --overwrite
electron-packager dist morph --platform=darwin --overwrite
```

## Drawbacks

- App package is a little bit large
- Lack of user style support

## References

- [PageTransitions](https://github.com/codrops/PageTransitions)
- [Buttons](https://github.com/alexwolfe/Buttons/)
