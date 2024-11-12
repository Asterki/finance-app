import React, { useRef } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import DialogComponent from '../../../components/DialogComponent';

interface TFADialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (tfaCode: string) => void;
}

const TFADialog: React.FC<TFADialogProps> = ({ open, onClose, onSubmit }) => {
  const tfaCodeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const tfaCode = tfaCodeRef.current!.value;
    onSubmit(tfaCode);
  };

  return (
    <DialogComponent open={open} onClose={onClose} title='TFA Code'>
      <div className='flex items-center flex-col gap-2'>
        <h1 className='text-2xl'>
          <HiOutlineUserCircle className='inline-block' />
          TFA Code
        </h1>
        <input
          type='password'
          autoComplete='one-time-code'
          className='dark:bg-gray-800 bg-slate-200 rounded-md p-2 dark:text-white w-full'
          placeholder='Code generated by your authenticator app'
          ref={tfaCodeRef}
        />
        <button className='p-2 bg-blue-400 rounded-md mt-2 w-1/2 text-white' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </DialogComponent>
  );
};

export default TFADialog;
