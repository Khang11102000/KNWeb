import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...restProps
}: ButtonProps) => {
  let variantClass: string = ''
  switch (variant) {
    case 'primary':
      variantClass =
        'bg-primary text-sunshine-yellow hover:bg-[#282764] focus:bg-[#383782]'
      break

    case 'secondary':
      variantClass =
        'bg-white text-shade-400 border border-shade-600 hover:bg-primary hover:text-shade-200 focus:bg-[#383782]'
  }

  return (
    <button
      className={twMerge(
        clsx(
          'flex items-center justify-center capitalize text-nowrap font-medium transition-colors duration-300',
          variantClass,
          {
            'h-16 px-3 rounded-lg text-2xl': size === 'large',
            'h-12 px-2 rounded-[5px] text-xl': size === 'medium',
            'h-8 px-2 rounded-[5px] text-base': size === 'small'
          },
          className
        )
      )}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default Button
