// {
//   id: 1,
//   name: 'Stock - Beef, White',
//   description: 'at turpis donec posuere metus vitae',
//   photo_url: 'http://dummyimage.com/107x269.png/cc0000/ffffff',
//   inventory: 48,
//   price_cents: 1710,
//   vendor_id: 4,
//   category: '3'
// },


import React from 'react'

const ProductListItem = (props) => {
  const { productData } = props;
  return (
    <article >
      <img src={productData.photo_url} alt="produce image" className="w-1/4"/>
      <h1>{productData.name}</h1>
      <p>Description: {productData.description}</p>
      <h3>${(productData.price_cents  / 100.00).toFixed(2)}</h3>
      <button>Add To Cart</button>

    </article>

  )

};

export default ProductListItem;
