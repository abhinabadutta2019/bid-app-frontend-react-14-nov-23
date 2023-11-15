import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BidProduct = ({ socket }) => {
  const { name, price } = useParams();
  const [amount, setAmount] = useState(price);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > Number(price)) {
      socket.emit("bidProduct", {
        amount,
        last_bidder: localStorage.getItem("userName"),
        name,
      });
      navigate("/products");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Place a Bid</h2>
      <form onSubmit={handleSubmit}>
        <h3>{name}</h3>

        <label htmlFor="amount">Bidding Amount</label>
        {error && (
          <p style={{ color: "red" }}>
            The bidding amount must be greater than {price}
          </p>
        )}
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button>SEND</button>
      </form>
    </div>
  );
};

export default BidProduct;
