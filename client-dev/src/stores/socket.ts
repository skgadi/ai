import { defineStore, acceptHMRUpdate } from 'pinia'
import SocketioService from 'src/services/socket/index'

export const useSocketStore = defineStore('socketStore', {
  state: () => ({
    isConnected: false, // Add state for connection status
    sentActivity: false,
    receivedActivity: false,
    timeOfBlink: 200, // TODO: change time based on the size of data
  }),
  getters: {
    getIsConnected(): boolean {
      return this.isConnected
    },
    getSentActivity(): boolean {
      return this.sentActivity
    },
    getReceivedActivity(): boolean {
      return this.receivedActivity
    },
    getActivity(): 'sent' | 'received' | 'idle' | 'both' | 'not-connected' {
      if (this.sentActivity && this.receivedActivity) {
        return 'both'
      }
      if (this.sentActivity) {
        return 'sent'
      }
      if (this.receivedActivity) {
        return 'received'
      }
      if (this.isConnected) {
        return 'idle'
      }
      return 'not-connected'
    },
  },
  actions: {
    initializeSocket() {
      SocketioService.setupSocketConnection()
    },
    detectedSentActivity() {
      this.sentActivity = true
      setTimeout(() => {
        this.sentActivity = false
      }, this.timeOfBlink)
    },
    detectedReceivedActivity() {
      this.receivedActivity = true
      setTimeout(() => {
        this.receivedActivity = false
      }, this.timeOfBlink)
    },
    connected() {
      this.isConnected = true
    },
    disconnected() {
      this.isConnected = false
    },
    emit(event: string, ...args: unknown[]) {
      this.detectedSentActivity()
      SocketioService.socket?.emit(event, ...args)
    },
    volatileEmit(event: string, ...args: unknown[]) {
      this.detectedSentActivity()
      SocketioService.socket?.volatile.emit(event, ...args)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSocketStore, import.meta.hot))
}
