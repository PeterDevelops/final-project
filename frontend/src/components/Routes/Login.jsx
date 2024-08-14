import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {
  const {
    // products,
    // setProducts,
    // allProducts,
    // vendors,
    // setVendors,
    // allVendors,
    // locations,
    // categories,
    // user,
    setUser,
    // cartItems,
  } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //axios GET request to retrieve user data
    const response = await axios.post('/login', { email: email, password: password })

    //if there is a valid user in db set state and go to homepage
    if (response.data.length > 0) {
      setEmail(response.data.email);
      setPassword(response.data.hashed_password);
      setUser(response.data[0]);
      // console.log('USER-----', response.data[0])
      navigate('/');
    }
  }

  // useEffect(() => {
  //   console.log('USER******', user)
  // })

  return (
    <div className='relative h-screen'>
        <section className='m-3 p-3 flex flex-row justify-center'>
          <div className='w-full max-w-xs '>
            <h1 className='text-xl font-semibold pb-8'>Login</h1>
            <form className='bg-listitem shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}  >
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='email'>
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  placeholder='Enter email address...' />
              </div>
              <div className='mb-6'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='password'>
                  Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  placeholder='Enter password...'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit' >
                <FontAwesomeIcon icon={faArrowRightToBracket} color="black"/>
                </button>
              </div>
            </form>
          </div>
        </section>
    </div>
  )
}

export default Login;
