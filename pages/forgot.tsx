import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CircleNotch } from 'phosphor-react';

import { LanguageContext } from '../contexts/LanguageContext';
import { useRequest } from '../hooks/useRequest';
import { ResetPassForm } from '../components/forms/ResetPassForm';
import { SendMailForm } from '../components/forms/SendMailForm';

export default function Reset() {
  const { language: { translation } } = useContext(LanguageContext) 
	const router = useRouter();

	const { request, execute } = useRequest();

	useEffect(() => {
    const { token } = router.query

    if(token) {
      execute({
        url: '/recover/token',
        method: 'GET',
        params: {
          token,
        },
      });
    }
	}, [router.query]);

	const isRequesting = request.status === 'loading'
  const isValidToken = request.status === 'success'

	return (
		<>
      <Head>
        <title>Hello | Forgot password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
			<div className='grid w-screen h-screen p-4 place-items-center'>
				<main className='flex flex-col items-center max-w-[456px] w-full overflow-hidden h-fit rounded-3xl sm:flex-row'>
					<section className='flex flex-col items-center flex-1 w-full py-8 justify-evenly bg-zinc-900'>
						<h1 className='pb-4 mx-4 text-2xl font-semibold text-center'>
							{translation.forgot.title}
						</h1>
						{isRequesting ? (
							<CircleNotch size={55} className='text-gray-500 animate-spin' />
						) : (
              isValidToken ? <ResetPassForm user={request.data.user} /> : <SendMailForm />
						)}
					</section>
				</main>
			</div>
		</>
	);
}
