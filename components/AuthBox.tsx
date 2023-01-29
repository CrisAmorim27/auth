import { HandWaving } from 'phosphor-react';

interface Props {
  title: string;
  form: React.ReactNode
}

export function AuthBox({ title, form }: Props) {
  return (
    <div className='grid w-screen h-full place-items-center mt-auto mb-auto p-4 flex-1'>
      <main className='flex flex-col items-center max-w-[756px] w-full h-full overflow-hidden sm:h-96 rounded-4xl sm:flex-row'>
        <section className='self-stretch flex-1 w-full bg-cover bg-abstract relative'>
          <div className='p-4 absolute top-0 right-0 flex flex-col justify-center gap-2 items-center w-full h-full bg-black bg-opacity-75 backdrop-blur-[2px]'>
            <HandWaving weight='duotone' size={60} className='text-blue-100 min-w-[30px] min-h-[30px] mb-4 hidden xs:block' />

            <div className='mb-5 mx-2'>
              <h2 className='text-center text-xl font-bold uppercase sm:text-2xl'>
                Hello World!
              </h2>
              <p className='text-center font-light text-sm mt-2 max-w-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam facere dolorum aliquid, officia nisi a?
              </p>
            </div>
          </div>
        </section>
        <section className='flex flex-col items-center flex-1 w-full h-full py-6 justify-evenly bg-zinc-900'>
          <h1 className='pb-4 mx-4 text-2xl font-semibold text-center'>
            {title}
          </h1>
          {form}
        </section>
      </main>
    </div>
  )
}