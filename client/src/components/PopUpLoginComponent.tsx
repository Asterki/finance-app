import * as React from 'react';
import { z } from 'zod';
import { Link } from 'react-router-dom';

import NotificationComponent from './NotificationComponent';

import { useAuth } from '../features/auth';
import useNotification from '../hooks/useNotification';

import TFADialog from '../features/auth/components/TFADialogComponent';
import LoginForm from '../features/auth/components/LoginFormComponent';

// To be later changed to a translate service
const messages = {
  'invalid-credentials': 'Invalid email/username or password',
  'requires-tfa': 'Two-factor authentication is required',
  'invalid-tfa-code': 'Invalid two-factor authentication code',
};

const PopUpLogin = () => {
  const { user, authStatus, login } = useAuth();
  const { notification, showNotification } = useNotification();

  const [emailOrUsername, setEmailOrUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Dialog State
  const [tfaDialogOpen, setTFADialogOpen] = React.useState(false);

  const [loginLoading, setLoginLoading] = React.useState(false);

  const loginButtonPressed = async (emailOrUsername: string, password: string, tfaCode?: string) => {
    // We avoid sending a request if the data isn't even in the acceptable schema
    const parsedData = z
      .object({
        emailOrUsername: z
          .string()
          .min(3, {
            message: 'Email or username must be at least 3 characters long',
          })
          .max(100, {
            message: 'Email or username must be at most 100 characters long',
          }),
        password: z
          .string()
          .min(8, {
            message: 'Password must be at least 8 characters long',
          })
          .max(100, {
            message: 'Password must be at most 100 characters long',
          }),
        tfaCode: z.string().optional(),
      })
      .safeParse({ emailOrUsername, password, tfaCode });

    if (parsedData.success === false) {
      showNotification('Failed to login', parsedData.error.errors[0].message, 'error');
      return;
    }

    setLoginLoading(true);
    const result = await login(emailOrUsername, password, tfaCode);

    switch (result) {
      case 'success':
        showNotification('Successfully logged in', 'You have successfully logged in', 'success');
        break;
      case 'tfa-required':
        // Since the TFA modal doesn't have access to the LoginForm state, we need to store the email/username and password in the component state
        setEmailOrUsername(emailOrUsername);
        setPassword(password);
        setTFADialogOpen(true);
        break;
      case 'invalid-credentials':
        showNotification('Failed to login', messages['invalid-credentials'], 'error');
        break;
      case 'invalid-tfa-code':
        showNotification('Failed to login', messages['invalid-tfa-code'], 'error');
        setTFADialogOpen(true);
        break;
      default:
        showNotification('Failed to login', 'An unknown error occurred', 'error');
        break;
    }

    setLoginLoading(false);
    setTFADialogOpen(false);
  };

  return (
    <div className='z-20 absolute top-0 left-0 w-full backdrop-blur-md min-h-screen dark:text-white text-neutral-700'>
      <NotificationComponent
        content={notification.content}
        title={notification.title}
        state={notification.state}
        type={notification.type}
      />

      <TFADialog
        open={tfaDialogOpen}
        onClose={() => setTFADialogOpen(false)}
        onSubmit={(tfaCode) => {
          loginButtonPressed(emailOrUsername, password, tfaCode);
        }}
      />

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-700  rounded-md shadow-md p-4 w-11/12 md:w-4/12'>
        <p className='mb-4 text-center'>
          The page you're trying to access requires you to be logged in. Please login to continue.
        </p>
        <LoginForm loginLoading={loginLoading} onSubmit={loginButtonPressed} authStatus={authStatus} user={user} />

        <div className='text-center mt-4 flex gap-2 items-center justify-center'>
          <Link to='/register' className='text-blue-500 hover:underline'>
            Create an account
          </Link>
          <span>or</span>
          <Link to='/forgot-password' className='text-blue-500 hover:underline'>
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopUpLogin;
