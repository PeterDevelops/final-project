// {
//   "id": 1,
//   "name": "Torp, McDermott and Cassin",
//   "bio": "sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque",
//   "address": "409 Donald Center",
//   "city": "Port Moody, BC",
//   "longitude": "-122.8677562",
//   "latitude": "49.2849107",
//   "vendor_logo_url": "http://dummyimage.com/369x323.png/dddddd/000000",
//   "admin_user": 1
// }


import React from 'react'

const VendorListItem = (props) => {
  const { vendorData } = props;

  return (
    <article >
      <img src={vendorData.vendor_logo_url} alt="vendor logo" className="w-1/3 rounded-full"/>
      <h1>{vendorData.name}</h1>
      <p>Bio: {vendorData.bio}</p>
    </article>

  )

};

export default VendorListItem;
