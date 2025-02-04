import { defineStore, acceptHMRUpdate } from 'pinia'
import type { CL_PL_AI_SEND_DOCUMENT } from 'src/services/library/common/types-client'
import type {
  AI_CHAT_ELEMENT,
  DOCUMENT_INFO,
  DOCUMENT_SUMMARY_ELEMENT,
  READ_DOCUMENT_STATE,
} from 'src/services/library/common/types-content'
import { useSocketStore } from 'src/stores/socket'

export const useReadDocumentStore = defineStore('readDocumentStore', {
  state: () => ({
    state: {
      documentSummary: [],
      chat: [],
    } as READ_DOCUMENT_STATE,
    sendingChatMessage: false,
    waitingForChatResponse: false,
    sendingDocument: false,
    waitingForDocumentResponse: false,
    requestingSummary: false,
    waitingForSummaryResponse: false,
  }),
  getters: {
    getsendingDocument(): boolean {
      return this.sendingDocument
    },
    getState(): READ_DOCUMENT_STATE {
      return this.state
    },
    getSendingMessage(): boolean {
      return this.sendingChatMessage
    },
    getWaitingForResponse(): boolean {
      return this.waitingForChatResponse
    },
  },
  actions: {
    sendDocumentToServer(document: CL_PL_AI_SEND_DOCUMENT) {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-send-document', document)
      this.sendingDocument = true
      this.waitingForDocumentResponse = true
    },
    recAckFrmServerForDocUpload(document: DOCUMENT_INFO) {
      this.state.documentInfo = document
      this.sendingDocument = false
    },
    recDocLoadedToLLM() {
      this.waitingForDocumentResponse = false
    },
    requestDocumentSummary(prompt: string) {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-get-summary', prompt)
      this.requestingSummary = true
      this.waitingForSummaryResponse = true
    },
    recAckFrmServerForDocSummary() {
      this.requestingSummary = false
    },
    recDocSummaryFromServer(summary: DOCUMENT_SUMMARY_ELEMENT) {
      this.state.documentSummary.push(summary)
      this.waitingForSummaryResponse = false
    },
    sendChatMessageToServer(message: string) {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-send-chat-message', message)
      this.sendingChatMessage = true
      this.waitingForChatResponse = true
    },
    recAckFrmServerForChatMessage(message: AI_CHAT_ELEMENT) {
      this.state.chat.push(message)
      this.sendingChatMessage = false
    },
    recChatReplyFromServer(message: AI_CHAT_ELEMENT) {
      this.state.chat.push(message)
      this.waitingForChatResponse = false
    },
    getHistoryFromServer() {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-get-history')
    },
    setState(state: READ_DOCUMENT_STATE) {
      this.state = state
    },
    requestEraseChat() {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-erase-chat')
    },
    requestEraseDocumentState() {
      const socketStore = useSocketStore()
      socketStore.emit('skgadi-ai-read-document-erase-document-state')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReadDocumentStore, import.meta.hot))
}
