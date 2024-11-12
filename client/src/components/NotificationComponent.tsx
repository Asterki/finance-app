import React from 'react';

import { AiFillCheckCircle, AiFillInfoCircle, AiFillWarning, AiFillCloseCircle } from 'react-icons/ai';

interface ComponentProps {
  state: 'showing' | 'hidden';
  title: string;
  content: string;
  type: 'error' | 'success' | 'info' | 'warning';
}

const NotificationComponent: React.FC<ComponentProps> = (props) => {
  let IconComponent = AiFillWarning;

  if (props.type === 'error') IconComponent = AiFillCloseCircle;
  if (props.type === 'success') IconComponent = AiFillCheckCircle;
  if (props.type === 'info') IconComponent = AiFillInfoCircle;

  return (
    <div
      data-state={props.state}
      className='z-30 bg-blue-400 transition-all data-[state=hidden]:opacity-0 text-white rounded-md absolute bottom-4 left-4 shadow-md p-4 flex items-center gap-4'
    >
      <div>
        <IconComponent className='text-3xl' />
      </div>
      <div className='flex items-start flex-col'>
        <h1 className='text-xl font-bold'>{props.title}</h1>
        <h1 className=''>{props.content}</h1>
      </div>
    </div>
  );
};

export default NotificationComponent;