import { CircleNotch } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> 

export function Button(props: ButtonProps) {
  const isLoading = props.disabled

  return (
    <button
      {...props}
      disabled={isLoading}
      className='w-full mx-auto mt-4 font-medium text-center bg-blue-700 h-11 rounded-xl disabled:cursor-not-allowed'
    >
      {isLoading ? (
        <CircleNotch
          weight='bold'
          size={25}
          className='mx-auto animate-spin'
        />
      ) : (
        props.children
      )}
    </button>
  )
}