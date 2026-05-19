import mongoose from "mongoose";

const complaintSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    aiPriority: {
      type: String,
      default: "Medium",
    },

    aiDepartment: {
      type: String,
      default: "",
    },

    aiSummary: {
      type: String,
      default: "",
    },

    aiResponse: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;