import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AddComplaint() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data: aiData } = await API.post(
        "/ai/analyze",
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
        }
      );

      await API.post("/complaints", {
        ...formData,

        aiPriority: aiData.priority,
        aiDepartment: aiData.department,
        aiSummary: aiData.summary,
        aiResponse: aiData.response,
      });

      toast.success("Complaint Added Successfully");

      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        category: "",
        location: "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHandler}>
        <h2>Add Complaint</h2>

        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Complaint Title"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Complaint Description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Location"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: e.target.value,
            })
          }
        />

        <button type="submit">
          {loading
            ? "AI Analyzing..."
            : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}

export default AddComplaint;