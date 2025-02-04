import { defineStore, acceptHMRUpdate } from 'pinia'
import type { AI_CHAT_ELEMENT, AI_CHAT_STATE } from 'src/services/library/common/types-content'
import { useSocketStore } from 'src/stores/socket'

export const useAiChatStore = defineStore('aiChatStore', {
  state: () => ({
    chatState: {
      messages: [],
    } as AI_CHAT_STATE,
    sendingMessage: false,
    waitingForResponse: false,
  }),
  getters: {
    getChatState(): AI_CHAT_STATE {
      return this.chatState
    },
    getSendingMessage(): boolean {
      return this.sendingMessage
    },
    getWaitingForResponse(): boolean {
      return this.waitingForResponse
    },
  },
  actions: {
    receivedAcknowledgementFromServer(message: AI_CHAT_ELEMENT) {
      this.chatState.messages.push(message)
      this.waitingForResponse = false
    },
    sendMessageToServer(message: string) {
      const socketStore = useSocketStore()
      socketStore.emit('ai-chat-send-message', message)
      this.sendingMessage = true
      this.waitingForResponse = true
    },
    serverResopnseToThePrompt(inMessage: AI_CHAT_ELEMENT) {
      this.chatState.messages.push(inMessage)
      this.sendingMessage = false
    },
    getHistoryFromServer() {
      const socketStore = useSocketStore()
      socketStore.emit('ai-chat-get-history')
    },
    setChatState(chatState: AI_CHAT_STATE) {
      this.chatState = chatState
    },
    requestEraseChatState() {
      const socketStore = useSocketStore()
      socketStore.emit('ai-chat-erase-history')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAiChatStore, import.meta.hot))
}
