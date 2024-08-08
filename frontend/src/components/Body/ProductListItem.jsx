import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductListItem = (props) => {
  const {
    productData,
    allProducts,
    setAllProducts,
    user,
    allVendors,
  } = props;

  const navigate = useNavigate();
  const vendor = allVendors.find(v => v.id === productData.vendor_id);


  const handleEdit = () => {
    if (productData && vendor) {
      navigate(`/products/edit/${productData.id}`, { state: { product: productData } });
    }
  };

  const handleDelete = () => {
    if (productData && vendor) {
      const confirmed = window.confirm('Are you sure you want to delete this product?');
      if (confirmed) {
        fetch(`/api/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productData.id }),
        })
        .then(response => {
          if (response.ok) {
            setAllProducts(allProducts.filter(p => p.id !== productData.id));
            navigate('/vendors', { state: { allProducts }});
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(err => {
          console.error('Error deleting product:', err.message);
        });
      }
    }
  };

  const isProductOwnedByUser = user && vendor && user.id === vendor.admin_user;

  return (
    <article className="flex flex-col md:flex-row md:items-stretch border rounded-lg shadow-md m-5 overflow-hidden">
      <img
        src={productData.photo_url}
        alt={`${productData.name} image`}
        className="w-full md:w-1/3 md:object-cover md:object-contain"
      />
      <div className="p-5 w-full md:w-2/3">
        <h1 className="text-xl font-semibold">{productData.name}</h1>
        <p className="mt-2">Description: {productData.description}</p>
        <h3 className="mt-2 text-lg font-bold">${(productData.price_cents / 100.00).toFixed(2)}</h3>
        {isProductOwnedByUser ? (
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ) : (
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Add To Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductListItem;

