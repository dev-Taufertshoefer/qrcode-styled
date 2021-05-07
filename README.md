# Installation

```bash
    npm i qrcode-styled
```

# General Description

This library is based on [node-qrcode](https://www.npmjs.com/package/qrcode) with different options aiming to modify the QR codes's style. Number and type of output formats stay provided.

Please see the docs of node-qrcode for QR code related options (like mask pattern, QR code version etc.). The options described here only reference styling paremeters.

# Usage

## Styling Options

### Modules

### Position markers

## Global options

See [node-qrcode](https://www.npmjs.com/package/qrcode#qr-code-options). All options are supported except the `color` option, because this parameter refers to styling. You can style color of modules and position markers separately (see [`module style`](###Modules))

# Examples

## Node express example:



## NestJS expamle:
```typescript
    import { toDataURL } from 'qrcode-styled';

    export class AppController {
  
        @Get()
        createQRCode(@Res() res: any): any {

            const payload = 'text_hidden_behind_fuzzy_colored_schema'
            const options = {
                moduleStyle: {
                    type: 'square',
                    colordark: '#0D406C', 
                    colorlight: '#ffffffff'
                },
                positionMarker: {
                    squareType: 'none',
                    squareColor: '#7826E1',
                    innerType: 'square',
                    innerColor: '#19DE7F'
                },
            }
            toDataURL(payload, options).then((resp) => {

                res.send(`<html lang="en">
                                <head>
                                    <style type="text/css">
                                        .container {
                                            background-color: aqua;
                                        }
                            
                                    </style>
                                </head>
                                <body class="container">
                                    <style>
                                        .qr-code {
                                            background-color: white;
                                            height: 40rem;
                                            width: 40rem;
                                            text-align: center;
                                            background-image: url('${resp}');
                                            background-repeat: no-repeat;
                                        }
                                    </style>
                                    <div class="qr-code"> </div>
                                </body>
                            </html>`)
            })
            
        }
    }
```

If you are using Typescript, please add

```javascript
    "qrcode-styled": [
        "../qrcode-styled/bin"
    ],

```
to your `paths` key in `tsconfig.json`.

# License

[MIT](https://choosealicense.com/licenses/mit/)

# Project Status

This is my first project and not yet suitable for integration. Not typed.