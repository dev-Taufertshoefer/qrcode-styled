
const qrCode = require('qrCode');
const Utils = require('../lib/styleUtils');

exports.toDataURL = function toDataURL (payload, opts, cb) {

    const optsRaw = Utils.convertOptsToRaw(opts)
    const rawQRCode = qrCode.create(payload, optsRaw, cb)
    const input = Utils.getStyleInfo(rawQRCode, opts);
    const res = Utils.qrToImageData(input)

    return res;
}