import { IconProps } from 'phosphor-react';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
}

export function Field(props: InputProps) {
  const { type, id, placeholder, onChange, value, icon: Icon } = props

	return (
		<div className='relative'>
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				required
				onChange={onChange}
        value={value}
				className='w-full p-2 py-3 pl-9 pr-3 text-sm rounded-xl peer'
			/>
      <Icon
        weight='fill'
        size={18}
        className='absolute mt-[0.800rem] ml-2.5 top-0 peer-valid:text-white peer-focus:text-white text-gray-400 transition-colors'
      />
		</div>
	);
}
