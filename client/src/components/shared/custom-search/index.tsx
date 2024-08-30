'use client'
import { AutoComplete, AutoCompleteProps } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { useState } from 'react'
import customSearchStyles from './custom-search.module.scss'

const { customSearch } = customSearchStyles

interface ICustomSearchProps {
  size?: SizeType
  allowClear?: boolean
  variant?: 'filled' | 'outlined' | 'borderless'
  [key: string]: any
}

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat)
})

const CustomSearch = ({
  // size = 'middle',
  allowClear = true,
  variant = 'filled',
  ...props
}: ICustomSearchProps) => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<AutoCompleteProps['options']>([])
  const [anotherOptions, setAnotherOptions] = useState<
    AutoCompleteProps['options']
  >([])

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]

  const onSelect = (data: string) => {
    console.log('onSelect', data)
  }

  const onChange = (data: string) => {
    setValue(data)
  }
  return (
    <AutoComplete
      style={{ minWidth: 380, maxWidth: 380, height: 35 }}
      options={options}
      onSearch={(text) => setOptions(getPanelValue(text))}
      onSelect={onSelect}
      className={customSearch}
      allowClear={allowClear}
      variant={variant}
      {...props}
    />
  )
}

export default CustomSearch
