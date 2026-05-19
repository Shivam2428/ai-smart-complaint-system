import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} className="form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;