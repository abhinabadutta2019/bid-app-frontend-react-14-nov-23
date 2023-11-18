//
import React, { useEffect, useState } from "react";
//

function App() {
  //
  const [data, setData] = useState([]);
  //
  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  //
  const fetchData = async () => {
    try {
      // Make a GET request to your backend API
      const response = await fetch("http://localhost:4000/api");

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
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <p>{item.owner}</p>
              <p>{item.last_bidder}</p>
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
