
const dataURL = require('../renderer/dataUrl');

exports.toDataURL = function toDataURL(payload, opts) {

    return new Promise((resolve, reject) => {
        
        const asyncHelper = (err, val) => {
            if (err) return reject(err); 
            return resolve(val);
        }
        dataURL.render(payload, opts, asyncHelper)
    });

}
