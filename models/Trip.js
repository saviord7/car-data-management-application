const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  datas: [{
    type: Types.ObjectId,
    ref: 'Data'
  }],
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('Trip', schema);
