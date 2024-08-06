import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const NewProduct = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    setAllProducts,
    vendors,
    setVendors,
    allVendors,
    setAllVendors,
    locations,
    categories,
    user,
    setUser
  } = props;
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPhotoUrl, setProductPhotoUrl] = useState('');
  const [productInventory, setProductInventory] = useState('');
  const [productPriceCents, setProductPriceCents] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name: productName,
      description: productDescription,
      photo_url: productPhotoUrl,
      inventory: productInventory,
      price_cents: productPriceCents,
      vendor_id: vendors.id,
      category: productCategory,
      sub_category: productSubCategory
    };

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      setAllProducts([...allProducts, data]);
      navigate(`/vendors`);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
      />
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo Url</label>
            <input
              type="text"
              value={productPhotoUrl}
              onChange={setProductPhotoUrl}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="text"
              value={productInventory}
              onChange={(e) => setProductInventory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (in cents)</label>
            <input
              type="text"
              value={productPriceCents}
              onChange={(e) => setProductPriceCents(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((categories, index) => (
                <option key={index} value={categories.category}>
                  {categories.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (in cents)</label>
            <input
              type="text"
              value={productPriceCents}
              onChange={(e) => setProductPriceCents(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;

