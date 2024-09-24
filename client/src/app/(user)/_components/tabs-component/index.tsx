import clsx from 'clsx'
import styles from './tabs-component.module.scss'
import { MouseEvent, ReactNode, useState } from 'react'

const { tabComponentWrapper, active } = styles

interface ItemProps {
  key: string
  tabLabel: ReactNode
  tabContent: ReactNode
}

interface TabsProps {
  items: ItemProps[]
  classNames?: string
}

const TabsComponent = ({ items = [], classNames = '' }: TabsProps) => {
  const [tabActived, setTabActived] = useState<string>(items[0].key)

  const _onTabClick = (e: MouseEvent<HTMLLIElement>, tabKey: string) => {
    e.stopPropagation()
    e.preventDefault()
    if (tabActived !== tabKey) setTabActived(tabKey)
  }

  return (
    <div className={clsx(tabComponentWrapper, classNames)}>
      {/* Tab Label */}
      {items.length > 0 && (
        <ul>
          {items.map((item, index) => {
            return (
              <li
                key={item.key || index}
                onClick={(e) => _onTabClick(e, item.key)}
                className={clsx({
                  [active]: item.key === tabActived
                })}
              >
                {item.tabLabel}
              </li>
            )
          })}
        </ul>
      )}

      {/* Tab Content */}
      {/* {items.length > 0 &&
        items.map((item) => {
          item.key === tabActived && <div>{item.tabContent}</div>
        })} */}
      {items[Number(tabActived) - 1] && (
        <div>{items[Number(tabActived) - 1].tabContent}</div>
      )}
    </div>
  )
}

export default TabsComponent
