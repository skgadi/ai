import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePassphraseStore = defineStore('passphraseStore', {
  state: () => ({
    validated: false,
  }),
  getters: {
    isValidated(): boolean {
      return this.validated
    },
  },
  actions: {
    validate() {
      this.validated = true
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePassphraseStore, import.meta.hot))
}
