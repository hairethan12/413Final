import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading';

// entertainer info model
interface EntertainerSummary {
  entertainerID: number;
  entStageName: string;
  totalEngagements: number;
  lastEngagementDate: string | null;
}

// use state
const EntertainersList: React.FC = () => {
  const [entertainers, setEntertainers] = useState<EntertainerSummary[]>([]);
  const navigate = useNavigate();

  // get entertainers from backend
  useEffect(() => {
    fetch(
      'https://413finalhair-dreadvexace0d7ev.eastus-01.azurewebsites.net/api/entertainers/summary'
    )
      .then((res) => res.json())
      .then((data) => setEntertainers(data))
      .catch((err) => console.error('Error fetching entertainers:', err));
  }, []);

  return (
    // Heading and Headers
    <div className="p-6">
      <Heading level={1}>Entertainers</Heading>
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Stage Name</th>
            <th className="p-2">Times Booked</th>
            <th className="p-2">Last Booking</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* map out the entertainers info from the json */}
          {entertainers.map((entertainer) => (
            <tr key={entertainer.entertainerID} className="border-b">
              <td className="p-2">{entertainer.entStageName}</td>
              <td className="p-2">{entertainer.totalEngagements}</td>
              <td className="p-2">{entertainer.lastEngagementDate ?? 'N/A'}</td>
              <td className="p-2">
                {/* Details button */}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() =>
                    navigate(`/entertainers/${entertainer.entertainerID}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add entertainer button */}
      <button
        onClick={() => navigate('/entertainers/add')}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Entertainer
      </button>
    </div>
  );
};

export default EntertainersList;
