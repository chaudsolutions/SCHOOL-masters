const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    resourcesTitle: { type: String, required: true },
    resourcesDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const ResourcesSchema = new Schema(
  {
    role: { type: String, required: true },
    resources: [RoleSchema],
  },
  { timestamps: true }
);

const ResourcesModel = mongoose.model("Resources", ResourcesSchema);

module.exports = ResourcesModel;
