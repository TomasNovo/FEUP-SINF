'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const companySchema = new Schema(
  {
    id: { type: String, required: true }, // e.g. 0, 1 -> only 2 companies
    appId: { type: String, required: true },
    appSecret: { type: String, required: true },
    tenant: { type: String, required: true },
    organization: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: false,
  },
);

const Company = mongoose.model(
  'company',
  companySchema,
);

module.exports = Company;