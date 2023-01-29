import Image from 'next/image';
import { useContext, useState } from 'react';
import { Globe } from 'phosphor-react';
import { Menu, Transition } from '@headlessui/react';

import { LanguageContext } from '../contexts/LanguageContext';
import { LanguageCode, languages } from '../utils/languages';

export function LanguageDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const { updateLanguage } = useContext(LanguageContext)

  function handleChangeLanguage(code: LanguageCode) {
    setShowMenu(false)
    const currentLanguage = localStorage.getItem('lang')

    if (!currentLanguage || currentLanguage !== code) {
      localStorage.setItem('lang', code)
      updateLanguage(code)
    }
  }

  const languagesList = Object.values(languages)

  return (
    <Menu as='div' className='mr-0 ml-auto z-20'>
      <Menu.Button
        onClick={() => setShowMenu(!showMenu)}
        className='p-1 transition-colors bg-opacity-50 rounded-lg hover:bg-zinc-700'
      >
        <Globe size={25} color='#d4d4d8' />
      </Menu.Button>
      <Transition
        enter='transition-all duration-75'
        enterFrom='opacity-0 -translate-x-4'
        enterTo='opacity-100 translate-x-0'
        leave='transition-all duration-150'
        leaveFrom='opacity-100 translate-x-0'
        leaveTo='opacity-0 -translate-x-4'
        className='shadow-zinc-900 shadow-lg absolute right-0 mr-4 z-50 overflow-hidden text-sm rounded-lg bg-zinc-800 w-max'
      >
        <Menu.Items as='ul'>
          {languagesList.map(lang => (
            <Menu.Item
              key={lang.code}
              as='li'
              onClick={() => handleChangeLanguage(lang.code as LanguageCode)}
              className='flex items-center gap-2 py-1.5 px-3 hover:bg-zinc-700 hover:cursor-pointer'
            >
              <Image
                draggable={false}
                src={lang.icon}
                alt={lang.code}
                width={22}
                height={22}
              />
              <span>{lang.label}</span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}