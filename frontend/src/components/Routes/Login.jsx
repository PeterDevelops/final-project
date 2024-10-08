import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

/**
 * Login component that handles user authentication.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.setUser - Function to set the logged-in user.
 * @returns {JSX.Element} The rendered login form component.
 */
const Login = (props) => {
  const { setUser } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   *
   * @param {Object} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Axios POST request to authenticate user with email and password
      const response = await axios.post('/login', { email: email, password: password });

      // If the response contains user data, set the user state and navigate to the homepage
      if (response.data.length > 0) {
        setEmail(response.data.email);
        setPassword(response.data.hashed_password);
        setUser(response.data[0]);
        navigate('/'); // Navigate to the homepage after successful login
      }
    } catch (error) {
      console.error('Error logging in:', error); // Log any errors to the console
    }
  }

  return (
    <div className='relative h-screen'>
      <section className='m-3 p-3 flex flex-row justify-center'>
        <div className='w-full max-w-xs'>
          {/* Login form heading */}
          <h1 className='text-xl font-semibold pb-8'>Login</h1>

          {/* Form for user login */}
          <form className='bg-listitem shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
            {/* Email input field */}
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
                placeholder='Enter email address...'
              />
            </div>

            {/* Password input field */}
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

            {/* Submit button */}
            <div className='flex items-center justify-between'>
              <button
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} color="black" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login;
