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
    <article className="flex m-5">
      <img src={vendorData.vendor_logo_url} alt="vendor logo" className="w-1/3 rounded-full"/>
      <div>
        <h3>{vendorData.name}</h3>
        <p className="w-1/3 m-5">Bio: {vendorData.bio}</p>
      </div>
    </article>

  )

};

export default VendorListItem;
