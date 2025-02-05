import { io, type Socket } from 'socket.io-client'
import { useSocketStore } from 'src/stores/socket'
import { notify } from '../notifications/index'

import eventsForNotifications from './events/notifications'
import eventsForPassphrase from './events/passphrase'
import eventsForAiChat from './events/ai-chat'
import eventsForReadDocument from './events/read-document'

class SocketioService {
  socket: Socket | null

  constructor() {
    this.socket = null
  }

  setupSocketConnection(): void {
    const isProduction = process.env.NODE_ENV === 'production'
    const socketIOPort = isProduction ? 443 : 3000
    this.socket = io(`wss://switchgear.sigrama.com.mx:${socketIOPort}`, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      withCredentials: false,
    }) // Replace with your server URL

    this.socket.on('connect', () => {
      useSocketStore().connected()
      notify('Connected', 'Sucessfully connected to the server', 'positive')
    })

    this.socket.on('disconnect', () => {
      useSocketStore().disconnected()
      notify('Disconnected', 'Disconnected from the server', 'negative')
    })

    this.socket.onAny((label, ...args) => {
      //console.log(label, args);
      useSocketStore().detectedReceivedActivity()
      eventsForNotifications(label, ...args)
      eventsForPassphrase(label, ...args)
      eventsForAiChat(label, ...args)
      eventsForReadDocument(label, ...args)
    })
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  /*emit(event: string, data: unknown): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }*/

  // Add more methods as needed for your application
}

export default new SocketioService()
