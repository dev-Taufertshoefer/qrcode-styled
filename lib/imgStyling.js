const sharp = require('sharp');

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

exports.insertImage = async function insertImage (imgData, allInfos) {
    
   
    if (allInfos.image) {

        const resizedImageInHex = await getImageDimensions(allInfos.size, allInfos.scale, allInfos.image);

        const chls = 4;
        const rowStartPx = (allInfos.symbolSize) * (allInfos.margin * allInfos.scale);
        const row = allInfos.symbolSize;

        const imageToInsert = resizedImageInHex.data;
        const imgWidhtPx = resizedImageInHex.info.width;
        const imgHeightPx = resizedImageInHex.info.height;

        for (i = 0; i < imgWidhtPx; i++) {

          for (j=0; j < imgHeightPx; j++) {
            
            let posDst = ((rowStartPx + i * row) + j) * chls;
            let posDstImage = (i * imgWidhtPx + j) * chls;

            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst++] = imageToInsert[posDstImage++];
            imgData[posDst] = imageToInsert[posDstImage];


          }
        }
    
        // const bytes = new Uint8Array(resizedImageInHex.data);
        // const buf2 = Buffer.from(bytes).toString('base64');
        // console.log('dataURL:','data:image/png;base64,'+ buf2);
´
        console.log('res image', imgData, imgData.length, resizedImageInHex)
        return imgData
    }
   
}