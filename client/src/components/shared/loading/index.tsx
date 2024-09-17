import { Spin } from 'antd'
import styles from './loading.module.scss'
import clsx from 'clsx'

const { loadingWrapper } = styles

const Loading = () => {
  return (
    <div className={clsx(loadingWrapper)}>
      <Spin />
    </div>
  )
}

export default Loading
