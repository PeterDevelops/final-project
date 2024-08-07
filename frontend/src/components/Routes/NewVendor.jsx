import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const NewVendor = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    setAllVendors,
    locations,
    categories,
    user,
    setUser
  } = props;
  const [vendorName, setVendorName] = useState('');
  const [vendorBio, setVendorBio] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorCity, setVendorCity] = useState('');
  const [vendorLongitude, setVendorLongitude] = useState('');
  const [vendorLatitude, setVendorLatitude] = useState('');
  const [vendorLogoUrl, setVendorLogoUrl] = useState('');

  const navigate = useNavigate();

  const handleAddressChange = async (event) => {
    const address = event.target.value;
    setVendorAddress(address);

    if (address) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        const { lat, lon } = data[0] || {};
        setVendorLatitude(lat || '');
        setVendorLongitude(lon || '');
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        setVendorLatitude('');
        setVendorLongitude('');
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVendor = {
      name: vendorName,
      bio: vendorBio,
      address: vendorAddress,
      city: vendorCity,
      longitude: vendorLongitude,
      latitude: vendorLatitude,
      vendor_logo_url: vendorLogoUrl,
      admin_user: user.id
    };

    try {
      const response = await fetch('http://localhost:8080/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVendor),
      });

      if (!response.ok) {
        throw new Error('Failed to create vendor');
      }

      const data = await response.json();
      setAllVendors([...vendors, data]);
      navigate('/vendors');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Add New Vendor</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="vendorBio" className="block text-sm font-medium text-gray-700">Vendor Bio</label>
            <textarea
              id="vendorBio"
              name="vendorBio"
              value={vendorBio}
              onChange={(e) => setVendorBio(e.target.value)}
              className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
              required
            />
          </div>
          <div>
            <label htmlFor="vendorAddress" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              id="vendorAddress"
              name="vendorAddress"
              type="text"
              value={vendorAddress}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="vendorCity" className="block text-sm font-medium text-gray-700">City, Province</label>
            <input
              type="text"
              id="vendorCity"
              name="vendorCity"
              value={vendorCity}
              onChange={(e) => setVendorCity(e.target.value)}
              className="mt-1 block w-full border-gray-500 bg-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="vendorLogoUrl" className="block text-sm font-medium text-gray-700">Vendor Logo URL</label>
            <input
              type="text"
              id="vendorLogoUrl"
              name="vendorLogoUrl"
              value={vendorLogoUrl}
              onChange={(e) => setVendorLogoUrl(e.target.value)}
              className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVendor;

