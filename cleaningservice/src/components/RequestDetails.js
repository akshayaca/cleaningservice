import React from 'react';
import { useParams } from 'react-router-dom';

const RequestDetails = () => {
  let { id } = useParams();

  return (
    <div>
      <h1>Request Details Page</h1>
      <p>Details for request ID: {id}</p>
      {/* Implement the details based on the ID */}
    </div>
  );
};

export default RequestDetails;
