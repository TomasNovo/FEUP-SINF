'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const processSchema = new Schema(
  {
    name: {type: String, required: true},
    steps: [{
      number: Number,
      company: String,
      fromJasmin: Boolean,
      document: String,
    }],
  },
  {
    timestamps: false,
  },
);

const Process = mongoose.model(
  'process',
  processSchema,
);

module.exports = Process;
