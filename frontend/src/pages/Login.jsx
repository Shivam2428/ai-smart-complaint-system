import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler} className="form">
        <h2>Login</h2>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;