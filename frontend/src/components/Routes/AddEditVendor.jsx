import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Component for adding or editing a vendor.
 *
 * @param {Object} props - Component props
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Function} props.setAllVendors - Function to set all vendors
 * @param {Object} props.user - Current user object
 * @returns {JSX.Element} The rendered component
 */
const AddEditVendor = (props) => {
  const {
    allVendors,
    setAllVendors,
    user,
  } = props;

  // State variables for vendor details
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

  // List of provinces for selection
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

  /**
   * Resets the vendor form to its initial state.
   */
  const resetVendorForm = () => {
    setVendorName('');
    setVendorBio('');
    setVendorAddress('');
    setVendorCity('');
    setVendorProvince('');
    setVendorLongitude('');
    setVendorLatitude('');
    setVendorLogoUrl('');
  };

  // Populate the form with existing vendor data if editing
  useEffect(() => {
    if (editVendor) {
      setVendorName(editVendor.name || '');
      setVendorBio(editVendor.bio || '');
      setVendorAddress(editVendor.address || '');
      setVendorCity(editVendor.city?.split(',')[0] || '');
      setVendorProvince(editVendor.city?.split(',')[1].trim() || '');
      setVendorLongitude(editVendor.longitude || '');
      setVendorLatitude(editVendor.latitude || '');
      setVendorLogoUrl(editVendor.vendor_logo_url || '');
    } else {
      resetVendorForm();
    }
  }, [editVendor]);

  /**
   * Handles address change and updates geolocation based on the address.
   *
   * @param {Object} event - Event object
   */
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

  /**
   * Handles form submission for adding or editing a vendor.
   *
   * @param {Object} event - Form event object
   */
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
      admin_user: user.id,
      ...(editVendor && { id: editVendor.id }),
    };

    try {
      const method = editVendor ? 'PUT' : 'POST';
      const response = await fetch('http://localhost:8080/api/vendors', {
        method,
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
    <div className='relative h-screen'>
      <form onSubmit={handleSubmit} className='max-w-4xl mx-6 mt-10 p-6 bg-[#F7F4F0] bg-opacity-50 shadow-md rounded-lg'>
        <h1 className='text-2xl font-semibold mb-4'>{editVendor ? 'Edit Vendor' : 'Add New Vendor'}</h1>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          <div>
            <label htmlFor='vendorName' className='block text-sm font-medium text-gray-700'>Vendor Name</label>
            <input
              type='text'
              id='vendorName'
              name='vendorName'
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className='mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='vendorBio' className='block text-sm font-medium text-gray-700'>Vendor Bio</label>
            <textarea
              id='vendorBio'
              name='vendorBio'
              value={vendorBio}
              onChange={(e) => setVendorBio(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              rows='4'
              required
            />
          </div>
          <div>
            <label htmlFor='vendorAddress' className='block text-sm font-medium text-gray-700'>Address</label>
            <input
              id='vendorAddress'
              name='vendorAddress'
              type='text'
              value={vendorAddress}
              onChange={handleAddressChange}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='vendorCity' className='block text-sm font-medium text-gray-700'>City</label>
            <input
              type='text'
              id='vendorCity'
              name='vendorCity'
              value={vendorCity}
              onChange={(e) => setVendorCity(e.target.value)}
              className='mt-1 block w-full border-gray-500 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='vendorProvince' className='block text-sm font-medium text-gray-700'>Province</label>
            <select
              id='vendorProvince'
              name='vendorProvince'
              value={vendorProvince}
              onChange={(e) => setVendorProvince(e.target.value)}
              className='mt-1 block w-full border-gray-500 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            >
              <option value='' disabled>Select a Province</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='vendorLogoUrl' className='block text-sm font-medium text-gray-700'>Vendor Logo URL</label>
            <input
              type='text'
              id='vendorLogoUrl'
              name='vendorLogoUrl'
              value={vendorLogoUrl}
              onChange={(e) => setVendorLogoUrl(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className='text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            {editVendor ? 'Update Vendor' : 'Add Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditVendor;
