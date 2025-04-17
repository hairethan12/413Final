import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../Heading';

// Entertainer model
interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entPhoneNumber: string;
  entEMailAddress: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entWebPage: string;
  entSSN: string;
  dateEntered: string;
}

// Entertainer const
const EntertainerDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);

  //   grabs info from backend using their id
  useEffect(() => {
    fetch(
      `https://hair413finalbackend-bfgbgxhpg2cef8gh.eastus-01.azurewebsites.net/api/entertainers/${id}`
    )
      .then((res) => res.json())
      .then((data) => setEntertainer(data))
      .catch((err) => console.error('Failed to fetch entertainer:', err));
  }, [id]);

  //   Takes care of the Delete and deletes on the backend
  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirmed) return;

    const res = await fetch(
      `https://hair413finalbackend-bfgbgxhpg2cef8gh.eastus-01.azurewebsites.net/api/entertainers/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (res.ok) {
      navigate('/entertainers');
    } else {
      alert('Delete failed');
    }
  };

  if (!entertainer) return <div className="p-6">Loading...</div>;

  return (
    // Heading and headers for all the fields of the entertainer
    <div className="p-6 max-w-2xl mx-auto">
      <Heading level={2}>{entertainer.entStageName}</Heading>
      <div className="space-y-2 mb-6">
        <p>
          <strong>Phone:</strong> {entertainer.entPhoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {entertainer.entEMailAddress}
        </p>
        <p>
          <strong>Address:</strong>{' '}
          {`${entertainer.entStreetAddress}, ${entertainer.entCity}, ${entertainer.entState} ${entertainer.entZipCode}`}
        </p>
        <p>
          <strong>Website:</strong> {entertainer.entWebPage}
        </p>
        <p>
          <strong>SSN:</strong> {entertainer.entSSN}
        </p>
        <p>
          <strong>Date Entered:</strong> {entertainer.dateEntered}
        </p>
      </div>
      <div className="flex gap-4">
        {/* Edit button and navigation to edit page */}
        <button
          onClick={() =>
            navigate(`/entertainers/edit/${entertainer.entertainerID}`)
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        {/* Delete button and handle delete that is up top */}
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetails;
