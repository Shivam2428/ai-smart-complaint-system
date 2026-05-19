import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>AI Complaint System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Complaint</Link>
        <Link to="/complaints">Complaints</Link>

        {localStorage.getItem("userInfo") ? (
          <button onClick={logoutHandler} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;