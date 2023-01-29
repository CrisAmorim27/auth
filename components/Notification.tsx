const styles = {
  'error': 'bg-red-400 border-2 border-red-800 text-zinc-200',
  'success': 'bg-green-400 border-2 border-green-800 text-zinc-200'
}

interface Props {
  type: keyof typeof styles;
  children: React.ReactNode;
}

export function Notification({ type, children }: Props) {
  const style = styles[type]

  return (
    <div className={`w-full p-3 mb-2 text-sm text-center bg-opacity-30 rounded-xl ${style}`}>
      {children}
    </div>
  )
}