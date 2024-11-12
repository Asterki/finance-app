import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState<{
    state: 'showing' | 'hidden';
    title: string;
    content: string;
    type: 'error' | 'success' | 'info' | 'warning';
  }>({
    state: 'hidden',
    title: '',
    content: '',
    type: 'info',
  });

  const showNotification = (title: string, content: string, type: 'warning' | 'info' | 'success' | 'error') => {
    setNotification({
      state: 'showing',
      title: title,
      content: content,
      type: type,
    });

    setTimeout(() => {
      setNotification({
        state: 'hidden',
        title: '',
        content: '',
        type: 'info',
      });
    }, 5000);
  };

  return { notification, showNotification };
};

export default useNotification;