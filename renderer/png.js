const PNG = require('pngjs').PNG
const Utils = require('./utils')

exports.render = function render (qrData, styledOpts) {

  const pngOpts = allInfos.rendererOpts
  const width = alllInfos.width;
  const margin = allInfos.margin;
  const scale = allInfos.scale;

  const size = Utils.getImageWidth(allInfos.size, width, margin, scale)
  // const size = Utils.getImageWidth(qrData.modules.size, opts)

  pngOpts.width = size
  pngOpts.height = size

  const pngImage = new PNG(pngOpts)
  const imgData = Utils.qrToImageData(pngImage.data, styledOpts)

  return imgData
}
