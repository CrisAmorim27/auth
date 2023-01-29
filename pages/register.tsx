import Head from 'next/head';
import { useContext } from 'react';

import { LanguageContext } from '../contexts/LanguageContext';
import { RegisterForm } from '../components/forms/RegisterForm';
import { AuthBox } from '../components/AuthBox';

export default function Register() {
  const { language: { translation } } = useContext(LanguageContext)

  return (
    <>
      <Head>
        <title>Hello | Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthBox
        title={translation.register.title}
        form={<RegisterForm />}
      />
  </>
  )
}