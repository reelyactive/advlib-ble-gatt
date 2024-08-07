/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const bluvib = require('./bluvib');
const utils = require('./utils');


/**
 * Process protocol-specific data: in this case Bluetooth Low Energy GATT.
 * @param {Object} data The protocol-specific data as an Object.
 * @return {Object} The processed GATT data as JSON.
 */
function processProtocolSpecificData(data) {
  if(!utils.isProtocolSpecificData(data) || !Array.isArray(data.gatt)) {
    return null;
  }

  let processedData = {};
  let processors = [];

  // Process each characteristic
  data.gatt.forEach((characteristic) => {
    if(utils.isGattCharacteristicFormat(characteristic)) {
      let processedCharacteristicData = {};

      if(bluvib.supportedServiceUuids.includes(characteristic.serviceUuid)) {
        processedCharacteristicData = bluvib.process(characteristic);
        if(!processors.includes(bluvib)) { processors.push(bluvib); }
      }

      if(processedCharacteristicData) {
        Object.assign(processedData, processedCharacteristicData);
      }
    }
  });

  // Combine all processed characteristics using each processor 
  processors.forEach((processor) => {
    processor.combine(processedData);
  });

  return processedData;
}


module.exports.processProtocolSpecificData = processProtocolSpecificData;
