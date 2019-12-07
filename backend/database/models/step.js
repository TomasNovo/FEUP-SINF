'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const stepSchema = new Schema(
  {
    number: { type: Number, required: true },
    company: { type: String, required: true },
    fromJasmin: { type: Boolean, required: true },
    document: { type: String, required: true },
    // processId: { type: Schema.Types.ObjectId, ref: 'process' },
  }, 
  {
    timestamps: true,
  },
);

const Step = mongoose.model(
  'step',
  stepSchema,
);

module.exports = Step;
