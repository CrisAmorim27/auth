import Link from 'next/link';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { User, EnvelopeSimple, Key } from 'phosphor-react';
import { useRequest } from '../../hooks/useRequest';
import { LanguageContext } from '../../contexts/LanguageContext';
import { snakeToCamel } from '../../functions/snakeToCamel';

import { Button } from '../Button';
import { Notification } from '../Notification';
import { Field } from '../Field';

export function RegisterForm() {
  const { language: { translation } } = useContext(LanguageContext) 
  
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const { request, execute } = useRequest();

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		execute({
			url: '/user/register',
			method: 'POST',
			data,
		});
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
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-[75%]'
			autoComplete='off'
		>
			<div className='flex flex-col gap-3'>
				{request.error && (
					<Notification type='error'>
            {error}
          </Notification>
				)}

				{request.status === 'success' && (
					<Notification type='success'>
						{translation.register.success}
					</Notification>
				)}

				<Field
					type='text'
					id='username'
					placeholder={translation.name}
					value={data.username}
					icon={User}
					onChange={handleChange}
				/>

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

				<Button type='submit' disabled={isRequesting}>
					{translation.register.submit}
				</Button>

				<Link
					href='/login'
					className='text-sm text-center text-blue-100 hover:underline'
				>
					{translation.register.haveAnAccount}
				</Link>
			</div>
		</form>
	);
}