import clsx from 'clsx'
import React, { ComponentProps, Ref, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'> & {
  label?: string
  containerStyle?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, id, name, error, className, containerStyle, ...restProps },
    ref
  ) => {
    return (
      <div className={twMerge('flex flex-col gap-3', containerStyle)}>
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              clsx('text-base font-normal', {
                'text-sweet-red': error
              })
            )}
          >
            {label}
          </label>
        )}
        <input
          name={name}
          id={id}
          className={twMerge(
            clsx(
              'outline-none border border-shade-400 h-10 rounded px-3 transition-colors duration-300 focus:border-primary',
              {
                'border-sweet-red': error
              }
            )
          )}
          ref={ref}
          {...restProps}
        />
        {error && <small className='text-sweet-red text-sm'>{error}</small>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
