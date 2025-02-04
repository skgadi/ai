export interface CL_PL_AI_CHAT_SEND_MSG {
  message: string
}

export interface CL_PL_AI_SEND_DOCUMENT {
  document: {
    name: string
    extension: string
    content: ArrayBuffer
  }
}
