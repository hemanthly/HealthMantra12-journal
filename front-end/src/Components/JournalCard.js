import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const JournalCard = ({ id, date, title, message, onDelete }) => {
  const handleDelete = async () => {
    try {
      console.log("Pressed delete button");

      // Send a DELETE request to the server to delete the journal entry
      await axios.delete(`http://localhost:4006/deleteJournal/${id}`);

      // Call the onDelete callback to update the state in the parent component
      onDelete(id);
    } catch (error) {
      console.error('Error deleting journal entry:', error.message);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {/* <Card.Text>{id}</Card.Text> */}
        <Card.Subtitle className="mb-2 text-muted">{date}</Card.Subtitle>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {/* <Button variant="primary">Edit</Button> */}
        <Button variant="secondary" type='submit' onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default JournalCard;
