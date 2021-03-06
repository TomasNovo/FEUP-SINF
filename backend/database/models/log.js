'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const logSchema = new Schema(
  {
    type: { type: String, required: true }, // e.g. Success, Error...
    processId: { type: String },
    stepId: { type: String },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Log = mongoose.model(
  'log',
  logSchema,
);

module.exports = Log;
