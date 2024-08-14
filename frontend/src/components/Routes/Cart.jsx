import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CartListItem from '../Body/CartListItem';
import React, { useEffect, useMemo } from 'react';

const groupByVendor = (items, products, vendors) => {
  // Create a map of vendor id to vendor details
  const vendorMap = vendors.reduce((map, vendor) => {
    map[vendor.id] = vendor;
    return map;
  }, {});

  return items.reduce((acc, item) => {
    // Find the product corresponding to the item's product_id
    const product = products.find(product => product.id === item.product_id);

    if (!product) {
      console.warn(`Product with id ${item.product_id} not found.`);
      return acc;
    }

    const vendorId = product.vendor_id;
    if (!vendorId) {
      console.warn(`Product with id ${item.product_id} has no associated vendor_id.`);
      return acc;
    }

    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: vendorMap[vendorId],
        items: []
      };
    }

    acc[vendorId].items.push(item);
    return acc;
  }, {});
};

const Cart = (props) => {
  const {
    allProducts,
    allVendors,
    user,
    cartItems,
    setCartItems,
    quantities,
    setQuantities,
    setTotalCost,
    subtotal,
  } = props;

  const navigate = useNavigate();

  const groupedCartItems = useMemo(() => {
    console.log('Cart Items:', cartItems);
    console.log('All Vendors:', allVendors);
    console.log('All Products:', allProducts);
    return groupByVendor(cartItems, allProducts, allVendors);
  }, [cartItems, allVendors, allProducts]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => {
      const quantity = quantities[item.cart_item_id] || item.quantity;
      return acc + item.price_cents * quantity;
    }, 0);
    setTotalCost(newSubtotal);
  }, [cartItems, quantities, setTotalCost]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));
    const updatedCartItems = cartItems.map(item =>
      item.cart_item_id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDelete = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.product_id !== productId);
    setCartItems(updatedCartItems);

    const updatedQuantities = { ...quantities };
    Object.keys(updatedQuantities).forEach(key => {
      if (!updatedCartItems.find(item => item.cart_item_id === parseInt(key))) {
        delete updatedQuantities[key];
      }
    });
    setQuantities(updatedQuantities);
  };

return (
    <div className='min-h-screen bg-main py-5'>
      {!user || !user.id ? (
        <div className='flex justify-center mt-5'>
          Please <button className='mx-1 font-bold text-blue-700'><Link to='/login'>login</Link></button> to view your cart.
        </div>
      ) : (
        cartItems.length > 0 ? (
          <div>
            <div className='mx-5 mb-3 mt-5 text-xl font-bold'>
              My Cart
            </div>

            <div className='max-w-4xl mx-2 bg-listitem p-2 rounded-lg shadow-md'>
              {Object.keys(groupedCartItems).map(vendorId => {
                const { vendor, items } = groupedCartItems[vendorId];

                if (!vendor) {
                  console.warn(`Vendor with id ${vendorId} not found.`);
                  return null;
                }

                return (
                  <div key={vendorId} className='mb-6'>
                    <div className='flex items-center justify-center mb-1'>
                      <img
                        className='w-8 h-8 rounded-full mr-3'
                        src={vendor.vendor_logo_url}
                        alt='vendor logo'
                      />
                      <span className='text-base font-semibold'>
                        {vendor.name}
                      </span>
                    </div>

                    {items.map(item => (
                      <CartListItem
                        key={item.cart_item_id}
                        product_photo_url={item.product_photo_url}
                        product_name={item.product_name}
                        quantity={quantities[item.cart_item_id] || item.quantity}
                        onChange={(newQuantity) => handleQuantityChange(item.cart_item_id, newQuantity)}
                        onDelete={() => handleDelete(item.product_id)}
                        price_cents={item.price_cents}
                      />
                    ))}
                  </div>
                );
              })}

              <div className='text-right font-bold mb-4'>
                Total: <span className='ml-1 text-xl'>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex flex-row justify-between">
              <div className='flex justify-center mb-4'>
                <button
                  className='text-gray rounded-lg text-sm underline px-5 py-2.5'
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                </button>
                </div>


              <Link to='/checkout'>
                <div className='flex justify-center mb-4'>
                  <button className="text-sm px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">
                    Checkout
                  </button>
                </div>
              </Link>

              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center mt-6'>
            <div className='font-bold mb-4'>Your cart is empty.</div>
            <button
              className='px-6 py-2 bg-blue-600 text-white rounded-md shadow'
              onClick={() => navigate('/')}
            >
              Go back to home page
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
