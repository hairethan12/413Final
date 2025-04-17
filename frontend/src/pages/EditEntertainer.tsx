import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../Heading';

// Edit entertainer const
const EditEntertainer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);

  //   grabs entertainers info by ID from backend
  useEffect(() => {
    fetch(
      `https://413finalhair-dreadvexace0d7ev.eastus-01.azurewebsites.net/api/entertainers/${id}`
    )
      .then((res) => res.json())
      .then((data) => setFormData(data));
  }, [id]);

  //   handle change and submit. puts the edited details back in the database
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `https://413finalhair-dreadvexace0d7ev.eastus-01.azurewebsites.net/api/entertainers/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    if (res.ok) {
      navigate(`/entertainers/${id}`);
    } else {
      alert('Failed to update entertainer.');
    }
  };

  if (!formData) return <div className="p-6">Loading...</div>;

  return (
    // Header and Headers for input fields
    <div className="p-6 max-w-xl mx-auto">
      <Heading level={1}>Edit Entertainer</Heading>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Stage Name</label>
            <input
              name="entStageName"
              value={formData.entStageName}
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
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="entPhoneNumber"
              value={formData.entPhoneNumber}
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
            <label className="block text-sm font-medium">Email</label>
            <input
              name="entEMailAddress"
              value={formData.entEMailAddress}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date Entered</label>
            <input
              name="dateEntered"
              value={formData.dateEntered}
              onChange={handleChange}
              type="date"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="pt-4">
          {/* submit button. handle submit is uptop */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntertainer;
