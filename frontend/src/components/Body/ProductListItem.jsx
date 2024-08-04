import React from 'react'

const ProductListItem = (props) => {
  const { productData } = props;

  return (
    <article className="flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
      <img
        src={productData.photo_url}
        alt={`${productData.name} image`}
        className="w-full md:w-1/3 md:object-cover md:object-contain"
      />
      <div className="p-5 w-full md:w-2/3">
        <h1 className="text-xl font-semibold">{productData.name}</h1>
        <p className="mt-2">Description: {productData.description}</p>
        <h3 className="mt-2 text-lg font-bold">${(productData.price_cents / 100.00).toFixed(2)}</h3>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add To Cart</button>
      </div>
    </article>
  )
};

export default ProductListItem;

