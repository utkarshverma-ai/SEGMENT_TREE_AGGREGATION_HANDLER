const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
}, { timestamps: true });

numberSchema.index({ index: 1 });

module.exports = mongoose.model('Number', numberSchema);
