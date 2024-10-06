import { Flex, Skeleton } from 'antd'

type Props = {}

const SkeletonUser = (props: Props) => {
  return (
    <Flex align='center' justify='space-between' style={{ minHeight: 84 }}>
      <Flex align='center' gap={8}>
        <Skeleton.Avatar active size={48} />
        <Skeleton.Input active style={{ minWidth: 120, width: 120 }} />
      </Flex>
      <Skeleton.Button active />
    </Flex>
  )
}

export default SkeletonUser
