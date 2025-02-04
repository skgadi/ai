import type {
  AI_CHAT_ELEMENT,
  DOCUMENT_INFO,
  DOCUMENT_SUMMARY_ELEMENT,
  READ_DOCUMENT_STATE,
} from 'src/services/library/common/types-content'
import { useReadDocumentStore } from 'src/stores/read-document'

export default function events(label: string, ...args: unknown[]): void {
  const readDocumentStore = useReadDocumentStore()
  switch (label) {
    case 'skgadi-ai-read-document-send-document': {
      readDocumentStore.recAckFrmServerForDocUpload(args[0] as DOCUMENT_INFO)
      break
    }
    case 'skgadi-ai-read-document-ready': {
      readDocumentStore.recDocLoadedToLLM()
      break
    }
    case 'skgadi-ai-read-document-get-summary': {
      readDocumentStore.recAckFrmServerForDocSummary()
      break
    }
    case 'skgadi-ai-read-document-summary-response': {
      readDocumentStore.recDocSummaryFromServer(args[0] as DOCUMENT_SUMMARY_ELEMENT)
      break
    }
    case 'skgadi-ai-read-document-send-chat-message': {
      readDocumentStore.recAckFrmServerForChatMessage(args[0] as AI_CHAT_ELEMENT)
      break
    }
    case 'skgadi-ai-read-document-chat-message-response': {
      readDocumentStore.recChatReplyFromServer(args[0] as AI_CHAT_ELEMENT)
      break
    }
    case 'skgadi-ai-read-document-get-history': {
      readDocumentStore.setState(args[0] as READ_DOCUMENT_STATE)
      break
    }
    default:
      break
  }
}
