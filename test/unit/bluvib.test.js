/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const entity = require('../../lib/bluvib.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_VALID_SERIAL = {
    serviceUuid: '1c930001d45911e79296b8e856369374',
    characteristicUuid: '1c930010d45911e79296b8e856369374',
    value: '78563412'
};
const INPUT_DATA_VALID_GAIN = {
    serviceUuid: '1c930002d45911e79296b8e856369374',
    characteristicUuid: '1c930022d45911e79296b8e856369374',
    value: '04'
};
const INPUT_DATA_VALID_SAMPLE_RATE = {
    serviceUuid: '1c930002d45911e79296b8e856369374',
    characteristicUuid: '1c930023d45911e79296b8e856369374',
    value: '07'
};
const INPUT_DATA_VALID_TRACE_LEN = {
    serviceUuid: '1c930002d45911e79296b8e856369374',
    characteristicUuid: '1c930024d45911e79296b8e856369374',
    value: '04'
};
const INPUT_DATA_VALID_CALIBRATION = {
    serviceUuid: '1c930002d45911e79296b8e856369374',
    characteristicUuid: '1c930029d45911e79296b8e856369374',
    value: '8813'
};
const INPUT_DATA_VALID_OPERATING_MODE = {
    serviceUuid: '1c930003d45911e79296b8e856369374',
    characteristicUuid: '1c930031d45911e79296b8e856369374',
    value: '02'
};
const INPUT_DATA_VALID_TEMPERATURE = {
    serviceUuid: '1c930003d45911e79296b8e856369374',
    characteristicUuid: '1c930032d45911e79296b8e856369374',
    value: 'c019'
};
const INPUT_DATA_VALID_BATTERY = {
    serviceUuid: '1c930003d45911e79296b8e856369374',
    characteristicUuid: '1c930038d45911e79296b8e856369374',
    value: '480d'
};
const INPUT_DATA_VALID_ERROR = {
    serviceUuid: '1c930004d45911e79296b8e856369374',
    characteristicUuid: '1c930043d45911e79296b8e856369374',
    value: '45'
};



// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_VALID_SERIAL = { serialNumber: "12345678" };
const EXPECTED_DATA_VALID_GAIN = { gain: 4 };
const EXPECTED_DATA_VALID_SAMPLE_RATE = { sampleRate: 256 };
const EXPECTED_DATA_VALID_TRACE_LEN = { numberOfSamples: 1024 };
const EXPECTED_DATA_VALID_CALIBRATION = { calibration: 50000 };
const EXPECTED_DATA_VALID_OPERATING_MODE = { operatingMode: "Wakeup" };
const EXPECTED_DATA_VALID_TEMPERATURE = { temperature: 25.75 };
const EXPECTED_DATA_VALID_BATTERY = { batteryVoltage: 3.4 };
const EXPECTED_DATA_VALID_ERROR = { errorCode: 69 };


// Describe the scenario
describe('bluvib', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(entity.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid serial data
  it('should handle valid serial data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_SERIAL),
                     EXPECTED_DATA_VALID_SERIAL);
  });

  // Test the process function with valid gain data
  it('should handle valid gain data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_GAIN),
                     EXPECTED_DATA_VALID_GAIN);
  });

  // Test the process function with valid sample rate data
  it('should handle valid sample rate data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_SAMPLE_RATE),
                     EXPECTED_DATA_VALID_SAMPLE_RATE);
  });

  // Test the process function with valid trace len data
  it('should handle valid trace len data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_TRACE_LEN),
                     EXPECTED_DATA_VALID_TRACE_LEN);
  });

  // Test the process function with valid calibration data
  it('should handle valid calibration data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_CALIBRATION),
                     EXPECTED_DATA_VALID_CALIBRATION);
  });

  // Test the process function with valid operating mode data
  it('should handle valid operating mode data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_OPERATING_MODE),
                     EXPECTED_DATA_VALID_OPERATING_MODE);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_TEMPERATURE),
                     EXPECTED_DATA_VALID_TEMPERATURE);
  });

  // Test the process function with valid battery data
  it('should handle valid battery data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_BATTERY),
                     EXPECTED_DATA_VALID_BATTERY);
  });

  // Test the process function with valid error data
  it('should handle valid error data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_ERROR),
                     EXPECTED_DATA_VALID_ERROR);
  });

});