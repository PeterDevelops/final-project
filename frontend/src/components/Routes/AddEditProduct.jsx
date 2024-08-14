import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const AddEditProduct = (props) => {
  const {
    setProducts,
    allProducts,
    setAllProducts,
    vendors,
    setVendors,
    allVendors,
    categories,
    user,
  } = props;

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPhotoUrl, setProductPhotoUrl] = useState('');
  const [productInventory, setProductInventory] = useState('');
  const [productPriceCents, setProductPriceCents] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productSubCategory, setProductSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState('');
  const [isCreatingNewSubCategory, setIsCreatingNewSubCategory] = useState(false);
  const [vendorId, setVendorId] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const editProduct = location.state?.product || null;

  useEffect(() => {
    if (productCategory) {
      const uniqueSubCategories = [...new Set(
        allProducts
          .filter(product => product.category === productCategory)
          .map(product => product.sub_category)
      )];
      setSubCategories(uniqueSubCategories);
    } else {
      setSubCategories([]);
    }
  }, [productCategory, allProducts]);

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPhotoUrl('');
    setProductInventory('');
    setProductPriceCents('');
    setProductCategory('');
    setProductSubCategory('');
    setVendorId('');
  };

  useEffect(() => {
    if (editProduct) {
      setProductName(editProduct.name || '');
      setProductDescription(editProduct.description || '');
      setProductPhotoUrl(editProduct.photo_url || '');
      setProductInventory(editProduct.inventory || '');
      setProductPriceCents(editProduct.price_cents || '');
      setProductCategory(editProduct.category || '');
      setProductSubCategory(editProduct.sub_category || '');
      setVendorId(editProduct.vendor_id || '');
    } else {
      resetForm();
    }
  }, [editProduct]);

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setIsCreatingNewSubCategory(value === 'new');
    setProductSubCategory(value !== 'new' ? value : '');
  };

  const userVendors = allVendors.filter(vendor => vendor.admin_user === user.id);

  const handleNewSubCategorySubmit = () => {
    if (newSubCategory && !subCategories.includes(newSubCategory)) {
      setSubCategories([...subCategories, newSubCategory]);
      setProductSubCategory(newSubCategory);
      setNewSubCategory('');
      setIsCreatingNewSubCategory(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = {
      name: productName,
      description: productDescription,
      photo_url: productPhotoUrl,
      inventory: parseInt(productInventory, 10),
      price_cents: parseInt(productPriceCents, 10),
      vendor_id: vendorId,
      category: productCategory,
      sub_category: productSubCategory,
      ...(editProduct && { id: editProduct.id }),
    };

    try {
      const method = editProduct ? 'PUT' : 'POST';
      const response = await fetch('http://localhost:8080/api/products', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create or update product');
      }

      const data = await response.json();

      setAllProducts(prevProducts => {
        const updatedProducts = editProduct
          ? prevProducts.map(p => p.id === data.id ? data : p)
          : [...prevProducts, data];

        const filteredByVendor = updatedProducts.filter(product => product.vendor_id.toString() === vendorId.toString());

        setProducts(filteredByVendor);
        setVendors([allVendors.find(vendor => vendor.id.toString() === vendorId.toString())]);

        return updatedProducts;
      });

      navigate(`/vendors/${vendorId}`, {state: {vendors}});

    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  return (
    <div className='relative h-screen'>
      <form onSubmit={handleSubmit} className='max-w-4xl mx-6 p-6 bg-[#F7F4F0] bg-opacity-50 mt-10 shadow-md rounded-lg'>
        <h1 className='text-2xl font-semibold mb-4'>{editProduct ? 'Edit Product' : 'Add New Product'}</h1>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
          <div>
            <label htmlFor='productName' className='block text-sm font-medium text-gray-700'>Product Name</label>
            <input
              type='text'
              id='productName'
              name='productName'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='productDescription' className='block text-sm font-medium text-gray-700'>Product Description</label>
            <textarea
              id='productDescription'
              name='productDescription'
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              rows='4'
              required
            />
          </div>
          <div>
            <label htmlFor='productPhotoUrl' className='block text-sm font-medium text-gray-700'>Photo Url</label>
            <input
              type='text'
              id='productPhotoUrl'
              name='productPhotoUrl'
              value={productPhotoUrl}
              onChange={(e) => setProductPhotoUrl(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='productInventory' className='block text-sm font-medium text-gray-700'>Quantity</label>
            <input
              type='text'
              id='productInventory'
              name='productInventory'
              value={productInventory}
              onChange={(e) => setProductInventory(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='productPriceCents' className='block text-sm font-medium text-gray-700'>Price (in cents)</label>
            <input
              type='text'
              id='productPriceCents'
              name='productPriceCents'
              value={productPriceCents}
              onChange={(e) => setProductPriceCents(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            />
          </div>
          <div>
            <label htmlFor='vendorId' className='block text-sm font-medium text-gray-700'>Vendor</label>
            <select
              id='vendorId'
              name='vendorId'
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            >
              <option value='' disabled>Select a vendor</option>
              {userVendors.map((vendor, index) => (
                <option key={index} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='productCategory' className='block text-sm font-medium text-gray-700'>Category</label>
            <select
              id='productCategory'
              name='productCategory'
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
            >
              <option value='' disabled>Select a category</option>
              {categories.map((categories, index) => (
                <option key={index} value={categories.category}>
                  {categories.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='productSubCategory' className='block text-sm font-medium text-gray-700'>SubCategory</label>
            <select
              id='productSubCategory'
              name='productSubCategory'
              value={productSubCategory}
              onChange={handleSubCategoryChange}
              className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
              required
              disabled={!productCategory}
            >
              <option value='' disabled>Select a SubCategory</option>
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
              <option value='new'>Create new SubCategory</option>
            </select>
            {isCreatingNewSubCategory && (
              <div className='mt-4'>
                <label htmlFor='newSubCategory' className='block text-sm font-medium text-gray-700'>New SubCategory</label>
                <input
                  id='newSubCategory'
                  name='newSubCategory'
                  type='text'
                  value={newSubCategory}
                  onChange={(e) => setNewSubCategory(e.target.value)}
                  className='mt-1 block w-full border-gray-300 bg-white rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
                />
                <button
                  type='button'
                  onClick={handleNewSubCategorySubmit}
                  className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  Add SubCategory
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className='text-sm px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          >
            {editProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProduct;

