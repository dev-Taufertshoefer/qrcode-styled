const Modules = require('./getModules');

exports.dataAreaStyling = function dataAreaStyling (imgData, toImageDataOpts) {
    
    const size = toImageDataOpts.size
    const dim = size + 2*toImageDataOpts.margin
    const scale = toImageDataOpts.scale
    const colors = toImageDataOpts.moduleColor
    
    let darkModules = Modules.getDataDarkModules(toImageDataOpts.size, toImageDataOpts.data)
    darkModules = Modules.addMarginAsModules(darkModules, size, toImageDataOpts.margin);

    if( toImageDataOpts.moduleStyle.type === 'square') {

        imgData = exports.colorModulesSquare(darkModules, scale, dim, imgData, colors[1])
    }

    if( toImageDataOpts.moduleStyle.type === 'rounded') {
       
        imgData = exports.colorModulesRound(darkModules, scale, dim, imgData, colors)
    }
    
    return imgData;

}

exports.positionMarkerStyling = function positionMarkerStyling (imgData, allInfos) {

    const qrSize = allInfos.size
    const dim = qrSize + 2*allInfos.margin
    const scale = allInfos.scale

    const backgroundColor = allInfos.moduleColor[0]
    const squareColor = allInfos.positionMarker.squareColor
    const innerColor = allInfos.positionMarker.innerColor


    let squareDarkModules = Modules.getPositionmarkerSquareDarkModules(qrSize);
    squareDarkModules = Modules.addMarginAsModules(squareDarkModules, qrSize, allInfos.margin);

    let innerDarkModules = Modules.getPositionmarkerInnerDarkModules(qrSize);
    innerDarkModules = Modules.addMarginAsModules(innerDarkModules, qrSize, allInfos.margin);

    switch (allInfos.positionMarker.squareType) {
        case 'square' : {
            imgData = exports.colorModulesSquare(squareDarkModules, scale, dim, imgData, squareColor)
            break;
        }
        default: {
                if (allInfos.moduleStyle.type === 'square') {
    
                    imgData = exports.colorModulesSquare(squareDarkModules, scale, dim, imgData, squareColor)
        
                } else if (allInfos.moduleStyle.type === 'rounded' ) {
                    
                    imgData = exports.colorModulesRound(squareDarkModules, scale, dim, imgData, [backgroundColor,squareColor])
                }
                
            }
    }

    switch (allInfos.positionMarker.innerType) {

        case 'square' : {

            imgData = exports.colorModulesSquare(innerDarkModules, scale, dim, imgData, innerColor)
            break;
        }
   
        default: {
            if (allInfos.moduleStyle.type === 'square') {

                imgData = exports.colorModulesSquare(innerDarkModules, scale, dim, imgData, innerColor)
                
            } else if (allInfos.moduleStyle.type === 'rounded' ) {
                
                imgData = exports.colorModulesRound(innerDarkModules, scale, dim, imgData, [backgroundColor,innerColor])
            }
        }
    }

    return imgData
}

exports.colorModulesSquare = function colorModulesSquare(darkModules, scale, dim, imgData, color) {

    const hex = 4;

    for (let m = 0; m < darkModules.length; m ++) {

        if(darkModules[m] === 1) {
            
            const mCol = m%dim
            const mRow = ( m - mCol ) / dim
            const pxRow = ( mRow * dim * scale  + mCol ) * scale * hex

            for( pr=0; pr < scale ; pr++) {
                for (pc=0; pc < scale; pc++) {

                    const hexRow = pxRow + pr * dim * scale * hex
                    const hexCol = pc * hex
                    let posDst = (hexRow + hexCol)
                        
                    imgData[posDst++] = color.r
                    imgData[posDst++] = color.g
                    imgData[posDst++] = color.b
                    imgData[posDst] = color.a
                    
                }
            }

        }
    }

    return imgData
}

exports.colorModulesRound = function colorModulesRound(darkModules, scale, dim, imgData, colors) {

    const hex = 4
    const r = Math.floor(scale/2)

    for (let m = 0; m < darkModules.length; m ++) {

        if(darkModules[m] === 1) {

            const mCol = m%dim
            const mRow = ( m - mCol ) / dim
            const pxRow = ( mRow * dim * scale  + mCol ) * scale * hex

            for( pr=0; pr < scale ; pr++) {
                for (pc=0; pc < scale; pc++) {

                    const moduleCoordX = pr - r + 1
                    const moduleCoordY = pc - r + 1
                    const shapeFormula = Math.pow(moduleCoordX,2) + Math.pow(moduleCoordY,2) < Math.pow(r,2)
                    const color = shapeFormula ? colors[1] : colors[0]

                    const hexRow = pxRow + pr * dim * scale * hex
                    const hexCol = pc * hex
                    let posDst = (hexRow + hexCol)
                        
                    imgData[posDst++] = color.r
                    imgData[posDst++] = color.g
                    imgData[posDst++] = color.b
                    imgData[posDst] = color.a
                    
                }
            }

        }
    }

    return imgData

}