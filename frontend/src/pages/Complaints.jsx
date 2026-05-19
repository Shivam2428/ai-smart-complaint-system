import { useEffect, useState } from "react";
import API from "../services/api";
import ComplaintCard from "../components/ComplaintCard";
import toast from "react-hot-toast";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const { data } = await API.get("/complaints");

      setComplaints(data);
      setAllComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id) => {
    try {
      await API.put(`/complaints/${id}`, {
        status: "Resolved",
      });

      toast.success("Complaint Updated");

      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await API.delete(`/complaints/${id}`);

      toast.success("Complaint Deleted");

      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allComplaints.filter(
      (item) =>
        item.title.toLowerCase().includes(value) ||
        item.location.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );

    setComplaints(filtered);
  };

  return (
    <div className="complaints-container">
      <h1>All Complaints</h1>

      {/* DASHBOARD STATS */}

      <div className="stats-container">
        <div className="stat-card">
          <h2>{allComplaints.length}</h2>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              allComplaints.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </h2>

          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              allComplaints.filter(
                (item) => item.status === "Resolved"
              ).length
            }
          </h2>

          <p>Resolved</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              allComplaints.filter(
                (item) => item.aiPriority === "High"
              ).length
            }
          </h2>

          <p>High Priority</p>
        </div>
      </div>

      {/* SEARCH BAR */}

      <input
        type="text"
        placeholder="Search by title, category or location..."
        className="search-bar"
        onChange={searchHandler}
      />

      {/* COMPLAINTS */}

      <div className="complaints-grid">
        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
            updateStatus={updateStatus}
            deleteComplaint={deleteComplaint}
          />
        ))}
      </div>
    </div>
  );
}

export default Complaints;