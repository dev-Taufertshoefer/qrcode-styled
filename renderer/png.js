const PNG = require('pngjs').PNG
const StyleUtils = require('../lib/styleUtils');
const ImgStyling = require('../lib/imgStyling');

exports.render = async function render (allInfos) {

  const pngOpts = allInfos.rendererOpts
  const width = allInfos.width;
  const margin = allInfos.margin;
  const scale = allInfos.scale;

  const size = StyleUtils.getImageWidth(allInfos.size, width, margin, scale)

  pngOpts.width = size;
  pngOpts.height = size;

  const pngImage = new PNG(pngOpts)
  StyleUtils.styleData(pngImage.data, allInfos);

  if (allInfos.image) {
    pngImage.data = await ImgStyling.insertImage(pngImage.data, allInfos);
  }

  return pngImage;
}

