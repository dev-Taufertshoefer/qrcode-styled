const qrCode = require('qrcode');

const Utils = require('../lib/styleUtils');
const pngRender = require('../renderer/png');

exports.render = function render (payload, opts, cb) {

    const optsRaw = Utils.convertOptsToRaw(opts);
    const rawQRCode = qrCode.create(payload, optsRaw);
    const allInfos = Utils.getStyleInfo(rawQRCode, opts);
    // const png = pngRender.render(allInfos);
    pngRender.render(allInfos)
      .then((png) => {
      
        const buffer = []
        png.on('error', (err) => { console.log(err)})

        png.on('data', function (data) {
          buffer.push(data)
        })

        png.on('end', function() {
            const output = Buffer.concat(buffer)
            let url = 'data:image/png;base64,'
            url += output.toString('base64');
            cb(null, url);
        })

        png.pack();

      }).catch((err) => cb(err, null));
   
}