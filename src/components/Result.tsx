import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { darkToast } from '../data';
import { useGithubStats } from '../hooks';

interface ResultProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  theme: string;
  border: string;
  countPrivate: string;
}

export const Result = ({
  isOpen,
  setIsOpen,
  username,
  border,
  countPrivate,
  theme,
}: ResultProps) => {
  const { stats, topLanguages, streak } = useGithubStats({
    username,
    theme,
    border,
    countPrivate,
  });

  const copyToClipboard = (text: string) => {
    if (username) {
      navigator.clipboard.writeText(text);
      toast('copied to clipboard', {
        icon: '👌',
        ...darkToast,
      });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-50 overflow-y-auto bg-gray-900/90'
        onClose={() => setIsOpen(false)}
      >
        <div className='fixed inset-0' />
        <Dialog.Panel className='grid min-h-screen place-items-center px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div
              onError={() => {
                toast('user might not exist', {
                  icon: '❌',
                  ...darkToast,
                });

                setIsOpen(false);
              }}
              className='w-full max-w-md transform p-6'
            >
              <div className='flex w-full flex-col items-center'>
                <img
                  onClick={() =>
                    copyToClipboard(`![${username}\'s Stats](${stats})`)
                  }
                  className='output'
                  src={stats}
                  alt='github stats'
                />

                <img
                  onClick={() =>
                    copyToClipboard(`![${username}\'s Streak](${streak})`)
                  }
                  className='output'
                  src={streak}
                  alt='github streak'
                />
                <img
                  onClick={() =>
                    copyToClipboard(
                      `![${username}\'s Top Languages](${topLanguages})`
                    )
                  }
                  className='output'
                  src={topLanguages}
                  alt='github top languages'
                />
              </div>
            </div>
          </Transition.Child>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};
