/**
 * Copyright reelyActive 2024-2025
 * We believe in an open Internet of Things
 */


const dsp = require('./dsp');
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
const CHARS_PER_SAMPLE = 4;
const STANDARD_GRAVITY = 9.80665;
const ISO_20816_MIN_FILTER_FREQUENCY = 10;
const ISO_20816_MAX_FILTER_FREQUENCY = 1000;


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
      let accelerationSamplesHex = '';
      data.values.forEach((substringHex) => {
        accelerationSamplesHex += substringHex;
      });
      return { accelerationSamplesHex: accelerationSamplesHex };
    case '1c930021d45911e79296b8e856369374': // data_set
      return {};
    case '1c930022d45911e79296b8e856369374': // gain
      return { gain: parseInt(data.value, 16) };
    case '1c930023d45911e79296b8e856369374': // sample_rate
      return { accelerationSamplingRate:
                                   SAMPLE_RATES_HZ[parseInt(data.value, 16)] };
    case '1c930024d45911e79296b8e856369374': // trace_len
      return { numberOfSamples: NUMBERS_OF_SAMPLES[parseInt(data.value, 16)] };
    case '1c930025d45911e79296b8e856369374': // trigger_delay
      return {};
    case '1c930029d45911e79296b8e856369374': // calibration
      let calibrationBuffer = Buffer.from(data.value, 'hex');
      return { calibration: calibrationBuffer.readInt16LE() };
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


/**
 * Combine processed BluVib GATT data.
 * @param {Object} data The processed GATT data.
 * @return {Object} The combined BluVib data as JSON.
 */
function combine(data) {
  let isValidCalibration = Number.isInteger(data.calibration) &&
                          (data.calibration > 0);
  let isNecessaryProperties = Number.isInteger(data.numberOfSamples) &&
                              (typeof data.accelerationSamplesHex === 'string');

  if(!isValidCalibration || !isNecessaryProperties) {
    delete data.accelerationSamplesHex;
    return;
  }

  let totalNumberOfSamples = data.accelerationSamplesHex.length /
                             CHARS_PER_SAMPLE;
  let numberOfAxes = totalNumberOfSamples / data.numberOfSamples;
  let isInvalidNumberOfSamples = (numberOfAxes !== 3) && (numberOfAxes !== 1);

  if(isInvalidNumberOfSamples) {
    delete data.accelerationSamplesHex;
    return;
  }

  // See BluVib GATT Services and Characteristics Description
  let conversionFactor = 250000 / (65536 * data.calibration);
  let accelerationTimeSeries = [];
  let acceleration = [];

  for(let axisIndex = 0; axisIndex < numberOfAxes; axisIndex++) {
    let axisValues = [];

    for(let sampleIndex = axisIndex * data.numberOfSamples;
        sampleIndex < (axisIndex + 1) * data.numberOfSamples; sampleIndex++) {
      let charIndex = sampleIndex * CHARS_PER_SAMPLE;
      let sampleHex = data.accelerationSamplesHex.substring(charIndex,
                                                 charIndex + CHARS_PER_SAMPLE);
      let sample = Buffer.from(sampleHex, 'hex').readUInt16LE();
      let sampleValue = (sample - 0x8000) * conversionFactor;

      axisValues.push(sampleValue);
    }

    accelerationTimeSeries.push(axisValues);
    acceleration.push(calculateMean(axisValues));
  }

  // Calculate velocityOverall for each axis: this is computation-intensive and
  // make take a non-negligible amount of time to execute, especially for long
  // time series and on resource-constrained computers!
  let velocityOverall = [];
  accelerationTimeSeries.forEach((samples) => {
    velocityOverall.push(calculateAverageVelocityOverall(samples,
                                                data.accelerationSamplingRate));
  });

  if(velocityOverall.every((value) => Number.isFinite(value))) {
    data.velocityOverall = velocityOverall;
  }
  data.accelerationTimeSeries = accelerationTimeSeries;
  data.acceleration = acceleration;
  delete data.accelerationSamplesHex;
}


/**
 * Calculate the mean value of all elements in an array.
 * @param {Array} values The array of values.
 * @return {Number} The mean.
 */
function calculateMean(values) {
  return values.reduce((sum, value) => (sum + value)) / values.length;
}


/**
 * Calculate the average velocity overall from the given acceleration time
 * series, dividing it into subsamples.
 * @param {Array} samples The acceleration time series.
 * @param {Number} samplingRate The sampling rate of the time series.
 * @return {Number} The velocity overall.
 */
function calculateAverageVelocityOverall(samples, samplingRate) {

  // Remove any DC offset from the time series samples
  let offsetSamples = dsp.dcOffset(samples);

  // Split the time series samples into up to four sets of at least 256 samples
  let sampleSets = dsp.createPowerOfTwoLengthSubSamples(offsetSamples, 256, 4);

  // Convert to m/s/s, then calculate and average the velocityOverall subsamples
  let velocityOverallSum = 0;
  sampleSets.forEach((sampleSet, index) => {
    sampleSet.forEach((sample, index) => {
      sampleSet[index] = sample * STANDARD_GRAVITY; // g to m/s/s
     });
    velocityOverallSum += calculateVelocityOverall(sampleSet, samplingRate) ||
                          NaN; // Void the average should a calculation fail
  });

  // Take the average of the sets
  return velocityOverallSum / sampleSets.length;
}


/**
 * Calculate the velocity overall from the given acceleration time series.
 * @param {Array} samples The acceleration time series.
 * @param {Number} samplingRate The sampling rate of the time series.
 * @return {Number} The velocity overall.
 */
function calculateVelocityOverall(samples, samplingRate) {

  // Apply a Hann window to the time series
  let windowedSamples = dsp.hannWindow(samples);

  // Perform a FFT on the windowed samples
  let fft = dsp.fft(windowedSamples, samplingRate);

  // Abort should the FFT fail
  if(fft === null) { return null; }

  // Integrate over frequency (within filter window) to get velocities
  let filteredVelocities = [];
  for(let bin = 0; bin < fft.numberOfBins; bin++) {
    if((fft.frequencies[bin] >= ISO_20816_MIN_FILTER_FREQUENCY) &&
       (fft.frequencies[bin] <= ISO_20816_MAX_FILTER_FREQUENCY)) {
      let velocity = fft.magnitudes[bin] / (2 * Math.PI * fft.frequencies[bin]);
      filteredVelocities.push(velocity);
    }
  }

  // Calculate velocity overall as the sum the squares of the velocities in the
  // frequency domain, multiplying by 2 to account for symmetry in the Fourier
  // Transform, and then taking the square root.
  let sumOfSquares = filteredVelocities.reduce((sum, value) =>
                                                        sum + (value * value));
  let velocityOverall = Math.sqrt(2 * sumOfSquares);

  // Divide by the square root of the noise bandwidth of the Hann window (1.5)
  // to correct for the the window applied in the time series
  return velocityOverall / Math.sqrt(1.5);
}


module.exports.process = process;
module.exports.combine = combine;
module.exports.supportedServiceUuids = SUPPORTED_SERVICE_UUIDS;