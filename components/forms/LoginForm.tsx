import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { EnvelopeSimple, Key } from 'phosphor-react'

import { useRequest } from '../../hooks/useRequest';
import { LanguageContext } from '../../contexts/LanguageContext';
import { snakeToCamel } from '../../functions/snakeToCamel';
import { Field } from '../Field';
import { Button } from '../Button';
import { Notification } from '../Notification';

export function LoginForm() {
  const { language: { translation } } = useContext(LanguageContext)
  const [data, setData] = useState({
		email: '',
		password: '',
	});

  const { request, execute } = useRequest();

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    execute({
      url: '/user/login',
      method: 'GET',
      params: data,
    })
  }

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const field = event.target.id;
		const value = event.target.value;

		setData({
			...data,
			[field]: value,
		});
	}

	const isRequesting = request.status === 'loading';
  const error = request.error && translation.errors[snakeToCamel(request.error) as keyof typeof translation.errors]

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-[75%]' autoComplete='off'>
      <div className='flex flex-col gap-2'>
        {request.error && (
          <Notification type='error'>
            {error}
          </Notification>
        )}

        {request.status === 'success' && (
          <Notification type='success'>
            {translation.login.success}
          </Notification>
        )}

        <Field
          type='email'
          id='email'
          placeholder={translation.email}
          value={data.email}
          icon={EnvelopeSimple}
          onChange={handleChange}
        />
        
        <Field
          type='password'
          id='password'
          placeholder={translation.password}
          value={data.password}
          icon={Key}
          onChange={handleChange}
        />

        <Link href='/forgot' className='ml-1 text-sm text-blue-100 w-fit hover:underline'>
          {translation.login.forgot}
        </Link>

				<Button
					type='submit'
					disabled={isRequesting}
				>
				  {translation.login.submit}
				</Button>

        <Link
          href='/register'
          className='mx-auto text-sm text-blue-100 w-fit hover:underline'
        >
          {translation.login.noAccount}
        </Link>
      </div>
    </form>
  )
}