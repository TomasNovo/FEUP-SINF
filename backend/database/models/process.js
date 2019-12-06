'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const processSchema = new Schema(
  {
    steps: [{ type: Schema.Types.ObjectId, ref: 'step', required: true, default: [] }],
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
