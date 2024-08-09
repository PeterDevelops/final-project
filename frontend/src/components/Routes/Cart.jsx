import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import { Link } from 'react-router-dom';
import CartListItem from '../Body/CartListItem';

const Cart = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    totalCost,
    setQuantities,
    quantities,
    setCartItems,
    setTotalCost,
    subtotal
  } = props;
  // console.log('Cart:user.id', user.id);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [itemId]: newQuantity
    }));

    // update cart items and total cost
    const updatedCartItems = cartItems.map(item =>
      item.cart_item_id === itemId ? { ...item, newQuantity } : item
    )
    setCartItems(updatedCartItems);
    const newTotalCost = updatedCartItems.reduce((acc, item) => acc + item.price_cents * item.quantity);
    setTotalCost(newTotalCost);
  };

  const handleDelete = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.product_id !== productId);
    setCartItems(updatedCartItems);
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
        cartItems={cartItems}
      />
          <div className='cart-center'>
            My Cart
          </div>

      {!user || !user.id ? (
        <div>
          Please <Link to="/login">Login</Link> to view your cart.
        </div>
      ) : (
      cartItems.length > 0 ? (
        <div className='cart-container'>
          <div className='cart-center'>

            <span>
              <img
                className='vendor-logo'
                src={cartItems[0].vendor_logo_url}
                alt='vendor logo'
              />
            </span>


            <span className='span-tag'>
              {cartItems[0].vendor_name}
            </span>
          </div>


          {cartItems.map(item => (
            <CartListItem
              key={item.cart_item_id}
              product_photo_url={item.product_photo_url}
              product_name={item.product_name}
              quantity={quantities[item.cart_item_id]}
              onChange={(newQuantity) => handleQuantityChange(item.cart_item_id, newQuantity)}
              onDelete={() => handleDelete(item.product_id)}
              price_cents={item.price_cents}
            />
          ))}
        
          <div className='total'>
            ${subtotal.toFixed(2)}
          </div>

          <Link to='/checkout'>
            <div className='cart-center'>
              <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800'>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </Link>

          <div className='cart-center'>
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>

        </div>
      ) : (
        <div>
          <div>Your Cart Is Empty</div>
          <button onClick={() => navigate('/')}>Go back to home page</button>
        </div>
      )
      )}
    </div>
  );
};

export default Cart;
