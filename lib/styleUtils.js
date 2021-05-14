const Styling = require('./basicStyling');
const ImgStyling = require('./imgStyling');

exports.styleImageData = function qrToImageData (imgData, allInfos) {
    
    imgData.fill(255)

    Styling.positionMarkerStyling(imgData, allInfos);
    Styling.dataAreaStyling(imgData, allInfos);
    ImgStyling.insertImage(imgData, allInfos);

};

function hex2rgba (hex) {
    if (typeof hex === 'number') {
      hex = hex.toString()
    }
  
    if (typeof hex !== 'string') {
      throw new Error('Color should be defined as hex string')
    }
  
    var hexCode = hex.slice().replace('#', '').split('')
    if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
      throw new Error('Invalid hex color: ' + hex)
    }
  
    // Convert from short to long form (fff -> ffffff)
    if (hexCode.length === 3 || hexCode.length === 4) {
      hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
        return [c, c]
      }))
    }
  
    // Add default alpha value
    if (hexCode.length === 6) hexCode.push('F', 'F')
  
    var hexValue = parseInt(hexCode.join(''), 16)
  
    return {
      // channels:
      r: (hexValue >> 24) & 255,
      g: (hexValue >> 16) & 255,
      b: (hexValue >> 8) & 255,
      a: hexValue & 255, // alpha => opacity
      hex: '#' + hexCode.slice(0, 6).join('')
    }
  }

function getScale (qrSize, width, margin, scale) {
    return width && width >= qrSize + margin * 2
      ? width / (qrSize + margin * 2)
      : scale
}

exports.getImageWidth = function getImageWidth (qrSize, width, margin, scale) {
    var scale = getScale(qrSize, width, margin, scale)
    return Math.floor((qrSize + margin * 2) * scale)
} 

exports.convertOptsToRaw = function convertOptsToRaw(styledOpts) {

    // overwrite with styled opts or set default of qrcode
    //  (default setting also covered by qrcode, but for the sake of overview)
    const colorDark = styledOpts.colorDark ? styledOpts.colorDark : '#000000ff';
    const colorLight = styledOpts.colorLight ? styledOpts.colorLight : '#ffffffff';
    const type = styledOpts.type ? styledOpts.type : undefined; // dependant on method
    const margin = styledOpts.margin ? styledOpts.margin : 4;
    const errorCorrectionLevel = styledOpts.errorCorrectionLevel ? styledOpts.errorCorrectionLevel : 'M';
    const maskPattern = styledOpts.maskPattern ? styledOpts.maskPattern : undefined; // best fitting logic
    const scale = styledOpts.scale ? styledOpts.scale : 4;
    const width = styledOpts.width ? styledOpts.width : undefined; // dependant on scale
    const version = styledOpts.version ? styledOpts.version : undefined; //best fitting logic
    const toSJISFunc = styledOpts.toSJISFunc ? styledOpts.toSJISFunc : undefined;
    const rendererOpts = styledOpts.rendererOpts ? styledOpts.rendererOpts : undefined; // includes rendererOpts.quality

    const rawOpts = {
        errorCorrectionLevel,
        maskPattern,
        margin,
        type, // for toDataURL() [default: 'png'], toString() [default: 'utf8'] only 
        scale,
        width,
        version,
        color: {
            dark: colorDark,
            light: colorLight,
        },
        toSJISFunc,
        rendererOpts,
    }

    return rawOpts;
}

exports.getStyleInfo = function getStyleInfo(resQR, styledOpts) {

    // (duplicate defaults setting)
    const size = resQR.modules.size;
    const scale = styledOpts.scale ? getScale(size, styledOpts.width, styledOpts.margin, styledOpts.scale) : 4;
    const margin = styledOpts.margin ? styledOpts.margin : 4;
    
    let moduleStyle = styledOpts.moduleStyle;
    if(typeof moduleStyle === 'undefined' || !moduleStyle) {
      moduleStyle.type = 'square' // 'rounded', 'square', 'star'
      moduleStyle.colordark = '#000000',
      moduleStyle.colorlight = '#ffffff'
    }
    let positionMarker = styledOpts.positionMarker;
    if(typeof positionMarker === 'undefined' || !positionMarker) {
      positionMarker.squareType = 'none',  // 'rounded','square', 'none'
      positionMarker.squareColor = '#000000',
      positionMarker.innerType = 'none', // 'dot', 'square', 'none'
      positionMarker.innerColor= '#000000'
  
    };
    const moduleColor = [hex2rgba(moduleStyle.colorlight), hex2rgba(moduleStyle.colordark)]

    return {
        data: resQR.modules.data, // 01 for dark, 00 for light module; from left upper corner, by row, from left to right.
        version: styledOpts.version,
        size,
        // width: styledOpts.width,
        scale,
        margin,
        symbolSize: Math.floor((size + margin * 2) * scale), // qr code size length/height in px
        scaledMargin: margin * scale,
        moduleColor,
        moduleStyle: {
          type: moduleStyle.type,
          colordark: moduleColor[1],
          colorlight: moduleColor[0]
        },
        positionMarker: {
          squareType: positionMarker.squareType,
          squareColor: hex2rgba(positionMarker.squareColor),
          innerType: positionMarker.innerType,
          innerColor: hex2rgba(positionMarker.innerColor),
        },
        image: styledOpts.image,
        rendererOpts: styledOpts.rendererOpts || {} // best QR version size in px depending on scale factor
      }
}
