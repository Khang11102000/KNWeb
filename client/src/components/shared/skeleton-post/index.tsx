'use client'
import SkeletonUser from '@/components/shared/skeleton-user'
import { Card, Flex, Skeleton } from 'antd'
import React from 'react'

type Props = {}

const SkeletonPost = (props: Props) => {
  return (
    <div>
      <Flex align='center' gap={14}>
        <Skeleton.Avatar active size={38} />
        <Skeleton.Input active />
      </Flex>
      <div style={{ padding: 24 }}>
        <Skeleton active />
      </div>
    </div>
  )
}

export default SkeletonPost
