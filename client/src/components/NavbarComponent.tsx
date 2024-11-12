import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { User } from '../../../shared/models';

import { FaCog, FaUser, FaDoorOpen, FaChevronCircleDown } from 'react-icons/fa';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface ComponentProps {
  user: User | null;
}

const NavbarComponent: React.FC<ComponentProps> = (props) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const redirect = useNavigate();
  const component = React.useRef<HTMLDivElement>(null);

  return (
    <div className='w-full flex flex-col' ref={component}>
      {props.user && (
        <div className={props.user?.preferences.theme == 'dark' ? 'dark' : ''}>
          <div className='text-neutral-700 w-full flex items-center justify-between p-4 h-16 dark:bg-neutral-700 bg-white shadow-md z-10 absolute top-0'>
            <Link
              onClick={() => {
                redirect('/home');
              }}
              to='/home'
              className='text-2xl dark:text-white text-neutral-800 font-bold flex items-center gap-2'
            >
              <img src='/icon.svg' className='w-8' />
              Finance App
            </Link>
            <div className='w-auto md:w-2/12'>
              <DropdownMenu.Root
                open={menuOpen}
                onOpenChange={(change) => {
                  setMenuOpen(change);
                }}
              >
                <DropdownMenu.Trigger className='outline-none flex items-center justify-between px-4 py-2 rounded-sm border-2 dark:border-white/20 transition-all dark:hover:bg-white/10 cursor-pointer w-full'>
                  <div className='flex items-center justify-center'>
                    <div>
                      <img
                        width={30}
                        src='https://www.asterki.tech/assets/images/icon.png'
                        alt='wjaoi'
                        className='mr-2 rounded-full'
                      />
                    </div>
                    <div className='dark:text-white'>{props.user.name}</div>
                  </div>
                  <div  className={`dark:text-white/40 text-black/30 ${menuOpen ? 'rotate-180' : ''} transition-all `}>
                    <FaChevronCircleDown />
                  </div>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal container={component.current!}>
                  <DropdownMenu.Content
                    align='end'
                    className='dark:text-white text-neutral-700 dark:bg-neutral-700 bg-slate-100 transition-all rounded-sm border-2 dark:border-white/20 border-slate-400 w-full'
                  >
                    <DropdownMenu.Item className='p-2 transition-all dark:hover:bg-white/20 hover:bg-slate-200 cursor-pointer w-full'>
                      <Link to='/settings' className='flex gap-2 items-center'>
                        <FaCog />
                        Settings
                      </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='p-2 transition-all dark:hover:bg-white/20 hover:bg-slate-200 cursor-pointer w-full'>
                      <Link to='/contacts' className='flex gap-2 items-center'>
                        <FaUser />
                        Contacts
                      </Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className='p-2 transition-all dark:hover:bg-white/20 hover:bg-slate-200 cursor-pointer w-full'>
                      <Link to='/logout' className='flex gap-2 items-center hover:text-red-400'>
                        <FaDoorOpen />
                        Logout
                      </Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
      )}
      {!props.user && (
        <div className='w-full flex items-center justify-between p-4 h-16 dark:bg-neutral-700 bg-white shadow-md z-10 absolute top-0'>
          <Link
            onClick={() => {
              redirect('/');
            }}
            to='/'
            className='text-2xl dark:text-white text-neutral-800 font-bold flex items-center gap-2'
          >
            <img src='/icon.svg' className='w-8' />
            Finance App
          </Link>
          <div className='w-1/2 flex items-center justify-end md:w-3/12'>
            <Link
              to='/login'
              className='mr-2 hover:underline text-white bg-blue-400 shadow-md rounded-sm py-2 w-1/2 text-center'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='mr-2 hover:underline text-black bg-white shadow-md rounded-sm py-2 w-1/2 text-center'
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
