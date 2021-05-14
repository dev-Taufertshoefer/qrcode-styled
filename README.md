# Installation

```bash
    npm i qrcode-styled
```

# General Description

This library is based on [node-qrcode](https://www.npmjs.com/package/qrcode) with different options aiming to modify the QR codes's style. Number and type of output formats stay provided.

Please see the docs of node-qrcode for QR code related options (like mask pattern, QR code version etc.). The options described here only reference styling paremeters.

# Usage

### `toDataURL(payload, [options], [cb(error, url)]`

`toDataURL()`: \<Promise\>
`payload`: \<string\>.
`options`: {}. See [Styling](##Styling).
`cb()`: Callback function. 

## Styling

### Modules

There are two styling dimensions for modules:
* Shape of modules, defined by `type` key
* Color of modules, defined by `colordark` and `colorlight` keys

```typescript 
    const opts = {
        moduleStyle: {
            type: 'square',
            colordark: '#0D406C', 
            colorlight: '#ffffff'
        },
    }
```

`type`: \<string\>. Possible values: `'square'`, `'rounded'`. Default: `'square'`
`colordark`: \<string\>. Possible values: Hexadecimal color codes. Default: `'#000000'`
    Module color
`colorlight`: \<string\>. Possible values: Hexadecimal color codes. Default: `'#ffffff'`
    Background color

Note: If you don't choose white as background, or background and module color only differ slightly, please test the QR code for usability.


### Position markers

```typescript
    const opts = {
        moduleStyle: {},
        positionMarker: {
            squareType: 'none', // 'rounded','square', 'none'
            squareColor: '#7826E1',
            innerType: 'square', // 'dot', 'square', 'none'
            innerColor: '#19DE7F'
          },
    }
```

* `squareType`: \<string\>. Possible values: `'none'`, `'square'`. Default: `'none'`
    Type of the outer position marker frame
* `innerType`: \<string\>. Possible values: `'none'`, `'square'`. Default: `'none'`
    Type of the inner area of the position marker
* `squareColor`, `innerColor`: \<string\>. Possible values: `'none'`, `'square'`. Default: `'none'`

Note: If `moduleStyle.type = 'square'` there will be no difference between `positionMarker.squareType = 'none'` and `positionMarker.squareType = 'square'`. The same holds for `positionMarker.innerType` option.

<!-- ### Add an image

```typescript
    const opts = {
        moduleStyle: {},
        positionMarker: {},
        image: 'src/assets/image.svg',
    }
```

* With the image key, provide a path starting with the directory on the `nodes_modules` level. Path may have `/` or not. 

* You have to provide the file format suffix. You can provide the file in the following formats:
    | Image format |
    | ------------ |
    |     .svg     | -->
    

## Global options

See [node-qrcode](https://www.npmjs.com/package/qrcode#qr-code-options). All options are supported except the `color` option, because this parameter refers to styling. You can style color of modules and position markers separately (see [Modules](###Modules))

# Examples

## Node express example:



## NestJS expamle:
```typescript
    import { toDataURL } from 'qrcode-styled';

    export class AppController {
  
        @Get()
        createQRCode(@Res() res: any): any {

            const payload = 'text_hidden_behind_fuzzy_colored_schema'
            const opts = {
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
            toDataURL(payload, opts).then((resp) => {

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

Upcoming features:
*  insert image
* `positionMarker.squareType = 'rounded'`
* `positionMarker.innerType = 'dot'`
* `moduleStyle.type = 'star'`

This project is not yet suitable for integration. Not typed.
