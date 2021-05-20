const sharp = require('sharp');
const StyleUtils = require('./styleUtils');
// const bytes = new Uint8Array(resizedImage);
// const buf2 = Buffer.from(bytes).toString('base64')
// console.log('bufferlength', bytes, 'data:image/png;base64,'+ buf2);

exports.imageBuffer = async function imageBuffer(fileData) {

    const resultBuffer = await sharp(fileData).ensureAlpha(1).toBuffer();

    return resultBuffer;
}

getImageDimensions = async function getImageDimensions(qrSize, scale, imageBuffer) {

  const width = qrSize * scale;
  const totalPx = Math.pow(width, 2);
  const maxPxCoverable = Math.floor(totalPx * 0.2);
  const maxCovSideLength = Math.floor(Math.sqrt(maxPxCoverable));
  
  const resizedImage = await sharp(imageBuffer)
      .resize({ 
        width: maxCovSideLength,
        height: maxCovSideLength,
        fit: sharp.fit.inside 
      })
      .raw()
      .toBuffer({ resolveWithObject: true})

  return resizedImage;
 
}

findTopLeftPixelForImage = function findTopLeftPixelForImage(symbolSize, imageDimensions) {
  
  const qrCenter = StyleUtils.findCoordOfOddPixelFlanksRechtangle(symbolSize, symbolSize);
  const imgCenter = StyleUtils.findCoordOfOddPixelFlanksRechtangle(imageDimensions.width, imageDimensions.height);
  
  const topLeftPxWithinQRSymbol = qrCenter.abs - imgCenter.y * symbolSize - imgCenter.x;
  
  return topLeftPxWithinQRSymbol; 
}

exports.insertImage = async function insertImage (imgData, allInfos) {

        const resizedImageInHex = await getImageDimensions(allInfos.size, allInfos.scale, allInfos.image);

        const chls = 4;
        const qrRow = allInfos.symbolSize;
        const startPx = findTopLeftPixelForImage(allInfos.symbolSize,
          { width: resizedImageInHex.info.width,
            height: resizedImageInHex.info.height
          })//qrRow * (allInfos.margin * allInfos.scale);
        console.log('startPx', startPx)

        const imageToInsert = resizedImageInHex.data;
        const imgWidhtPx = resizedImageInHex.info.width;
        const imgHeightPx = resizedImageInHex.info.height;

        for (r=0; r < imgHeightPx; r++) {

          for (i = 0; i < imgWidhtPx; i++) {

            let posDstImage = (r * imgWidhtPx + i) * chls;
            let posDst = (startPx + r * qrRow + i) * chls;

            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst] = imageToInsert[posDstImage];

          }
        }

    return imgData

}