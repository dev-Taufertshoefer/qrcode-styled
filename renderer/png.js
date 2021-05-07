const PNG = require('pngjs').PNG
const StyleUtils = require('../lib/styleUtils');

exports.render = function render (allInfos) {

  const pngOpts = allInfos.rendererOpts
  const width = allInfos.width;
  const margin = allInfos.margin;
  const scale = allInfos.scale;

  const size = StyleUtils.getImageWidth(allInfos.size, width, margin, scale)

  pngOpts.width = size;
  pngOpts.height = size;

  const pngImage = new PNG(pngOpts)
  
  StyleUtils.styleImageData(pngImage.data, allInfos)

  return pngImage;
}

