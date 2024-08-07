import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = ( { products, vendors, locations, user, setUser } ) => {

  const navigate = useNavigate();

  return(
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} user={user} setUser={setUser} />
      <div>Thank you for your order.</div>

      <div>
      <div>Order Details</div>

      </div>

      <button onClick={() => navigate('/')}>Go back to home page</button>
    </div>
  )
}

export default OrderConfirmation;
