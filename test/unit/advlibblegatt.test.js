/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const advlib = require('../../lib/advlibblegatt.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_DATA_NULL = null;
const INPUT_DATA_INVALID_DATA_STRING = 'I am not protocolSpecificData';
const INPUT_DATA_INVALID_DATA_OBJECT = { noType: true };
const INPUT_DATA_VALID_DATA_EMPTY = { type: "ble", gatt: [] };


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_VALID_DATA_EMPTY = {};


// Describe the scenario
describe('advlib-ble-gatt', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.processProtocolSpecificData(),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with null input data
  it('should handle null as input', function() {
    assert.deepEqual(advlib.processProtocolSpecificData(
                     INPUT_DATA_INVALID_DATA_NULL),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with string input data
  it('should handle a string as input', function() {
    assert.deepEqual(advlib.processProtocolSpecificData(
                     INPUT_DATA_INVALID_DATA_STRING),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid object input data
  it('should handle an invalid object as input', function() {
    assert.deepEqual(advlib.processProtocolSpecificData(
                     INPUT_DATA_INVALID_DATA_OBJECT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid empty input data
  it('should handle valid empty data as input', function() {
    assert.deepEqual(advlib.processProtocolSpecificData(
                     INPUT_DATA_VALID_DATA_EMPTY),
                     EXPECTED_DATA_VALID_DATA_EMPTY);
  });

});