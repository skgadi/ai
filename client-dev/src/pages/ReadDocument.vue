<template>
  <top-middle-bottom-layout>
    <template #header> </template>
    <template #body>
      <template v-if="readDocumentStore.getState.documentInfo">
        <top-middle-bottom-layout>
          <template #header>
            <div class="q-pb-md">
              <q-item class="bg-grey-3 gsk-rounded">
                <q-item-section side>
                  <q-icon name="mdi-check-decagram-outline" color="green" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                    readDocumentStore.getState.documentInfo.originalName
                  }}</q-item-label>
                  <q-item-label caption lines="2">
                    File size: {{ formatBytes(readDocumentStore.getState.documentInfo.size) }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    outline
                    round
                    icon="mdi-delete-outline"
                    aria-label="Delete"
                    @click="eraseDocumentDialog = true"
                  >
                    <q-tooltip>Clear document</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </div>
          </template>
          <template #body>
            <q-splitter v-model="splitterModel" style="height: 100%">
              <template v-slot:before>
                <div class="parent-top-middle-bottom-layout">
                  <top-middle-bottom-layout>
                    <template #header>
                      <template v-if="readDocumentStore.getState.documentSummary.length > 0">
                        <div class="q-px-sm">
                          <q-select
                            v-model="summaryModel"
                            :options="summaryOptions"
                            label="Summaries"
                            option-value="id"
                            option-label="label"
                            outlined
                            emit-value
                            map-options
                            rounded
                          >
                            <template v-slot:before>
                              <q-btn
                                outline
                                round
                                icon="add"
                                @click="newSummaryDialog = true"
                                :disable="disableAddSummary"
                              >
                                <q-tooltip>Create a new summary</q-tooltip>
                              </q-btn>
                            </template>
                          </q-select>
                        </div>
                      </template>
                      <template v-else>
                        <q-btn
                          outline
                          rounded
                          icon="add"
                          class="full-width"
                          label="Create a new summary"
                          @click="newSummaryDialog = true"
                          :disable="disableAddSummary"
                        >
                          <q-tooltip>Create a new summary</q-tooltip>
                        </q-btn>
                      </template>
                    </template>
                    <template #body>
                      <div class="q-pa-sm parent-top-middle-bottom-layout">
                        <div class="bg-blue-grey-1 gsk-rounded parent-top-middle-bottom-layout">
                          <div class="q-py-sm q-pl-sm parent-top-middle-bottom-layout">
                            <top-middle-bottom-layout>
                              <template #body>
                                <div
                                  v-html="
                                    marked.parse(
                                      readDocumentStore.getState.documentSummary[summaryModel]
                                        ?.text || '',
                                    )
                                  "
                                />
                              </template>
                            </top-middle-bottom-layout>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template #footer> </template>
                  </top-middle-bottom-layout>
                </div>
              </template>

              <template v-slot:after>
                <div class="q-pa-sm parent-top-middle-bottom-layout">
                  <top-middle-bottom-layout>
                    <template #body>
                      <chat-area
                        :all-messages="readDocumentStore.getState.chat"
                        :block-sending-new-messages="readDocumentStore.waitingForChatResponse"
                        @send-message="
                          (message) => readDocumentStore.sendChatMessageToServer(message)
                        "
                        @request-erase-chat-state="readDocumentStore.requestEraseChat"
                      />
                    </template>
                  </top-middle-bottom-layout>
                </div>
              </template>
            </q-splitter>
          </template>
        </top-middle-bottom-layout>
      </template>
      <template v-else>
        <div class="q-pt-xl q-px-xl">
          <q-file
            rounded
            outlined
            v-model="inFile"
            accept=".pdf"
            :max-file-size="10 * 1024 * 1024"
            label="Selected a PDF to analyze its content (max 10MB)"
            stack-label
            :disable="readDocumentStore.getsendingDocument"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-file-document-outline" />
            </template>
            <template v-slot:after>
              <q-btn
                outline
                round
                icon="mdi-send-check-outline"
                aria-label="Info"
                :disable="!inFile || readDocumentStore.getsendingDocument"
                @click="sendDocumentToServer"
              >
                <q-tooltip>Send PDF to server</q-tooltip>
              </q-btn>
            </template>
          </q-file>
        </div>
      </template>
    </template>
    <template #footer> </template>
  </top-middle-bottom-layout>
  <q-dialog v-model="newSummaryDialog" persistent>
    <q-card style="width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Prepare summary.</div>
      </q-card-section>
      <q-card-section>
        <q-input
          outlined
          rounded
          clearable
          autofocus
          type="textarea"
          v-model="promptForNewSummary"
          label="Prompt for new summary (Optional)"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          icon="close"
          no-caps
          flat
          color="negative"
          v-close-popup
          @click="newSummaryDialog = false"
        />
        <q-btn
          label="Create"
          icon="mdi-send-variant-outline"
          no-caps
          flat
          color="primary"
          v-close-popup
          @click="readDocumentStore.requestDocumentSummary(promptForNewSummary)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="eraseDocumentDialog" persistent>
    <q-card style="width: 500px">
      <q-card-section>
        <div class="text-h6 text-center">Clear the document</div>
      </q-card-section>
      <q-card-section>
        <p>You are about to delete the document from the servers.</p>
        <p>Are you sure?</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" no-caps flat v-close-popup />
        <q-btn
          label="Delete"
          no-caps
          flat
          color="negative"
          v-close-popup
          @click="readDocumentStore.requestEraseDocumentState"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import TopMiddleBottomLayout from 'src/components/Generic/TopMiddleBottomLayout.vue'
import ChatArea from 'src/components/Chat/ChatArea.vue'

import { computed, onMounted, ref } from 'vue'
import { useReadDocumentStore } from 'src/stores/read-document'
import type { CL_PL_AI_SEND_DOCUMENT } from 'src/services/library/common/types-client'
import { formatBytes } from 'src/services/library/gen'
import { marked } from 'marked'

const readDocumentStore = useReadDocumentStore()

const inFile = ref<File | null>(null)

const sendDocumentToServer = async () => {
  const doc: CL_PL_AI_SEND_DOCUMENT = {
    document: {
      content: (await inFile.value?.arrayBuffer()) || new ArrayBuffer(0),
      name: inFile.value?.name || '',
      extension: inFile.value?.name?.split('.').pop() || '',
    },
  }
  if (doc.document.content.byteLength === 0) {
    return
  }
  readDocumentStore.sendDocumentToServer(doc)
}

const splitterModel = ref<number>(50)

const summaryModel = ref(0)
const summaryOptions = computed(() => {
  return readDocumentStore.getState.documentSummary.map((s, i) => ({
    value: `Summary ${i + 1}`,
    label: `[Summary ${i + 1}]: ${s.prompt || '<empty prompt>'}`,
    id: i,
  }))
})

const newSummaryDialog = ref(false)
const promptForNewSummary = ref('')

const eraseDocumentDialog = ref(false)

onMounted(() => {
  readDocumentStore.getHistoryFromServer()
})

const disableAddSummary = computed(() => {
  return readDocumentStore.requestingSummary || readDocumentStore.waitingForSummaryResponse
})
</script>
