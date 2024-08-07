advlib-ble-gatt
===============

Wireless packet decoding library for Bluetooth Low Energy GATT data.  __advlib-ble-gatt__ is typically used as a library for [advlib-ble](https://github.com/reelyactive/advlib-ble) which itself is commonly a processor module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib).

![Overview of advlib-ble-gatt](https://reelyactive.github.io/advlib-ble-gatt/images/overview.png)

__advlib-ble-gatt__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib-ble-gatt) with no dependencies.


Installation
------------

    npm install advlib-ble-gatt


Hello advlib-ble-gatt!
----------------------

```javascript
const advlib = require('advlib-ble-gatt');

let protocolSpecificData = {
  gatt: [ { serviceUuid: "1c930003d45911e79296b8e856369374",
            characteristicUuid: "1c930038d45911e79296b8e856369374",
            value: "480d" },
          { serviceUuid: "1c930003d45911e79296b8e856369374",
            characteristicUuid: "1c930032d45911e79296b8e856369374",
            value: "c019" } ]
};

let processedData = advlib.processProtocolSpecificData(protocolSpecificData);

console.log(processedData);
```

Which should yield the following console output:

    { batteryVoltage: 3.4, temperature: 25.75 }

The __advlib-ble-gatt__ library observes [these standard properties](https://github.com/reelyactive/advlib#standard-properties).


Supported Services
------------------

The following services, in order of their UUID, are supported by __advlib-ble-gatt__.

| Service UUID(s)                      | /lib file |
|:-------------------------------------|:----------|
| 1c93xxxx-d459-11e7-9296-b8e856369374 | bluvib.js |


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2024 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
