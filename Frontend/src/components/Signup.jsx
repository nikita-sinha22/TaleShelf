import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Login from './Login';

function Signup() {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios.post('https://taleshelf-backend.onrender.com/user/signup', userInfo)
      .then((res) => {
        if (res.data) {
          toast.success('Signup Successfully!');
          navigate(from, { replace: true });
        }
        localStorage.setItem('Users', JSON.stringify(res.data.user));
      }).catch((err) => {
        if (err.response) {
          toast.error('Error: ' + err.response.data.message);
        }
      });
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-[600px]'>
        <div className='modal-box dark:bg-slate-600'>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
            <h3 className="font-bold text-lg dark:text-white">Signup</h3>
            <div className='mt-4 space-y-2'>
              <span className='dark:text-white'>Name</span>
              <br />
              <input type="text" placeholder='Enter your Fullname' className='w-80 px-3 border rounded-md outline-none dark:text-slate-900' {...register('fullname', { required: true })} />
              <br />
              {errors.fullname && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            <div className='mt-4 space-y-2'>
              <span className='dark:text-white'>Email</span>
              <br />
              <input type="email" placeholder='Enter your Email' className='w-80 px-3 border rounded-md outline-none dark:text-slate-900' {...register('email', { required: true })} />
              <br />
              {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            <div className='mt-4 space-y-2'>
              <span className='dark:text-white'>Password</span>
              <br />
              <input type="password" placeholder='Enter your Password' className='w-80 px-3 border rounded-md outline-none dark:text-slate-900' {...register('password', { required: true })} />
              <br />
              {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            <div className='flex justify-around mt-4'>
              <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>
                Signup
              </button>
              <p className='text-xl'>
                Have account?{' '} 
                <button to="/" className='underline text-blue-500 cursor-pointer' onClick={() => document.getElementById('my_modal_3').showModal()}>
                  Login
                </button>{' '}
                <Login />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
