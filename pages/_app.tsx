import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '../contexts/LanguageContext'
import { Header } from '../components/Header'
import { Container } from '../components/Container'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </LanguageProvider>
  )
}