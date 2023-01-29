interface Props {
  children: React.ReactNode
}

export function Container({ children }: Props) {
  return (
    <div className='flex flex-col h-screen w-screen'>
      {children}
    </div>
  )
}