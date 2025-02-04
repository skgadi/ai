<template>
  <template v-if="!passphraseStore.isValidated">
    <q-dialog v-model="hasNoAccess" persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section
          class="bg-transparent text-black"
          style="width: 560px; max-height: 400px; height: 80vh"
        >
          <top-middle-bottom-layout>
            <template #header>
              <q-toolbar flat>
                <q-toolbar-title class="text-h6">Welcome to the AI Demo</q-toolbar-title>
                <q-space />
                <server-activity />
              </q-toolbar>
            </template>
            <template #body>
              <div class="q-py-sm">
                <!-- Descriptive Text -->
                <div class="description">
                  <p>
                    Developed by <strong>SKGadi</strong>, this prototype demonstrates advanced AI
                    solutions across diverse domains. It highlights innovation in automation,
                    decision-making, and contextual understanding.
                  </p>
                </div>
                <div class="row">
                  <!-- Access Guidelines -->
                  <div class="gsk-rounded-r col-6 bg-grey-2 q-pa-sm" style="border: 1px solid #ccc">
                    <p>🔒 <strong>Access Restricted</strong></p>
                    <ul>
                      <li>Private evaluation/demo only</li>
                      <li>Not available for public use</li>
                      <li>Unauthorized access prohibited</li>
                    </ul>
                  </div>

                  <!-- Technical Requirements -->
                  <div class="gsk-rounded-l col-6 bg-grey-2 q-pa-sm" style="border: 1px solid #ccc">
                    <p>🖥 <strong>Optimized for:</strong></p>
                    <ul>
                      <li>Google Chrome (desktop)</li>
                      <li>Maximized browser window</li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>
            <template #footer>
              <!-- Passphrase Section -->
              <div class="q-pa-xs">
                <q-input
                  v-model="passphrase"
                  outlined
                  rounded
                  clearable
                  :type="isPassphraseHidden ? 'password' : 'text'"
                  label="Enter the case-sensitive access passphrase provided by SKGadi"
                  hint="Wrong passphrase? Contact GadiSureshKumar@gmail.com"
                  @keyup.enter="validatePassphrase"
                  autofocus
                >
                  <template v-slot:prepend>
                    <q-icon name="mdi-lock-outline" />
                  </template>
                  <template v-slot:append>
                    <q-btn
                      flat
                      round
                      :icon="isPassphraseHidden ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      @click="isPassphraseHidden = !isPassphraseHidden"
                    >
                      <q-tooltip>{{ isPassphraseHidden ? 'Show' : 'Hide' }} passphrase</q-tooltip>
                    </q-btn>
                  </template>
                  <template v-slot:after>
                    <q-btn
                      outline
                      round
                      icon="mdi-send-check-outline"
                      aria-label="Info"
                      @click="validatePassphrase"
                    >
                      <q-tooltip>Send passphrase for validation</q-tooltip>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </template>
          </top-middle-bottom-layout>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  <template v-else>
    <q-layout view="hHh lpR fFf">
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        class="bg-grey-2 q-mr-xl"
        side="left"
        style="border-top-right-radius: 32px; border-bottom-right-radius: 32px"
      >
        <top-middle-bottom-layout>
          <template #header>
            <q-toolbar class="bg-transparent text-black">
              <q-btn flat round icon="close" aria-label="Menu" @click="toggleLeftDrawer" />
            </q-toolbar>
          </template>
          <template #body>
            <q-list>
              <div style="height: 24px" />
              <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
            </q-list>
          </template>
          <template #footer>
            <div style="height: 24px" />
          </template>
        </top-middle-bottom-layout>
      </q-drawer>
      <q-page-container>
        <div style="height: 100vh; overflow: hidden" class="">
          <top-middle-bottom-layout>
            <template #header>
              <q-toolbar class="bg-white text-black">
                <q-btn
                  v-if="!leftDrawerOpen"
                  flat
                  dense
                  round
                  icon="menu"
                  aria-label="Menu"
                  @click="toggleLeftDrawer"
                />
                <q-avatar class="q-ml-xl cursor-pointer">
                  <img src="/src/assets/logo.png" />
                </q-avatar>
                <div class="text-h5 q-ml-md cursor-pointer" @click="router.push('/')">
                  AI - Demo by SKGadi
                </div>

                <q-space />
                <q-btn
                  class="q-mr-lg"
                  flat
                  round
                  icon="mdi-information-variant"
                  aria-label="Menu"
                  to="/about"
                >
                  <q-tooltip>About</q-tooltip>
                </q-btn>
                <server-activity />
              </q-toolbar>
            </template>
            <template #body>
              <div class="q-pa-md" style="height: 100%">
                <router-view />
              </div>
            </template>
            <template #footer>
              <div class="text-center">
                <p>
                  <strong>Copyright &copy; Suresh Kumar Gadi (2025)</strong>
                </p>
                <p></p>
              </div>
            </template>
          </top-middle-bottom-layout>
        </div>
      </q-page-container>
    </q-layout>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'
import ServerActivity from 'components/ServerActivity.vue'
import TopMiddleBottomLayout from 'src/components/Generic/TopMiddleBottomLayout.vue'

import { useRouter } from 'vue-router'
import { useSocketStore } from 'stores/socket'
import { usePassphraseStore } from 'src/stores/passphrase'

const router = useRouter()
const socketStore = useSocketStore()
const passphraseStore = usePassphraseStore()

onMounted(() => {
  //console.log('DesktopLayout mounted');
  socketStore.initializeSocket()
})

const linksList: EssentialLinkProps[] = [
  {
    title: 'AI chat',
    caption: 'General chatbot to answer your queries',
    icon: 'mdi-chat-outline',
    link: '/ai-chat',
  },
  {
    title: 'Read document',
    caption: 'Reads the PDF document to prvide insights',
    icon: 'mdi-file-document-outline',
    link: '/read-document',
  },
  {
    title: 'GitHub repository',
    caption: 'Prepares a beief summary about your favorite GitHub repository',
    icon: 'mdi-github',
    link: '/doc-for-github-repo',
  },
  {
    title: 'Zipped code',
    caption: 'Allows to upload zipped code for documentation',
    icon: 'mdi-folder-zip-outline',
    link: '/doc-for-zipped-code',
  },
]

const hasNoAccess = true
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const passphrase = ref('')

function validatePassphrase() {
  socketStore.emit('passphrase-validate', passphrase.value)
}

const isPassphraseHidden = ref(true)
</script>
