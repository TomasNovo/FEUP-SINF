const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

const MappingSchema = new Schema(
  {
    id1: Number,
    id2: Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports.Data = mongoose.model("Data", DataSchema);

module.exports.Mapping = mongoose.model("Mapping", MappingSchema);
