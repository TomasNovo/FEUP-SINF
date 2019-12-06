'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const activeProcessSchema = new Schema(
  {
    processId: { type: Schema.Types.ObjectId, ref: 'process' },
    currentStep: { type: Schema.Types.ObjectId, ref: 'step' },
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
