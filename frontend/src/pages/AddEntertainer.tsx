import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Heading';

// use state and const to set new entertainer info to blanks
const AddEntertainer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    entStageName: '',
    entPhoneNumber: '',
    entEMailAddress: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entWebPage: '',
    entSSN: '',
    dateEntered: new Date().toISOString().split('T')[0], // today's date
  });

  //   These handle the form data and submit
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // posting the new entertainer to the database
    const response = await fetch(
      'https://hair413finalbackend-bfgbgxhpg2cef8gh.eastus-01.azurewebsites.net/api/entertainers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      navigate('/entertainers');
    } else {
      alert('Something went wrong adding the entertainer.');
    }
  };

  return (
    // Heading
    <div className="p-6 max-w-xl mx-auto">
      <Heading level={1}>Add New Entertainer</Heading>
      {/* This form is just all of the input boxes for the new entertainer */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Stage Name</label>
            <input
              name="entStageName"
              value={formData.entStageName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="entPhoneNumber"
              value={formData.entPhoneNumber}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="entEMailAddress"
              value={formData.entEMailAddress}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input
              name="entStreetAddress"
              value={formData.entStreetAddress}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              name="entCity"
              value={formData.entCity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              name="entState"
              value={formData.entState}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Zip Code</label>
            <input
              name="entZipCode"
              value={formData.entZipCode}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Web Page</label>
            <input
              name="entWebPage"
              value={formData.entWebPage}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">SSN</label>
            <input
              name="entSSN"
              value={formData.entSSN}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="pt-4">
          {/* submit button that then posts to the back end. Handed up top at the handlesubmit. */}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntertainer;
