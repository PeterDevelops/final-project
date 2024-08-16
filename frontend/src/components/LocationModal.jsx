import React from 'react';

/**
 * LocationModal component renders a modal asking the user for location access.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onAccept - Callback function to handle acceptance of location access
 * @param {Function} props.onDecline - Callback function to handle decline of location access
 * @returns {JSX.Element} The rendered modal component
 */
const LocationModal = (props) => {
  const {
    onAccept,
    onDecline
  } = props;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-80vw'>
        <h2 className='text-lg font-semibold mb-4'>Use your location to find nearby vendors?</h2>
        <div className='mt-4 flex justify-end space-x-4'>
          <button
            className='bg-gray-300 px-4 py-2 rounded'
            onClick={onDecline}
          >
            No, thanks!
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={onAccept}
          >
            Yes, please!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
