//
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
//
const ENDPOINT = "http://localhost:4000";
//
function App() {
  //
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  //
  useEffect(() => {
    // Fetch data from the backend when the component mounts

    // Connect to the socket server
    const socket = socketIOClient(ENDPOINT);
    //
    // Listen for custom events indicating new user connections
    socket.on("userConnected", (newUserId) => {
      setUsers((prevUsers) => [...prevUsers, newUserId]);
    });
    //
    // Listen for custom events indicating user disconnections
    socket.on("userDisconnected", (disconnectedUserId) => {
      setUsers((prevUsers) =>
        prevUsers.filter((userId) => userId !== disconnectedUserId)
      );
    });
    //
    fetchData();
    //
    // Cleanup the socket connection on component unmount
    return () => socket.disconnect();
    //
  }, []);

  //
  const fetchData = async () => {
    try {
      // Make a GET request to your backend API
      const response = await fetch(`${ENDPOINT}/api`);

      // Parse the response as JSON
      const jsonData = await response.json();

      setData(jsonData.products);

      //
      // Log the updated state in a useEffect hook
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  //
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

export default App;
