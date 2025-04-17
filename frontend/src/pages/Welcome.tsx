import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    // Here is the heading and description
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Heading level={1}>Welcome to Entertainers R Us!</Heading>
      <p className="text-lg text-center max-w-md mb-6">
        We're glad you're here. Explore our many enterainers and how they can
        make your party the best party ever!
      </p>
      {/* Button to take you to the entertainer list */}
      <button
        onClick={() => navigate('/entertainers')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Entertainers
      </button>
    </div>
  );
};

export default Welcome;
