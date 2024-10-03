import { Dropdown, MenuProps, Space } from 'antd'
import { Eclipse, Ellipsis } from 'lucide-react'
import React from 'react'

const items: MenuProps['items'] = [
  {
    label: <div>Edit</div>,
    key: '0'
  },
  {
    label: <div>Delete</div>,
    key: '1'
  }
]

type Props = {}

const OptionDropdown = (props: Props) => {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Ellipsis />
    </Dropdown>
  )
}

export default OptionDropdown
