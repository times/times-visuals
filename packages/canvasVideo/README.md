# Canvid

> This is the description for the component

## Installation

```bash
# Yarn
$ yarn add @times-visuals/canvid

# npm
$ npm add @times-visuals/canvid
```

## Usage

```js
import Canvid from "@times-visuals/canvid";

export default () => (
  <Canvid
    file="s3-eu-west-1.amazonaws.com/nuk-tnl-editorial-prod-staticassets/2019/bercow-sprite.png"
    frames={180}
    fps={60}
    cols={10}
    width={550}
    height={420}
  />
);

frames = Total number of frames in the sprite file
fps = Frames per second
cols = Total number of cols in the sprite file
width/height = Of the canvas itself
```

## FFmpeg

```js
To generate the frames used for the sprite file you need to run the following commands:

'ffmpeg -i bercow_no_back.mov -vf "fps=60,crop=950:950:525:40" frames/%3d.png'

And the following to stitch them back together:

'montage -border 0 -geometry 375x -tile 10x -quality 60% -background none frames/*.png myvideo.png'
```
