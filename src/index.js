

const dataURL = require('../renderer/dataUrl');
const Utils = require('./utils');

exports.toDataURL = async function toDataURL(payload, opts) {

    if (opts.image && typeof opts.image === 'string') {
        const imageBuf = await Utils.getImageFile(opts.image);
        opts.errorCorrectionLevel = 'H';
        opts.image = imageBuf;
    }

    return new Promise((resolve, reject) => {

        const asyncHelper = (err, val) => {
            if (err) return reject(err); 
            return resolve(val);
        }
        dataURL.render(payload, opts, asyncHelper)
    });

}
