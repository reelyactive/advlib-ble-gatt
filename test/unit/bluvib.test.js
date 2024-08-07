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
const INPUT_DATA_VALID_DATA = {
    serviceUuid: '1c930002d45911e79296b8e856369374',
    characteristicUuid: '1c930020d45911e79296b8e856369374',
    values: [
'00871987fe86ed8609870187ef86dd86db86f186dc86e186eb86b086b986dc86b586ba86cb86b886c086bd86b186be86c286bb86b086ad86c186c086be86d086cc86cc86c686b686d086d586c886d686d386d386d586d286e486db86dd86fc86f686f086fa8603870c87148723870e870a872c871e871987248720873d874787', 'af7fa17fa77fc87fcf7fac7fb57fe77fd17fb97fd17fbd7fbe7fe57fe17fda7fca7fb37fc97fd87fe37ffb7fe77fcd7fdb7fe47fe07ff47f0080f67fe87fcf7fdc7ff97fe17fe27fea7fcd7fe37ff87ff37f0d80fc7fdc7ff67f0280f77ff27ff17ff77f0080f67fe47f078024800780fd7f01800280fd7fe57ff37f07800480', '0280fc7f0b80f77ff37fd97fc97ff77fe57fd57fe87fdd7feb7fd97fd87f0080e87ff27fff7fd07fd67ff67f0d80f47fd17ffd7ff57fea7f0b80f87ffd7fea7fc67ffb7f0d800180fb7fe57ffe7f0380fa7ffa7fd87fe77ffc7fdd7fe77f00800280f87fe47fe87ff97ff17fee7ff07fda7fd87fe57fdd7fed7ff27fd87fd07f'
    ]
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
const EXPECTED_DATA_VALID_DATA = { accelerationSamplesHex: "00871987fe86ed8609870187ef86dd86db86f186dc86e186eb86b086b986dc86b586ba86cb86b886c086bd86b186be86c286bb86b086ad86c186c086be86d086cc86cc86c686b686d086d586c886d686d386d386d586d286e486db86dd86fc86f686f086fa8603870c87148723870e870a872c871e871987248720873d874787af7fa17fa77fc87fcf7fac7fb57fe77fd17fb97fd17fbd7fbe7fe57fe17fda7fca7fb37fc97fd87fe37ffb7fe77fcd7fdb7fe47fe07ff47f0080f67fe87fcf7fdc7ff97fe17fe27fea7fcd7fe37ff87ff37f0d80fc7fdc7ff67f0280f77ff27ff17ff77f0080f67fe47f078024800780fd7f01800280fd7fe57ff37f078004800280fc7f0b80f77ff37fd97fc97ff77fe57fd57fe87fdd7feb7fd97fd87f0080e87ff27fff7fd07fd67ff67f0d80f47fd17ffd7ff57fea7f0b80f87ffd7fea7fc67ffb7f0d800180fb7fe57ffe7f0380fa7ffa7fd87fe77ffc7fdd7fe77f00800280f87fe47fe87ff97ff17fee7ff07fda7fd87fe57fdd7fed7ff27fd87fd07f" };
const EXPECTED_DATA_VALID_GAIN = { gain: 4 };
const EXPECTED_DATA_VALID_SAMPLE_RATE = { sampleRate: 256 };
const EXPECTED_DATA_VALID_TRACE_LEN = { numberOfSamples: 1024 };
const EXPECTED_DATA_VALID_CALIBRATION = { calibration: 5000 };
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

  // Test the process function with valid samples data
  it('should handle valid samples data', function() {
    assert.deepEqual(entity.process(INPUT_DATA_VALID_DATA),
                     EXPECTED_DATA_VALID_DATA);
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