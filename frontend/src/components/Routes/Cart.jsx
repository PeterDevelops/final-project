import { useNavigate } from 'react-router-dom';
import '../../styles/Cart.scss';
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
    vendors,
    allVendors,
    user,
    cartItems,
    setCartItems,
    setQuantities,
    quantities,
    setTotalCost,
    subtotal,
    allProducts // Add this prop
  } = props;

  const navigate = useNavigate();

  // Group cart items by vendor
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
    <div className="relative h-screen">
      {!user || !user.id ? (
        <div className='flex justify-center mt-5'>
          Please <button className='mx-1 font-bold'><Link to="/login">Login</Link></button> to view your cart.
        </div>
      ) : (
        cartItems.length > 0 ? (
          <div>
            <div className='mx-10 -mb-3 mt-5 text-xl font-bold'>
              My Cart
            </div>

            <div className='cart-container'>
              {Object.keys(groupedCartItems).map(vendorId => {
                const { vendor, items } = groupedCartItems[vendorId];

                if (!vendor) {
                  console.warn(`Vendor with id ${vendorId} not found.`);
                  return null;
                }

                return (
                  <div key={vendorId} className='vendor-group'>
                    <div className='cart-center'>
                      <span>
                        <img
                          className='vendor-logo'
                          src={vendor.vendor_logo_url}
                          alt='vendor logo'
                        />
                      </span>
                      <span className='span-tag'>
                        {vendor.vendor_name}
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

              <div className='text-right font-bold m-2'>
                Total:
                <span className='mx-1'>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <Link to='/checkout'>
                <div className='flex justify-center mb-2'>
                  <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'>
                    Checkout
                  </button>
                </div>
              </Link>

              <div className='flex justify-center text-white bg-blue-700 font-medium rounded-lg text-large
              px-5 py-2.5 me-2 mb-2 dark:bg-blue-600'>
                <button onClick={() => navigate('/')}>Continue Shopping</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='flex justify-center mt-6 font-bold mb-4'>Your cart is empty.</div>
            <div className='flex justify-center'>
              <button className='px-6 py-2 bg-blue-600 text-white rounded-md shadow' onClick={() => navigate('/')}>Go back to home page</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
