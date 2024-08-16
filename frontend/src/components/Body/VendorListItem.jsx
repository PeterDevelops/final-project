import React from 'react';
import { Link } from 'react-router-dom';

/**
 * VendorListItem is a component that displays a single vendor in a list format.
 * It includes the vendor's logo, name, and optionally, a brief bio. The component
 * also navigates to the vendor's detail page when clicked.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.vendorData - The data for the vendor to display.
 * @param {Function} [props.onClick] - Optional callback function to handle click events.
 * @param {boolean} [props.showBio] - Optional flag to control whether the vendor's bio is displayed.
 *
 * @returns {JSX.Element} - The rendered VendorListItem component.
 */
const VendorListItem = (props) => {
  const {
    vendorData,
    onClick,
    showBio
  } = props;

  /**
   * Handles click events on the vendor list item.
   *
   * @param {React.MouseEvent} event - The click event object.
   */
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick(vendorData);
    }
  };

  return (
    <Link to={`/vendors/${vendorData.id}`} onClick={handleClick}>
      <article className='flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-2 overflow-hidden h-48'>
        <div className='w-full md:w-3/4 h-full flex'>
          <img
            src={vendorData.vendor_logo_url}
            alt={`${vendorData.name} logo`}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Name Section */}
        <div className='w-full md:w-1/3 h-1/3 md:h-full flex flex-col justify-center bg-listitem bg-opacity-60 p-1'>
          <h3 className='text-xs text-center font-bold truncate'>{vendorData.name}</h3>
          {showBio && <p className='mt-1 text-center text-xs truncate'>{vendorData.bio}</p>}
        </div>
      </article>
    </Link>
  );
};

export default VendorListItem;
