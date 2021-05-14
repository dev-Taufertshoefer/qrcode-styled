const sharp = require('sharp');

// const bytes = new Uint8Array(resizedImage);
// const buf2 = Buffer.from(bytes).toString('base64')
// console.log('bufferlength', bytes, 'data:image/png;base64,'+ buf2);

exports.imageBuffer = async function imageBuffer(fileData) {

    const resultBuffer = await sharp(fileData)
                        .png()
                        .toBuffer();

    return resultBuffer;
}


exports.insertImage = async function insertImage (imgData, allInfos) {
    
    if (allInfos.image) {
        const insertImageInfos = await getImageDimensions(allInfos.size, allInfos.scale, allInfos.image);
        const offSet = insertImageInfos.startCoordXY;
        const firstImage = new Uint8Array(imgData)
    
        // const resImage = await sharp(imgData)
        //     .rotate(90)
        //     .composite([{ 
        //         input: insertImageInfos.resizedImage,
        //         raw: {
        //             channels: 4,
        //             width: insertImageInfos.width,
        //             height: insertImageInfos.width,
        //         }, 
        //         top: offSet,
        //         left: offSet }])
            // .png()
            // .toBuffer()
    
        // const resImage = Buffer.concat(imgData, insertImageInfos.resizedImage)
        
    
        const bytes = new Uint8Array(resImage);
        const buf2 = Buffer.from(bytes).toString('base64')
        console.log('dataURL:','data:image/png;base64,'+ buf2);
    
        return resImage;
        // return imgData
    }
   
}

getImageDimensions = async function getImageDimensions(qrSize, scale, imageBuffer) {

    const width = qrSize * scale;
    const totalPx = Math.pow(width, 2);
    const maxPxCoverable = Math.floor(totalPx * 0.3);
    const maxCovSideLength = Math.floor(Math.sqrt(maxPxCoverable));
  
    const startCoordXY = Math.floor((width - maxCovSideLength) / 2);
    const resizedImage = await sharp(imageBuffer)
        .resize(maxCovSideLength, maxCovSideLength)
        .png()
        .toBuffer()

    return {
      width:  maxCovSideLength,
      startCoordXY,
      resizedImage
    }
   
  }


exports.getImageDimensions = function getImageDimensions(qrSize, scale) {

    const width = qrSize * scale
    const totalPx = Math.pow(width, 2);
    const maxPxCoverable = Math.floor(totalPx * 0.3)
    const maxCovSideLength = Math.floor(Math.sqrt(maxPxCoverable));
  
    const startCoordXY = Math.floor((width - maxCovSideLength) / 2);
  
    return {
      width:  maxCovSideLength,
      startCoordXY,
      resizedImage: '',
    }
   
  }