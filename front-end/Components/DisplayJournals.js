import React, { useState, useEffect } from "react";
import JournalCard from "./JournalCard";
import axios from "axios";

const DisplayJournals = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4006/displayJournals");
        console.log('api response: ',response);
        setJournals(response.data);
      } catch (error) {
        console.error("Error fetching journals:", error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const handleDelete = (deletedId) => {
    // Update the state to remove the deleted journal entry
    setJournals(journals.filter((journal) => journal._id !== deletedId));
  };

  return (
    <div>
      <h2>All Journals</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {journals.map((journal) => (
          <JournalCard
            key={journal._id}
            id={journal._id}
            date={journal.date}
            title={journal.title}
            message={journal.message}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayJournals;
