import React from 'react';
import { Link } from 'react-router-dom';

// Icons
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUserCircle, HiEye, HiEyeOff } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

import { motion } from 'framer-motion';

import { User } from '../../../../../shared/models';

interface LoginFormProps {
  onSubmit: (email: string, username: string, password: string, repeatPassword: string) => Promise<void>;
  registerLoading: boolean;
  user?: User | null;
  authStatus: string;
}

const RegisterForm: React.FC<LoginFormProps> = ({ onSubmit, registerLoading, user, authStatus }) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = React.useState(false);

  const usernameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const repeatPasswordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;
    const email = emailRef.current!.value;
    const repeatPassword = repeatPasswordRef.current!.value;

    await onSubmit(email, username, password, repeatPassword);
  };

  return (
    <motion.form
      variants={{
        hidden: { opacity: 0, y: -50 },
        showing: { opacity: 1, y: 0 },
      }}
      initial='hidden'
      animate='showing'
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center'>
        <img src='/assets/images/logo-no-background.png' className='w-8' />
        <h1 className='text-xl font-semibold mb-2'>Register to DIMLIM</h1>
      </div>

      <div className='my-4'>
        <label className='font-bold' htmlFor='username-input'>
          <HiOutlineUserCircle className='inline-block' />
          Username
        </label>
        <input
          id='username-input'
          type='text'
          autoComplete='username'
          ref={usernameRef}
          placeholder='Your username'
          className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
        />
      </div>

      <div className='my-4'>
        <label className='font-bold' htmlFor='email-input'>
          <HiOutlineMail className='inline-block' />
          Email
        </label>
        <input
          type='email'
          autoComplete='email'
          id='email-input'
          ref={emailRef}
          placeholder='Your email (will be verified)'
          className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
        />
      </div>

      <div className='my-4 relative'>
        <label className='font-bold' htmlFor='password-input'>
          <HiOutlineLockClosed className='inline-block' />
          Password
        </label>
        <div className='relative'>
          <input
            id='password-input'
            autoComplete='new-password'
            type={passwordVisible ? 'text' : 'password'}
            ref={passwordRef}
            placeholder='••••••••'
            className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
          />

          <button
            className='absolute right-4 top-1/2 -translate-y-1/2'
            type='button'
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
          >
            {passwordVisible ? <HiEye /> : <HiEyeOff />}
          </button>
        </div>
      </div>

      <div className='my-4 relative'>
        <label className='font-bold' htmlFor='repeat-password-input'>
          <HiOutlineLockClosed className='inline-block' />
          Repeat Password
        </label>
        <div className='relative'>
          <input
            type={repeatPasswordVisible ? 'text' : 'password'}
            id='repeat-password-input'
            autoComplete='new-password'
            ref={repeatPasswordRef}
            placeholder='••••••••'
            className='w-full p-2 dark:bg-gray-800 border-2 dark:border-gray-600 border-slate-200  outline-none rounded-md transition-all focus:!border-blue-400 hover:border-slate-300 dark:hover:border-gray-500'
          />

          <button
            className='absolute right-4 top-1/2 -translate-y-1/2'
            type='button'
            onClick={() => {
              setRepeatPasswordVisible(!repeatPasswordVisible);
            }}
          >
            {repeatPasswordVisible ? <HiEye /> : <HiEyeOff />}
          </button>
        </div>
      </div>

      <div className='mt-8'>
        <button
          className='w-full p-2 bg-blue-400 hover:bg-purple-400 rounded-md text-white shadow-md shadow-blue-300 hover:shadow-lg hover:shadow-purple-300 transition-all dark:shadow-none dark:hover:shadow-none'
          type='button'
          onClick={handleSubmit}
        >
          {registerLoading && <FaSpinner className='animate-spin inline-block' />}
          Register
        </button>
      </div>

      {authStatus == 'authenticated' && (
        <div className='mt-4'>
          <span className='font-bold'>Important Notice:</span> You're already logged in as{' '}
          <span className='font-semibold'>{user?.name}</span>, by registering a new account you will be
          logged out from this account.{' '}
          <Link to='/home' className='text-blue-500 hover:underline'>
            Return Home
          </Link>
        </div>
      )}
    </motion.form>
  );
};

export default RegisterForm;
