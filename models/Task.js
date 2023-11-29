const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  assigned_to: {
    type: String,
  },
  status: {
    type: String,
  },
  notification: {
    type: Number,
  },
  duration: {
    type: String,
  },
  comment: {
    type: String,
  },
  assignedDate: {
    type: String,
  },


},

{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Tasks", taskSchema);
