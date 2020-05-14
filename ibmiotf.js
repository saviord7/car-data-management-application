const ibmiotf = require('ibmiotf');
const iotfApplication = new ibmiotf.IotfApplication(require('./config/application.json'));
const Data = require('./models/Data');

module.exports = {
  connect: () => {
    iotfApplication.connect();

    iotfApplication.on('connect', () => {
      iotfApplication.subscribeToDeviceEvents();
    });

    iotfApplication.on('deviceEvent', async (deviceType, deviceId, eventType, formatType, bufferArray) => {
      let data = new Data(JSON.parse(bufferArray));
      await data.save();
    });
  }
};
