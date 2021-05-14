const { readFile } = require('fs');
const imgStyling = require('../lib/imgStyling')

exports.getImageFile = function getImageFile(absolutePath) {

    return new Promise((resolve, reject) => {
        
        readFile(absolutePath, (err, data) => {
            if(err) reject(err);
            
            let resultBuffer = data;
            resultBuffer = imgStyling.imageBuffer(data);

            resolve(resultBuffer)
        })

    });

}