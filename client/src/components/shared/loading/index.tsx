import { Spin } from 'antd'
import clsx from 'clsx'
import styles from './loading.module.scss'

const { loadingWrapper } = styles

interface ILoadingProps {
  classNames?: string
}

const Loading = ({ classNames = '' }: ILoadingProps) => {
  return (
    <div className={clsx(loadingWrapper, classNames)}>
      <Spin />
    </div>
  )
}

export default Loading
