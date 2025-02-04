export interface AI_CHAT_ELEMENT {
  type: string
  content: string
  timestamp: number
  isUser: boolean
}

export interface AI_CHAT_STATE {
  messages: AI_CHAT_ELEMENT[]
}

export interface DOCUMENT_INFO {
  originalName: string
  extension: string
  size: number
  serverPath: string
  serverName: string
  uploadedOn: number
}

export interface DOCUMENT_SUMMARY_ELEMENT {
  prompt: string
  text: string
  on: number
}
export interface READ_DOCUMENT_STATE {
  documentInfo?: DOCUMENT_INFO
  chat: AI_CHAT_ELEMENT[]
  documentSummary: DOCUMENT_SUMMARY_ELEMENT[]
}
