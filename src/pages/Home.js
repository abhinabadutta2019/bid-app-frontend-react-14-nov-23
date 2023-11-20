import React, { useEffect, useContext } from "react";
// import socketIOClient from "socket.io-client";
import { ProductContext } from "../context/ProductContext";

function Home() {
  //
  const { data, fetchData } = useContext(ProductContext);
  //
  useEffect(() => {
    fetchData();
  }, []);
  //
  return (
    <div>
      <h2>All products</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <h4>item name: {item.name}</h4>
              <p>$price: {item.price}</p>
              <p>owner: {item.owner}</p>
              <p>last_bidder: {item.last_bidder}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No item</p>
      )}
    </div>
  );
}

export default Home;
