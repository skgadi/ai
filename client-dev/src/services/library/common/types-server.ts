import type {
  AI_CHAT_ELEMENT,
  AI_CHAT_STATE,
  DOCUMENT_SUMMARY_ELEMENT,
  READ_DOCUMENT_STATE,
} from 'src/services/library/common/types-content'

export interface SV_PL_AI_CHAT_SEND_ONE_MSG {
  message: AI_CHAT_ELEMENT
}

export interface SV_PL_AI_CHAT_SEND_ALL_MSGS {
  messages: AI_CHAT_STATE[]
}

export interface SV_PL_AI_SEND_ONE_DOC_SUMMARY {
  document: DOCUMENT_SUMMARY_ELEMENT
}

export interface SV_PL_AI_SEND_READ_DOC_STATE {
  documentState: READ_DOCUMENT_STATE
}
