# switchbot-api

[![npm](https://img.shields.io/npm/v/switchbot-api)](https://www.npmjs.com/package/switchbot-api)
![npm](https://img.shields.io/npm/dw/switchbot-api?label=↓)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/aoephtua/switchbot-api/blob/master/LICENSE)

Node.js library to communicate with official [SwitchBot API](https://github.com/OpenWonderLabs/SwitchBotAPI). It provides elementary functionalities to control devices.

## Installing

Using npm:

    $ npm install switchbot-api

Once the package is installed, you can import the classes:

```javascript
import SwitchBotApi, { SwitchBotBlindTilt } from 'switchbot-api';
```

## Usage

```javascript
const switchBotApi = new SwitchBotApi(token, secret);

const devices = await switchBotApi.getDevices();
```

See [examples](examples) to get an insight.

## Devices

- [SwitchBotBlindTilt](src/devices/switchBotBlindTilt.mjs)

## License

This project is licensed under [MIT](LICENSE).
