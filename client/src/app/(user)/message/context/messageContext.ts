import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface IMessageContext {
    socket: Socket
}
export const MessageContext = createContext({} as any)