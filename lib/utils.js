/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';


/**
 * Convert the given hexadecimal string or Buffer to a Buffer.
 * @param {Object} data A hexadecimal-string or Buffer.
 * @return {Object} The data as a Buffer, or null if invalid data format.
 */
function convertToBuffer(data) {
  if(Buffer.isBuffer(data)) {
    return data;
  }

  if(typeof data === 'string') {
    data = data.toLowerCase();
    let isHex = /[0-9a-f]+/.test(data);
    if(isHex) {
      return Buffer.from(data, 'hex');
    }
  }

  return null;
}


/**
 * Convert the given data to a hexadecimal string of the given number of bytes.
 * @param {Object} data The data to convert (Number, String or Buffer).
 * @param {Number} length The target length of the string in bytes.
 * @param {boolean} reverseEndianness Optionally reverse the endianness.
 * @return {String} The data as a hexadecimal string.
 */
function convertToHexString(data, length, reverseEndianness) {
  let hexString = null;

  if(Number.isInteger(data) && (data >= 0)) {
    hexString = data.toString(16).padStart(length * 2, '0');
  }
  if(Buffer.isBuffer(data)) {
    hexString = data.toString('hex').padStart(length * 2, '0');
  }
  if(typeof data === 'string') {
    hexString = data.padStart(length * 2, '0');
  }

  if(hexString && (reverseEndianness === true)) {
    return hexString.match(/.{2}/g).reverse().join('');
  }

  return hexString;
}


/**
 * Confirm if the given data is an Object conforming to protocolSpecificData.
 * @param {Object} data The data to confirm.
 * @return {boolean} The confirmation.
 */
function isProtocolSpecificData(data) {
  return (data !== null) && (typeof data === 'object') &&
         !Buffer.isBuffer(data);
}


/**
 * Confirm if the given Object conforms to the GATT characteristic data format.
 * @param {Object} data The data to confirm.
 * @return {boolean} The confirmation.
 */
function isGattCharacteristicFormat(data) {
  return (data !== null) && (typeof data === 'object') &&
         (typeof data.serviceUuid === 'string') &&
         (typeof data.characteristicUuid === 'string');
}


module.exports.SIGNATURE_SEPARATOR = SIGNATURE_SEPARATOR;
module.exports.convertToBuffer = convertToBuffer;
module.exports.convertToHexString = convertToHexString;
module.exports.isProtocolSpecificData = isProtocolSpecificData;
module.exports.isGattCharacteristicFormat = isGattCharacteristicFormat;
