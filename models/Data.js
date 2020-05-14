const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  accuracy: {
    type: Number,
    required: true
  },
  bearing: {
    type: Number,
    required: true
  },
  acceleration_x: {
    type: Number,
    required: true
  },
  acceleration_y: {
    type: Number,
    required: true
  },
  acceleration_z: {
    type: Number,
    required: true
  },
  gyro_x: {
    type: Number,
    required: true
  },
  gyro_y: {
    type: Number,
    required: true
  },
  gyro_z: {
    type: Number,
    required: true
  },
  second: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    ref: 'Trip'
  }
});

module.exports = model('Data', schema);
