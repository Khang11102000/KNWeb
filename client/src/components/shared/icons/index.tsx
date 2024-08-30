import clsx from 'clsx'

interface IconProps {
  width?: number
  height?: number
  classNames?: string
}

export const SearchIcon = ({
  width = 16,
  height = 17,
  classNames = ''
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={classNames}
      viewBox='0 0 16 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='7.82491'
        cy='7.82495'
        r='6.74142'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.5137 12.8638L15.1567 15.5'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
