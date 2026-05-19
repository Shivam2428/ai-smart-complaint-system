function ComplaintCard({
  complaint,
  updateStatus,
  deleteComplaint,
}) {
  return (
    <div className="card">
      <h3>{complaint.title}</h3>

      <p>{complaint.description}</p>

      <div className="card-info">
        <span>{complaint.category}</span>

        <span>{complaint.location}</span>
      </div>

      <div className="status">
        Status:
        <strong>{complaint.status}</strong>
      </div>

      {/* AI SECTION */}

      <div className="ai-box">
        <p>
          <strong>Priority:</strong>

          <span
            className={
              complaint.aiPriority === "High"
                ? "high"
                : complaint.aiPriority === "Medium"
                ? "medium"
                : "low"
            }
          >
            {" "}
            {complaint.aiPriority}
          </span>
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {complaint.aiDepartment}
        </p>

        <p>
          <strong>Summary:</strong>{" "}
          {complaint.aiSummary}
        </p>

        <p>
          <strong>AI Response:</strong>{" "}
          {complaint.aiResponse}
        </p>
      </div>

      {/* BUTTONS */}

      <div className="btn-group">
        <button
          className="resolve-btn"
          onClick={() => updateStatus(complaint._id)}
        >
          Resolve
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteComplaint(complaint._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ComplaintCard;