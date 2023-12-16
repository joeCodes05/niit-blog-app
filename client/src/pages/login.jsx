import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/28aOt4-LogoMakr.png'
import FormControl from '../utils/inputForms'
import { IoCloseOutline } from 'react-icons/io5'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigator = useNavigate();
  const { login } = useContext(AuthContext);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({email, password});
      setShowAlert(true);
      setAlertType('success');
      setAlertMessage("Welcome back! You're logged in successfully.")
      setTimeout(() => {
        navigator('/')
      }, 1000);
    } catch(err) {
      setShowAlert(true);
      setAlertType('error');
      setAlertMessage(err?.response?.data?.message);
    }
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form method='post' onSubmit={handleLogin} className='w-[450px] lg:p-0 px-5 space-y-5'>
          <div className="mx-auto w-fit">
            <Link to={'/'}>
              <span className="sr-only">Swoosh</span>
              <img className="h-14 w-auto" src={Logo} alt="swoosh logo" />
            </Link>
          </div>
          {showAlert ? <div>
            <div className={`rounded-md ${alertType === 'success' ? 'ring-lime-500 bg-lime-500 text-lime-500' : 'ring-red-500 bg-red-500 text-red-500'} ring-1 bg-opacity-10 py-4 px-3 flex items-center`}>
              <div className='mr-auto'>
                <div className="font-normal text-sm">
                  {alertMessage}
                </div> 
              </div>
              <div>
                <IoCloseOutline onClick={() => setShowAlert(false)} className='text-2xl cursor-pointer' />
              </div>
            </div>
          </div> : null}
          <div>
            <FormControl 
              placeholder={'expample@email.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type={'email'}
            />
          </div>         
          <div>
            <FormControl 
              placeholder={'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
            />
          </div>
          <div>
            <button className='w-full p-2 rounded-md bg-white duration-500 hover:bg-gray-200 hover:ring-gray-200 text-dark ring-1 ring-white'>
              Login
            </button>
          </div>
          <div className="text-center text-gray-400">
            <small>Don't have an account? <Link className='text-white underline' to={'/signup'}>Sign up</Link></small>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login