const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  trips: [{
    type: Types.ObjectId,
    ref: 'Trip'
  }]
});

module.exports = model('User', schema);
