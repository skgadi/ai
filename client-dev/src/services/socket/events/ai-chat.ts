import type { AI_CHAT_ELEMENT, AI_CHAT_STATE } from 'src/services/library/common/types-content'
import { useAiChatStore } from 'src/stores/ai-chat'

export default function events(label: string, ...args: unknown[]): void {
  const aiChatStore = useAiChatStore()
  switch (label) {
    case 'ai-chat-receive-message': {
      aiChatStore.receivedAcknowledgementFromServer(args[0] as AI_CHAT_ELEMENT)
      break
    }
    case 'ai-chat-reply-receive-message': {
      aiChatStore.serverResopnseToThePrompt(args[0] as AI_CHAT_ELEMENT)
      break
    }
    case 'ai-chat-get-history': {
      aiChatStore.setChatState(args[0] as AI_CHAT_STATE)
      break
    }
    default:
      break
  }
}
