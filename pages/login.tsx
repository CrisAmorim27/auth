import Head from 'next/head'
import { useContext } from 'react'

import { LanguageContext } from '../contexts/LanguageContext'
import { LoginForm } from '../components/forms/LoginForm'
import { AuthBox } from '../components/AuthBox'

export default function Login() {
  const { language: { translation } } = useContext(LanguageContext)

  return (
    <>
      <Head>
        <title>Hello | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthBox
        title={translation.login.title}
        form={<LoginForm />}
      />
    </>
  )
}