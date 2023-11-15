import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your username</label>
        <input
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={6}
        />
        <button>SIGN IN</button>
      </form>
    </div>
  );
};

export default Home;
