'use client'
import { Input, Modal } from 'antd'
import React from 'react'
import styles from './user-card.module.scss'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ICreateMessageData {
    userName: string
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>
    inputValue?: string
    open: boolean
    onOk: (e: React.MouseEvent<HTMLButtonElement>) => void
    onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const CreateMessageModal = ({ userName, open, inputValue, onInputChange, onOk, onCancel }: ICreateMessageData) => {
    return (
        <>
            <Modal title={`Tin nhắn mới đến ${userName}`} open={open} onOk={onOk} onCancel={onCancel}>
                <Input onChange={onInputChange} value ={inputValue}/>
            </Modal>
        </>
    )
}

export default CreateMessageModal
