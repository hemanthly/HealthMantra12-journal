import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const Textbox = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalTitle, setJournalTitle] = useState('');
  const [journalText, setJournalText] = useState('');

  const handleSubmit = async (e) => {
    try {
      // Prepare the data for the API call
      const data = {
        date: selectedDate.toISOString(), // Convert Date to string
        title: journalTitle,
        message: journalText,
      };
      
      // Make the API call to your server
      const response = await axios.post('http://localhost:4006/', data); 

      // Handle the response if needed
      console.log('API Response:', response.data);
    } catch (error) {
      console.error(error.stack);
      console.error('API Error:', error.message);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h2>Daily Journal</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      <div className="journal-card">
        <input
          type="text"
          placeholder="Title"
          value={journalTitle}
          onChange={(e) => setJournalTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your thoughts here..."
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Textbox;
