import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const AddEditVendor = (props) => {
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
    setUser,
    cartItems,
  } = props;
  const [vendorName, setVendorName] = useState('');
  const [vendorBio, setVendorBio] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorCity, setVendorCity] = useState('');
  const [vendorProvince, setVendorProvince] = useState('');
  const [vendorLongitude, setVendorLongitude] = useState('');
  const [vendorLatitude, setVendorLatitude] = useState('');
  const [vendorLogoUrl, setVendorLogoUrl] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const editVendor = location.state?.vendor || null;

  const provinces = [
    'AB', // Alberta
    'BC', // British Columbia
    'MB', // Manitoba
    'NB', // New Brunswick
    'NL', // Newfoundland and Labrador
    'NS', // Nova Scotia
    'NT', // Northwest Territories
    'NU', // Nunavut
    'ON', // Ontario
    'PE', // Prince Edward Island
    'QC', // Quebec
    'SK', // Saskatchewan
    'YT'  // Yukon
  ];

  useEffect(() => {
    if (editVendor) {
      setVendorName(editVendor.name || '');
      setVendorBio(editVendor.bio || '');
      setVendorAddress(editVendor.address || '');
      setVendorCity(editVendor.city?.split(',')[0] || '');
      setVendorProvince(editVendor.city?.split(',')[1] || '');
      setVendorLongitude(editVendor.longitude || '');
      setVendorLatitude(editVendor.latitude || '');
      setVendorLogoUrl(editVendor.vendor_logo_url || '');
    }
  }, [editVendor]);


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

    const vendorData = {
      name: vendorName,
      bio: vendorBio,
      address: vendorAddress,
      city: `${vendorCity}, ${vendorProvince}`,
      longitude: vendorLongitude,
      latitude: vendorLatitude,
      vendor_logo_url: vendorLogoUrl,
      admin_user: user.id
    };

    if (editVendor) {
      vendorData.id = editVendor.id;
    }

    try {
      const response = editVendor ? await fetch('http://localhost:8080/api/vendors', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      })
      : await fetch('http://localhost:8080/api/vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      if (!response.ok) {
        throw new Error('Failed to create vendor');
      }

      const data = await response.json();

      if (editVendor) {
        setAllVendors(allVendors.map(v => v.id === data.id ? data : v));
      } else {
        setAllVendors([...allVendors, data]);
      }
      navigate('/vendors');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative h-screen">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-10 p-6 bg-[#F7F4F0] bg-opacity-50 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">{editVendor ? 'Edit Vendor' : 'Add New Vendor'}</h1>
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
            <label htmlFor="vendorCity" className="block text-sm font-medium text-gray-700">City</label>
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
            <label htmlFor="vendorProvince" className="block text-sm font-medium text-gray-700">Province</label>
            <select
              id="vendorProvince"
              name="vendorProvince"
              value={vendorProvince}
              onChange={(e) => setVendorProvince(e.target.value)}
              className="mt-1 block w-full border-gray-500 bg-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>Select a Province</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
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
            {editVendor ? 'Update Vendor' : 'Add Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditVendor;

