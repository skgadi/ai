import { notify } from '../../notifications/index'

interface InputNotification {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
  description: string
  isSuccess: boolean
}

export default function events(label: string, ...args: unknown[]): void {
  switch (label) {
    case 'notification': {
      const notItem: InputNotification = args[0] as InputNotification
      notify(notItem.description, notItem.message, notItem.type)
      break
    }
    default:
      break
  }
}
