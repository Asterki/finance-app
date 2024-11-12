import React, { useState } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
import NotificationComponent from '../components/NotificationComponent';
import PopUpLogin from '../components/PopUpLoginComponent';
import DialogComponent from '../components/DialogComponent';

import { useAuth } from '../features/auth';

interface LayoutProps {
  children: React.ReactNode;
  requiresLogin?: boolean;
  className?: string;
  notification?: {
    title: string;
    content: string;
    state: 'showing' | 'hidden';
    type: 'error' | 'success' | 'info' | 'warning';
  };
}

const PageLayout: React.FC<LayoutProps> = ({ children, requiresLogin = false, notification, className }) => {
  const { user, authStatus } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  React.useEffect(() => {
    setIsDialogOpen(authStatus === 'error' && requiresLogin && !!user);
  }, [authStatus, requiresLogin, user]);

  return (
    <div className={`flex flex-col min-h-screen ${className}`}>
      <NavbarComponent user={user} />

      {notification && (
        <NotificationComponent
          content={notification.content}
          title={notification.title}
          state={notification.state}
          type={notification.type}
        />
      )}

      <main className='flex-grow pt-16'>{children}</main>

      <FooterComponent />

      {requiresLogin && !user && authStatus == "unauthenticated" && <PopUpLogin />}

      {authStatus === 'error' && requiresLogin && user && (
        <DialogComponent open={isDialogOpen} onClose={closeDialog} title="Authentication Error">
          <p>Failed to authenticate, please clear your cookies and try again.</p>
        </DialogComponent>
      )}
    </div>
  );
};

export default PageLayout;