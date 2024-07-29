import React from 'react'
import VendorListItem from './VendorListItem';

const VendorList = (props) => {
  const { vendors } = props

  // if statement required to not throw TypeError: products.map is not a function
  const vendorListArr = () => {
    if (vendors.length > 0) {
      return vendors.map((vendor) => <VendorListItem key={vendor.id} vendorData={vendor}/>)
    }
  }

  return (
    <div className="flex flex-wrap">
      {vendorListArr()}
    </div>

  )

};

export default VendorList;