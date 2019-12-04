'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const masterDataSchema = new Schema(
  {
    idA: { type: String, required: true },
    idB: { type: String, required: true },
  },
  {
    timestamps: false,
  },
);

masterDataSchema.index({ idA: 1 }, { unique: true });
masterDataSchema.index({ idB: 1 }, { unique: true });

const MasterData = mongoose.model(
  'masterData',
  masterDataSchema,
);

module.exports = MasterData;
