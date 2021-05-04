
exports.getPositionmarkerDarkModules = function getPositionmarkerDarkModules (qrSize) {

    let positionMarkerModules = new Array(Math.pow(qrSize,2))
    positionMarkerModules.fill(0)
    const innerModules = exports.getPositionmarkerInnerDarkModules(qrSize)
    const squareModules = exports.getPositionmarkerSquareDarkModules(qrSize)
  
    for (i=0; i < positionMarkerModules.length ; i++) {
      positionMarkerModules[i] = innerModules[i] + squareModules[i]
    }
  
    return positionMarkerModules;
  }
  
exports.getPositionmarkerInnerDarkModules = function getPositionmarkerInnerDarkModules(qrSize) {

let positionMarkerModules = new Array(qrSize * qrSize)
positionMarkerModules.fill(0)

const rowsIdxTop = [2,3,4]
const colsIdxTop = [2,3,4, qrSize-1-4, qrSize-1-3, qrSize-1-2]

const rowsIdxBottom = [qrSize-1-4, qrSize-1-3, qrSize-1-2]
const colsIdxBottom = [2,3,4]

rowsIdxTop.forEach( (r) => {
    colsIdxTop.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})
rowsIdxBottom.forEach( (r) => {
    colsIdxBottom.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})

return positionMarkerModules;
}
  
exports.getPositionmarkerSquareDarkModules = function getPositionmarkerSquareDarkModules(qrSize) {

let positionMarkerModules = new Array(qrSize * qrSize);
positionMarkerModules.fill(0);

const rowsIdxBorderXTop = [0,6]
const colsIdxBorderXTop = [0,1,2,3,4,5,6, qrSize-1-6, qrSize-1-5,qrSize-1-4, qrSize-1-3,qrSize-1-2, qrSize-1-1, qrSize-1]

const rowsIdxBorderXBottom = [qrSize-1-6,qrSize-1]
const colsIdxBorderXBottom = [0,1,2,3,4,5,6]

const rowsIdxBorderYTop = [1,2,3,4,5]
const colsIdxBorderYTop = [0, 6, qrSize-1-6, qrSize-1]

const rowsIdxBorderYBottom = [qrSize-1-5, qrSize-1-5, qrSize-1-4, qrSize-1-3, qrSize-1-2, qrSize-1-1]
const colsIdxBorderYBottom = [0,6]

rowsIdxBorderXTop.forEach( (r) => {
    colsIdxBorderXTop.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})

rowsIdxBorderXBottom.forEach( (r) => {
    colsIdxBorderXBottom.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})


rowsIdxBorderYTop.forEach( (r) => {
    colsIdxBorderYTop.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})

rowsIdxBorderYBottom.forEach( (r) => {
    colsIdxBorderYBottom.forEach( (c) => {
    positionMarkerModules[r*qrSize + c] = 1
    })
})

return positionMarkerModules;
}
  
exports.getDataDarkModules = function getDataDarkModules(qrSize, qrData) {

//qrData alreday contains position marker modules. Remove them:
let qrDataModules = [...qrData];
const pmModules = exports.getPositionmarkerDarkModules(qrSize)
pmModules.forEach( (pmm, i) => {
    qrDataModules[i] = pmm === 1 ? 0 : qrDataModules[i]
})

return qrDataModules
}

exports.addMarginAsModules = function addMarginAsModules (positionDarkModules, qrSize, margin) {
  
    let qrWithMarginModules = new Array((qrSize + 2*margin)*margin).fill(0) //set up with upper margin
    const bottomMargin = [...qrWithMarginModules]
  
    for (let row = 0; row < qrSize; row++) {
      
      for( let n = 0; n < margin ; n++) {
        qrWithMarginModules.push(0)
      }
      for (let col = 0; col < qrSize ; col++) {
        qrWithMarginModules.push(positionDarkModules[row*qrSize + col])
      }
      for( let n = 0; n < margin ; n++) {
        qrWithMarginModules.push(0)
      }
    }
  
    qrWithMarginModules = qrWithMarginModules.concat(bottomMargin)
  
    return qrWithMarginModules
}