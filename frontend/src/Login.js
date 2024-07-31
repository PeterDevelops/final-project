import { useRef, useState, useEffect } from 'react'

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  //convert below to rerouting with react-router
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd)
    //axios get request
    setUser('');
    setPwd('');
    setSuccess(true);
  }

  return (
    <div class="flex flex-col">
      {success ? (
        // want to go to homepage with state of user
        <section><h1>You are logged in!</h1></section>
      ) : (

        <section>
          <p ref={errRef}>{errMsg}</p>
          <h1>Sign In</h1>
          <form>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder='Enter email...' />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder='Enter password...' />
            <button>Sign In</button>
          </form>
        </section>
      )}
    </div>
  )
}

export default Login;