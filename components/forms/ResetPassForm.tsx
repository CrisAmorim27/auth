import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { CircleWavyCheck, Key } from 'phosphor-react';

import { useRequest } from '../../hooks/useRequest';
import { LanguageContext } from '../../contexts/LanguageContext';
import { snakeToCamel } from '../../functions/snakeToCamel';
import { Button } from '../Button';
import { Notification } from '../Notification';
import { Field } from '../Field';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

interface Props {
  user: {
    id: string;
    email: string;
  };
}

export function ResetPassForm({ user }: Props) {
  const router = useRouter()
  const { language: { translation } } = useContext(LanguageContext)

  const { request, execute } = useRequest();
  const [password, setPassword] = useState('');
  const [hasSentForm, setHasSentForm] = useState(false)

  function redirectToLogin() {
    router.push('/login')
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setPassword(value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (hasSentForm) return

    execute({
      url: '/recover/update',
      method: 'PATCH',
      data: { password, user },
    });
  }

  useEffect(() => {
    if (request.status === 'success') {
      setHasSentForm(true)
    }
  }, [request.status])

  const isRequesting = request.status === 'loading';
  const error = request.error && translation.errors[snakeToCamel(request.error) as keyof typeof translation.errors]

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-[75%] relative'
      autoComplete='off'
    >
      <Transition
        show={!hasSentForm}
        leave='transition-all duration-500'
        leaveFrom='opacity-100 translate-x-0'
        leaveTo='opacity-0 -translate-x-full absolute'
        className='flex flex-col gap-2 w-full'
      >
        {request.error && (
          <Notification type='error'>
            {error}
          </Notification>
        )}

        <>
          <p className='text-zinc-300'>
            {translation.forgot.enterNewPassword}
          </p>

          <Field
            type='password'
            id='password'
            placeholder={translation.forgot.newPassword}
            value={password}
            icon={Key}
            onChange={handleChange}
          />

          <Button
            type='submit'
            disabled={isRequesting}
          >
            {translation.forgot.reset}
          </Button>
        </>
      </Transition>

      <Transition
        show={hasSentForm}
        enter='transition-all duration-500'
        enterFrom='opacity-0 translate-x-full'
        enterTo='opacity-100 translate-x-0'
        className='text-base text-center text-zinc-300 space-y-4'
      >
        <CircleWavyCheck size={70} className='mx-auto' color='#26b0bf' />

        <p>{translation.forgot.success}</p>

        <Button
          onClick={redirectToLogin}
        >
          {translation.forgot.backToLogin}
        </Button>
      </Transition>
    </form>
  );
}
