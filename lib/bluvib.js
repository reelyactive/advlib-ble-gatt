/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const SUPPORTED_SERVICE_UUIDS = [ '1c930001d45911e79296b8e856369374',
                                  '1c930002d45911e79296b8e856369374',
                                  '1c930003d45911e79296b8e856369374',
                                  '1c930004d45911e79296b8e856369374' ];
const SAMPLE_RATES_HZ = [ undefined, 25600, 12800, 5120, 2560, 1280, 512, 256 ]; 
const NUMBERS_OF_SAMPLES = [ 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
                             32768, 65536, 131072, 262144, 524288, 1048576,
                             2097152 ];
const OPERATING_MODES = [ undefined, 'Continuous', 'Wakeup', 'Wakeup+', 'Ready',
                          'Event/Triggered' ];


/**
 * Process BluVib GATT data.
 * @param {Object} data The GATT data as an Object.
 * @return {Object} The processed BluVib data as JSON.
 */
function process(data) {
  if(!utils.isGattCharacteristicFormat(data)) {
    return null;
  }

  switch(data.serviceUuid) {
    case '1c930001d45911e79296b8e856369374':
      return processSensorInformationService(data);
    case '1c930002d45911e79296b8e856369374':
      return processVibrationService(data);
    case '1c930003d45911e79296b8e856369374':
      return processConfigService(data);
    case '1c930004d45911e79296b8e856369374':
      return processSystemService(data);
  }
}


/**
 * Process BluVib Sensor Information Service data.
 * @param {Object} data The GATT data as an Object.
 * @return {Object} The processed BluVib data as JSON.
 */
function processSensorInformationService(data) {
  switch(data.characteristicUuid) {
    case '1c930010d45911e79296b8e856369374': // Serial
      return { serialNumber: utils.convertToHexString(data.value, 4, true) };
    case '1c930011d45911e79296b8e856369374': // stm32_fw
    case '1c930012d45911e79296b8e856369374': // rf_fw
    case '1c930013d45911e79296b8e856369374': // hardware
    case '1c930014d45911e79296b8e856369374': // ble
    case '1c930015d45911e79296b8e856369374': // sensor_type
      return {}; // TODO
    default:
      return null;
  }
}


/**
 * Process BluVib Vibration Service data.
 * @param {Object} data The GATT data as an Object.
 * @return {Object} The processed BluVib data as JSON.
 */
function processVibrationService(data) {
  switch(data.characteristicUuid) {
    case '1c930020d45911e79296b8e856369374': // data
      return { accelerationTimeseries: data.values };
    case '1c930021d45911e79296b8e856369374': // data_set
      return {};
    case '1c930022d45911e79296b8e856369374': // gain
      return { gain: parseInt(data.value, 16) };
    case '1c930023d45911e79296b8e856369374': // sample_rate
      return { sampleRate: SAMPLE_RATES_HZ[parseInt(data.value, 16)] };
    case '1c930024d45911e79296b8e856369374': // trace_len
      return { numberOfSamples: NUMBERS_OF_SAMPLES[parseInt(data.value, 16)] };
    case '1c930025d45911e79296b8e856369374': // trigger_delay
      return {};
    case '1c930029d45911e79296b8e856369374': // calibration
      let calibrationBuffer = Buffer.from(data.value, 'hex');
      return { calibration: calibrationBuffer.readInt16LE() * 10 };
    case '1c93002ad45911e79296b8e856369374': // sequence
      return {};
    case '1c93002bd45911e79296b8e856369374': // axes
      return { numberOfAxes: parseInt(data.value, 16) };
    default:
      return null;
  }
}


/**
 * Process BluVib Config Service data.
 * @param {Object} data The GATT data as an Object.
 * @return {Object} The processed BluVib data as JSON.
 */
function processConfigService(data) {
  switch(data.characteristicUuid) {
    case '1c930030d45911e79296b8e856369374': // release
      return {};
    case '1c930031d45911e79296b8e856369374': // mode
      return { operatingMode: OPERATING_MODES[parseInt(data.value, 16)] };
    case '1c930032d45911e79296b8e856369374': // temp
      let temperatureBuffer = Buffer.from(data.value, 'hex');
      return { temperature: temperatureBuffer.readInt16LE() / 256 };
    case '1c930033d45911e79296b8e856369374': // time
      return {}; // TODO
    case '1c930035d45911e79296b8e856369374': // wakeup_time
      return {}; // TODO
    case '1c930036d45911e79296b8e856369374': // wakeup_interval
      return {}; // TODO
    case '1c930037d45911e79296b8e856369374': // wakeup_level
      return {}; // TODO
    case '1c930038d45911e79296b8e856369374': // battery
      let batteryBuffer = Buffer.from(data.value, 'hex');
      return { batteryVoltage: batteryBuffer.readUInt16LE() / 1000 };
    case '1c930039d45911e79296b8e856369374': // capture_time
      return {}; // TODO
    case '1c93003ad45911e79296b8e856369374': // holdoff_interval
      return {}; // TODO
    default:
      return null;
  }
}


/**
 * Process BluVib System Service data.
 * @param {Object} data The GATT data as an Object.
 * @return {Object} The processed BluVib data as JSON.
 */
function processSystemService(data) {
  switch(data.characteristicUuid) {
    case '1c930043d45911e79296b8e856369374': // error
      return { errorCode: parseInt(data.value, 16) };
    default:
      return null;
  }
}

module.exports.process = process;
module.exports.supportedServiceUuids = SUPPORTED_SERVICE_UUIDS;