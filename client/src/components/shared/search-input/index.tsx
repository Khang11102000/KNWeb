// 'use client'
// import { AutoComplete, AutoCompleteProps } from 'antd'
// import { SizeType } from 'antd/es/config-provider/SizeContext'
// import { useState } from 'react'
// import customSearchStyles from './custom-search.module.scss'

// const { customSearch } = customSearchStyles

// interface ICustomSearchProps {
//   size?: SizeType
//   allowClear?: boolean
//   variant?: 'filled' | 'outlined' | 'borderless'
//   classNames?: string
//   [key: string]: any
// }

// const mockVal = (str: string, repeat = 1) => ({
//   value: str.repeat(repeat)
// })

// const CustomSearch = ({
//   // size = 'middle',
//   allowClear = true,
//   variant = 'filled',
//   classNames = '',
//   ...props
// }: ICustomSearchProps) => {
//   const [value, setValue] = useState('')
//   const [options, setOptions] = useState<AutoCompleteProps['options']>([])
//   const [anotherOptions, setAnotherOptions] = useState<
//     AutoCompleteProps['options']
//   >([])

//   const getPanelValue = (searchText: string) =>
//     !searchText
//       ? []
//       : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]

//   const onSelect = (data: string) => {
//     console.log('onSelect', data)
//   }

//   // const onChange = (data: string) => {
//   //   setValue(data)
//   // }
//   return (
//     <AutoComplete
//       style={{ minWidth: 380, maxWidth: 380, height: 35 }}
//       options={options}
//       onSearch={(text) => setOptions(getPanelValue(text))}
//       onSelect={onSelect}
//       className={customSearch}
//       allowClear={allowClear}
//       variant={variant}
//       rootClassName={classNames}
//       {...props}
//     />
//   )
// }

// export default CustomSearch

'use client'
import { Input } from 'antd'
import { useSearchParams } from 'next/navigation'

interface ISearchInputProps {
  classNames?: string
  onSearch: (keyword: string) => void
  [key: string]: any
}

const { Search } = Input

const SearchInput = ({
  classNames = '',
  onSearch,
  ...props
}: ISearchInputProps) => {
  const searchParams = useSearchParams()
  const defaultSearchParams = searchParams.get('q')?.toString() ?? ''

  return (
    <Search
      style={{ minWidth: 380, maxWidth: 380, height: 35 }}
      rootClassName={classNames}
      enterButton
      onSearch={onSearch}
      defaultValue={defaultSearchParams}
      spellCheck={false}
      {...props}
    />
  )
}

export default SearchInput
