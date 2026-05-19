import Complaint from "../models/Complaint.js";

export const addComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.status = req.body.status || complaint.status;

    const updatedComplaint = await complaint.save();

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.json({
      message: "Complaint deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchByLocation = async (req, res) => {
  try {
    const location = req.query.location;

    const complaints = await Complaint.find({
      location: {
        $regex: location,
        $options: "i",
      },
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};