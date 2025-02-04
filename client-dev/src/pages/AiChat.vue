<template>
  <chat-area
    :all-messages="aiChatStore.getChatState.messages"
    :block-sending-new-messages="aiChatStore.getSendingMessage"
    @send-message="(message) => aiChatStore.sendMessageToServer(message)"
    @request-erase-chat-state="aiChatStore.requestEraseChatState"
  />
</template>

<script setup lang="ts">
import ChatArea from 'src/components/Chat/ChatArea.vue'

import { useAiChatStore } from 'src/stores/ai-chat'
import { onMounted } from 'vue'

const aiChatStore = useAiChatStore()

onMounted(() => {
  aiChatStore.getHistoryFromServer()
})
</script>
