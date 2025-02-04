import { usePassphraseStore } from 'src/stores/passphrase'

export default function events(label: string, ...args: unknown[]): void {
  const passphraseStore = usePassphraseStore()
  switch (label) {
    case 'skgadi-ai-passphrase-validate': {
      if (args?.[0] === 'valid') {
        passphraseStore.validate()
      }
      break
    }
    default:
      break
  }
}
