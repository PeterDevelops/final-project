import React from 'react';

const LocationModal = (props) => {
  const {onAccept, onDecline} = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Use your location to find nearby vendors?</h2>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onDecline}
          >
            No, thanks!
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
