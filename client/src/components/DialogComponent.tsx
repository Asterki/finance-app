// components/DialogComponent.tsx
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title: string;
}

const DialogComponent: React.FC<DialogProps> = ({ children, open, onClose, title }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-20' />
        <Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md dark:bg-gray-700 bg-slate-100 p-4 dark:text-white text-slate-700 focus:outline-none z-30 flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <div className='flex-grow'>{children}</div>
          <button
            onClick={onClose}
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all self-end'
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogComponent;