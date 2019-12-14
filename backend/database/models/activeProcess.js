'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const activeProcessSchema = new Schema(
  {
    processId: { type: Schema.Types.ObjectId, ref: 'process', required: true },
    currentStep: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: true,
  },
);

const ActiveProcess = mongoose.model(
  'activeProcess',
  activeProcessSchema,
);

module.exports = ActiveProcess;
