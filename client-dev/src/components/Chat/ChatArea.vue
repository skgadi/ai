<template>
  <top-middle-bottom-layout>
    <template #header> </template>
    <template #body>
      <template v-for="(item, idx) in allMessages" :key="idx">
        <div class="row q-mb-md" :class="item.isUser ? 'justify-end' : 'justify-start'">
          <div style="max-width: 1080px">
            <q-card
              flat
              class="q-pa-none gsk-rounded-l gsk-rounded-r"
              :class="item.isUser ? 'bg-light-green-3' : 'bg-grey-3'"
            >
              <q-card-section class="q-px-md q-py-sm">
                <div
                  class="text-black no-margin-for-child"
                  v-html="item.content ? marked.parse(item.content) : ''"
                ></div>
                <div class="text-right text-caption text-grey-7">
                  {{ displayDateTime(new Date(item.timestamp)) }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
      <template v-if="blockSendingNewMessages">
        <div class="row q-mb-md justify-start">
          <div style="max-width: 1080px">
            <q-card flat class="q-pa-none gsk-rounded-l gsk-rounded-r bg-grey-3">
              <q-card-section class="q-px-md q-py-sm">
                <div class="text-black no-margin-for-child">
                  <q-spinner-dots />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
    </template>
    <template #footer>
      <div class="row">
        <div class="col">
          <q-input
            v-model="message"
            @keyup.enter="
              (e: KeyboardEvent) => {
                if (isEnterEnabled) {
                  if (e.key === 'Enter') {
                    if (e.altKey) {
                      message += '\n'
                      return
                    }
                    sendMessage()
                  }
                }
              }
            "
            placeholder="Prepare your prompt here. You can use md."
            rounded
            outlined
            clearable
            type="textarea"
            :disable="blockSendingNewMessages"
          >
            <!--template v-slot:prepend>
              <q-icon name="mdi-message-text-outline" />
            </template-->
            <template v-slot:append>
              <q-btn
                flat
                round
                :icon="isEnterEnabled ? 'mdi-keyboard-return' : 'mdi-send-lock-outline'"
                aria-label="Info"
                @click="isEnterEnabled = !isEnterEnabled"
                :disable="blockSendingNewMessages"
              >
                <q-tooltip>{{
                  isEnterEnabled
                    ? 'You can press enter to send your message'
                    : 'You need to press the send button to send your message.'
                }}</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>
        <div class="col-auto self-center">
          <div class="column items-center">
            <q-btn
              flat
              round
              icon="mdi-send-circle-outline"
              size="xl"
              color="primary"
              aria-label="Info"
              @click="sendMessage"
              :disable="blockSendingNewMessages"
            >
              <q-tooltip>Send</q-tooltip>
            </q-btn>
            <q-btn
              dense
              flat
              round
              icon="mdi-forum-remove-outline"
              size="md"
              color="negative"
              aria-label="Info"
              @click="confimationDialogOpen = true"
              :disable="blockSendingNewMessages"
            >
              <q-tooltip>Erase the chat history</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </template>
  </top-middle-bottom-layout>
  <q-dialog v-model="confimationDialogOpen" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirmation</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1">Are you sure you want to erase the chat history?</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat no-caps label="Cancel" color="primary" @click="confimationDialogOpen = false" />
        <q-btn
          flat
          no-caps
          label="Erase"
          color="negative"
          v-close-popup
          @click="$emit('requestEraseChatState')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import TopMiddleBottomLayout from 'src/components/Generic/TopMiddleBottomLayout.vue'

import type { AI_CHAT_ELEMENT } from 'src/services/library/common/types-content'
import { ref, type PropType } from 'vue'
import { marked } from 'marked'
import { displayDateTime } from 'src/services/library/gen'

defineProps({
  allMessages: Object as PropType<AI_CHAT_ELEMENT[]>,
  blockSendingNewMessages: Boolean,
})

const emit = defineEmits(['sendMessage', 'requestEraseChatState'])

const message = ref('')
const sendMessage = () => {
  emit('sendMessage', message.value)
  message.value = ''
}

const isEnterEnabled = ref(true)
const confimationDialogOpen = ref(false)
</script>
