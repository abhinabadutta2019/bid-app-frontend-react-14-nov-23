import React, { useState, useEffect } from "react";

const Nav = ({ header, socket }) => {
  const [notification, setNotification] = useState("");

  // console.log(socket, "socket");

  useEffect(() => {
    socket.on("addProductResponse", (data) => {
      // console.log("addProductResponse data:", data); // Check if data is received
      setNotification(
        `@${data.owner} just added ${data.name} worth $${Number(
          data.price
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  useEffect(() => {
    socket.on("bidProductResponse", (data) => {
      //   console.log("bidProductResponse data:", data); // Check if data is received
      setNotification(
        `@${data.last_bidder} just bid ${data.name} for $${Number(
          data.amount
        ).toLocaleString()}`
      );
    });
  }, [socket]);

  return (
    <nav className="navbar">
      <div className="header">
        <h2>{header}</h2>
      </div>

      <div>
        <p style={{ color: "red" }}>{notification}</p>
      </div>
    </nav>
  );
};

export default Nav;
